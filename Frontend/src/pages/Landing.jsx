import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Perfectly Centered */}
      <div className="max-w-5xl mx-auto px-8 py-32 text-center">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
            Create investor-ready
            <br />
            pitches in minutes
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your startup idea into a professional pitch deck with AI.
            <br />
            Simple, fast, and powerful.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <button className="px-10 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all text-lg">
                  Go to dashboard →
                </button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <button className="px-10 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all text-lg">
                    Get started →
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-10 py-4 border-2 border-gray-300 text-gray-900 font-semibold rounded-xl hover:bg-gray-50 transition-all text-lg">
                    Sign in
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section - Perfectly Centered with Breathing Space */}
      <div className="border-t border-gray-100 py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything you need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional pitch decks, powered by AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Advanced AI creates compelling pitch decks with professional structure and persuasive language
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Investor-ready content with problem statements, solutions, and market analysis
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                What used to take days now takes minutes. Focus on your idea, not formatting
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works - Perfectly Centered */}
      <div className="py-32">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Four simple steps to your perfect pitch
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-12">
            {[
              { number: "01", title: "Describe your idea", desc: "Share your startup vision and key details" },
              { number: "02", title: "AI generates content", desc: "Our AI creates a professional pitch deck" },
              { number: "03", title: "Review and refine", desc: "Customize the content to match your voice" },
              { number: "04", title: "Present to investors", desc: "Download or share your investor-ready pitch" }
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 border-2 border-gray-900 rounded-2xl flex items-center justify-center font-bold text-gray-900 text-lg">
                    {step.number}
                  </div>
                </div>
                <div className="pt-3">
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h4>
                  <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Perfectly Centered */}
      <div className="border-t border-gray-100 py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Ready to get started?
          </h2>
          <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join entrepreneurs creating winning pitches with AI
          </p>
          <Link to={isAuthenticated ? "/dashboard" : "/register"}>
            <button className="px-12 py-5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all text-lg">
              {isAuthenticated ? "Go to dashboard →" : "Start for free →"}
            </button>
          </Link>
        </div>
      </div>

      {/* Footer - Centered */}
      <div className="border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-sm text-gray-500">
            <p>© 2025 PitchCraft. All rights reserved.</p>
            <p className="mt-4 md:mt-0">AI-Powered Pitch Generation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
