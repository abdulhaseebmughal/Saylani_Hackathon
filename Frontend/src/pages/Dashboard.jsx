import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pitchAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPitches();
  }, []);

  const fetchPitches = async () => {
    try {
      setLoading(true);
      const response = await pitchAPI.getAllPitches();
      setPitches(response.data.data.pitches);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load pitches');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this pitch?')) return;

    try {
      await pitchAPI.deletePitch(id);
      setPitches(pitches.filter((pitch) => pitch._id !== id));
    } catch (err) {
      alert('Failed to delete pitch');
    }
  };

  if (loading) {
    return <Loader fullScreen message="Loading your pitches..." />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header - Centered with breathing space */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Your pitches
              </h1>
              <p className="text-xl text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <Link to="/create">
              <button className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all">
                Create new pitch →
              </button>
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800">
              {error}
            </div>
          )}
        </div>

        {/* Pitches Grid - Centered with proper spacing */}
        {pitches.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-32">
            <div className="w-24 h-24 bg-gray-50 rounded-3xl mx-auto mb-10 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              No pitches yet
            </h3>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Create your first AI-powered pitch deck to get started
            </p>
            <Link to="/create">
              <button className="px-10 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all text-lg">
                Create your first pitch →
              </button>
            </Link>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pitches.map((pitch) => (
                <div
                  key={pitch._id}
                  className="border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-900 hover:shadow-xl transition-all cursor-pointer bg-white"
                  onClick={() => navigate(`/pitch/${pitch._id}`)}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
                    {pitch.projectName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 italic line-clamp-1">
                    {pitch.tagline}
                  </p>
                  <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed">
                    {pitch.pitchContent}
                  </p>
                  <div className="text-xs text-gray-400 mb-6">
                    {new Date(pitch.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/pitch/${pitch._id}`);
                      }}
                      className="flex-1 px-5 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all"
                    >
                      View details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(pitch._id);
                      }}
                      className="px-5 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-900 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
