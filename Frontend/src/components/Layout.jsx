import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">
                Hackathon
              </h1>
            </div>
            <div className="flex space-x-4">
              {/* Add navigation items here */}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Built with MERN Stack
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
