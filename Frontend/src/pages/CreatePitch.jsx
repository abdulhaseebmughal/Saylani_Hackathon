import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pitchAPI } from '../services/api';
import Loader from '../components/Loader';

const CreatePitch = () => {
  const [ideaDescription, setIdeaDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (ideaDescription.trim().length < 20) {
      setError('Please provide more details (at least 20 characters)');
      return;
    }

    setLoading(true);

    try {
      const response = await pitchAPI.generatePitch({ ideaDescription });
      const pitchId = response.data.data._id;
      navigate(`/pitch/${pitchId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate pitch');
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    "A mobile app that helps people track daily water intake with smart reminders based on activity and weather",
    "An AI-powered learning platform that adapts to each student's pace and provides personalized lessons",
    "A marketplace connecting local farmers directly with consumers to reduce food waste"
  ];

  if (loading) {
    return (
      <Loader
        fullScreen
        message="Generating your AI-powered pitch..."
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Create your pitch
          </h1>
          <p className="text-gray-600">
            Describe your startup idea and let AI create a professional pitch deck
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
              {error}
            </div>
          )}

          {/* Main Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Your startup idea
            </label>
            <textarea
              value={ideaDescription}
              onChange={(e) => setIdeaDescription(e.target.value)}
              placeholder="Describe your startup idea in detail. Include the problem you're solving, your solution, target audience, and what makes your idea unique..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none bg-white text-gray-900 placeholder-gray-400"
              rows="12"
              required
            />
            <p className="mt-3 text-sm text-gray-500">
              {ideaDescription.length} / 20 characters minimum
            </p>
          </div>

          {/* Tips */}
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Tips for best results:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <strong>Problem:</strong> What problem are you solving?</li>
              <li>• <strong>Solution:</strong> How does your product solve it?</li>
              <li>• <strong>Target market:</strong> Who are your customers?</li>
              <li>• <strong>Unique value:</strong> What makes you different?</li>
            </ul>
          </div>

          {/* Examples */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Example ideas:
            </h3>
            <div className="space-y-2">
              {examples.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setIdeaDescription(example)}
                  className="w-full text-left p-3 text-sm text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading || ideaDescription.length < 20}
              className="flex-1 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate pitch →'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePitch;
