import { useState, useEffect } from 'react';
import api from '../services/api';

function Home() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    try {
      const response = await api.get('/health');
      setHealth(response);
    } catch (error) {
      console.error('Server health check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to Hackathon
        </h1>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              Server Status
            </h2>
            {loading ? (
              <p className="text-blue-600">Checking server...</p>
            ) : health ? (
              <div className="space-y-2">
                <p className="text-green-600 font-medium">Server is running</p>
                <p className="text-sm text-gray-600">
                  {health.message}
                </p>
              </div>
            ) : (
              <p className="text-red-600">Server is offline</p>
            )}
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-indigo-800 mb-2">
              Ready to Build
            </h2>
            <p className="text-gray-600">
              Your MERN stack is configured and ready for development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
