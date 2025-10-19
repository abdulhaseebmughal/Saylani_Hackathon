import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-100 mt-auto">
        <div className="max-w-6xl mx-auto py-6 px-6">
          <p className="text-center text-gray-400 text-sm font-light">
            © 2025 PitchCraft. AI-Powered Pitch Generation.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
