import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pitchAPI } from '../services/api';
import Loader from '../components/Loader';

const PitchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pitch, setPitch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    fetchPitch();
  }, [id]);

  const fetchPitch = async () => {
    try {
      setLoading(true);
      const response = await pitchAPI.getPitchById(id);
      setPitch(response.data.data);
      setEditedContent(response.data.data.pitchContent);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load pitch');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await pitchAPI.updatePitch(id, {
        pitchContent: editedContent,
      });
      setPitch(response.data.data);
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update pitch');
    }
  };

  const handleExport = async () => {
    try {
      await pitchAPI.exportPitch(id);
      alert('Ready to print! Use Ctrl+P (Cmd+P on Mac) to print or save as PDF.');
      window.print();
    } catch (err) {
      alert('Failed to export pitch');
    }
  };

  const handleCopy = () => {
    const fullText = `
${pitch.projectName}
${pitch.tagline}

PROBLEM STATEMENT:
${pitch.problemStatement}

SOLUTION:
${pitch.solution}

UNIQUE VALUE PROPOSITION:
${pitch.uniqueValueProposition}

TARGET AUDIENCE:
${pitch.targetAudience}

MARKET OPPORTUNITY:
${pitch.marketOpportunity}

ELEVATOR PITCH:
${pitch.pitchContent}
    `.trim();

    navigator.clipboard.writeText(fullText);
    alert('Pitch copied to clipboard!');
  };

  if (loading) {
    return <Loader fullScreen message="Loading pitch..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-50 rounded-2xl mx-auto mb-8 flex items-center justify-center">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-semibold text-gray-950 mb-4">Error Loading Pitch</h2>
          <p className="text-gray-500 mb-10">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-gray-950 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-16">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 border-2 border-gray-200 text-gray-950 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="px-6 py-3 border-2 border-gray-200 text-gray-950 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              Copy Text
            </button>
            <button
              onClick={handleExport}
              className="px-6 py-3 bg-gray-950 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
            >
              Export / Print
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-10 md:p-16 mb-10">
          <div className="text-center mb-16 pb-12 border-b-2 border-gray-100">
            <h1 className="text-5xl md:text-6xl font-semibold text-gray-950 mb-6 tracking-tight">
              {pitch.projectName}
            </h1>
            <p className="text-2xl text-gray-500 italic">{pitch.tagline}</p>
          </div>

          <div className="space-y-14">
            {pitch.problemStatement && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-950 mb-5">
                  Problem Statement
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">
                  {pitch.problemStatement}
                </p>
              </div>
            )}

            {pitch.solution && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-950 mb-5">
                  Solution
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">
                  {pitch.solution}
                </p>
              </div>
            )}

            {pitch.uniqueValueProposition && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-950 mb-5">
                  Unique Value Proposition
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">
                  {pitch.uniqueValueProposition}
                </p>
              </div>
            )}

            {pitch.targetAudience && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-950 mb-5">
                  Target Audience
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">
                  {pitch.targetAudience}
                </p>
              </div>
            )}

            {pitch.marketOpportunity && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-950 mb-5">
                  Market Opportunity
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">
                  {pitch.marketOpportunity}
                </p>
              </div>
            )}

            <div className="border-t-2 border-gray-100 pt-14">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-950">
                  Elevator Pitch
                </h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2.5 border-2 border-gray-200 text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-950 focus:border-transparent resize-none bg-white text-gray-950"
                    rows="12"
                  />
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={handleUpdate}
                      className="px-8 py-3 bg-gray-950 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-sm"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedContent(pitch.pitchContent);
                      }}
                      className="px-8 py-3 border-2 border-gray-200 text-gray-950 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">
                  {pitch.pitchContent}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-8">
          <h4 className="text-sm font-semibold text-gray-950 mb-4">Original Idea</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{pitch.ideaDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default PitchDetail;
