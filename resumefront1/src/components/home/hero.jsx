
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const avatars = [
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    "https://randomuser.me/api/portraits/men/75.jpg",
    "https://randomuser.me/api/portraits/women/65.jpg",
  ];

  return (
    <>
      <div className="h-screen pb-20 bg-gradient-to-b from-[#F1EAFF] to-[#FFFFFF]">
        {/* Navbar */}
        <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-m text-indigo-800">
          <Link to="/">
            <h1 className="text-xl font-bold">RESUME BUILDER</h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4 text-slate-800">
            <Link to="/" className="px-6 py-2 hover:text-indigo-700 transition">HOME</Link>
            {!user && (
              <>
                <Link
                  to="/app?state=register"
                  className="px-6 py-2 bg-indigo-500 hover:bg-indigo-700 active:scale-95 transition-all rounded-full text-white"
                >
                  Get started
                </Link>
                <Link
                  to="/app?state=login"
                  className="px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900"
                >
                  Login
                </Link>
              </>
            )}
            {user && (
              <Link
                to="/app"
                className="px-8 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden active:scale-90 transition"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-6 md:hidden transition-transform duration-300 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
          }`}
        >
          {!user && (
            <>
              <Link
                to="/app?state=register"
                className="px-6 py-3 bg-indigo-500 rounded-full text-white text-lg"
                onClick={() => setMenuOpen(false)}
              >
                Get started
              </Link>
              <Link
                to="/app?state=login"
                className="px-6 py-3 border rounded-full text-white text-lg"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </>
          )}
          {user && (
            <Link
              to="/app"
              className="px-6 py-3 bg-green-500 rounded-full text-white text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-4 py-2 bg-indigo-600 rounded-md text-white"
          >
            Close
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
          <div className="absolute top-28 xl:top-10 -z-10 left-1/4 w-72 h-72 sm:w-96 sm:h-96 xl:w-[30rem] xl:h-[30rem] 2xl:w-[33rem] 2xl:h-[33rem] bg-indigo-300 blur-[100px] opacity-30"></div>

          {/* Avatars */}
          <div className="flex items-center mt-24">
            <div className="flex -space-x-3 pr-3">
              {avatars.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Avatar ${i + 1}`}
                  style={{ zIndex: i + 1 }}
                  className="w-8 h-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition"
                />
              ))}
            </div>
            <div>
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star text-transparent fill-indigo-600"
                      aria-hidden="true"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                  ))}
              </div>
              <p className="text-sm text-gray-700">Used by 10,000+ users</p>
            </div>
          </div>

          {/* Hero Text */}
          <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
            Build stunning resumes with{" "}
            <span className="bg-gradient-to-r from-indigo-700 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
              Pre-built
            </span>{" "}
            templates.
          </h1>
          <p className="max-w-md text-center text-base my-7">
            Create, edit and download professional resumes with pre-built template assistance
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-6">
  {!user && (
    <>
      <Link
        to="/app?state=register"
        className="px-4 py-2 md:px-7 md:py-4 bg-indigo-500 hover:bg-indigo-700 active:scale-95 transition-all rounded-full text-white text-base md:text-lg w-auto md:w-auto text-center"
      >
        Get started
      </Link>
      <Link
        to="/app?state=login"
        className="px-4 py-2 md:px-7 md:py-4 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900 text-base md:text-lg w-auto md:w-auto text-center"
      >
        Login
      </Link>
    </>
  )}
  {user && (
    <Link
      to="/app"
      className="px-5 py-2 md:px-9 md:py-4 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white text-base md:text-lg w-auto md:w-auto text-center"
    >
      Dashboard
    </Link>
  )}
</div>



        {/* Footer */}
        <footer className="w-full bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 mt-24">
          <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
            <h1 className="text-xl mb-6">Resume Builder</h1>
            <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
              Empowering creators worldwide with the most advanced AI content creation tools. Transform your ideas into reality.
            </p>
          </div>
          <div className="border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
              <Link to="/">Resume Builder</Link> ©2025. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      {/* Global Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}
      </style>
    </>
  );
};

export default Hero;
