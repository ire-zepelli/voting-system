import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const isHome = location.pathname === "/";
  const navLinkClass =
    "text-[17px] font-normal mt-1 hover:text-[#FFA700] transition-all duration-300 pb-1 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-[#FFA700] hover:after:w-full after:bottom-0 after:left-0 after:transition-all after:duration-300";

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <nav className="w-full font-poppins bg-transparent text-white/90">
      {/* Desktop */}
      <div className="hidden sm:flex items-center px-6 sm:px-10 py-8 gap-10 sm:gap-14">
        <Link
          to="/"
          className={`flex items-center gap-3 hover:text-white transition-all duration-300 group whitespace-nowrap`}
        >
          {!isHome && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 opacity-80 group-hover:opacity-100 group-hover:-translate-x-1 transition-transform duration-300"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          )}
          <span className="text-[17px] font-normal tracking-tight">
            {isHome ? "Home" : "Return to Home"}
          </span>
        </Link>

        <Link
          to="/partylist"
          className={navLinkClass}
        >
          Candidates
        </Link>
        {isAuthenticated && (
          <>
            <Link
              to="/voting"
              className={navLinkClass}
            >
              Voting
            </Link>
            <Link
              to="/results"
              className={navLinkClass}
            >
              Results
            </Link>
          </>
        )}

        <div className="ml-auto flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm uppercase tracking-[0.18em] text-white/60">
                ID {user?.studentId}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-[16px] font-normal hover:text-[#FFA700] transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={navLinkClass}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex items-center justify-between px-5 py-6">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 hover:text-white transition-all duration-300 group"
        >
          {!isHome && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 opacity-80 group-hover:-translate-x-1 transition-transform duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          )}
          <span className="text-[15px]">{isHome ? "Home" : "Return to Home"}</span>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-[5px] p-1"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[2px] bg-white/90 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-5 h-[2px] bg-white/90 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-[2px] bg-white/90 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      <div
        className={`sm:hidden flex flex-col items-center gap-5 overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-72 pb-6" : "max-h-0"}`}
      >
        <Link
          to="/partylist"
          onClick={() => setMenuOpen(false)}
          className="text-[16px] hover:text-[#FFA700] transition-colors duration-300"
        >
          Candidates
        </Link>
        {isAuthenticated && (
          <>
            <Link
              to="/voting"
              onClick={() => setMenuOpen(false)}
              className="text-[16px] hover:text-[#FFA700] transition-colors duration-300"
            >
              Voting
            </Link>
            <Link
              to="/results"
              onClick={() => setMenuOpen(false)}
              className="text-[16px] hover:text-[#FFA700] transition-colors duration-300"
            >
              Results
            </Link>
          </>
        )}

        {isAuthenticated ? (
          <>
            <span className="text-xs uppercase tracking-[0.18em] text-white/60">
              ID {user?.studentId}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="text-[16px] hover:text-[#FFA700] transition-colors duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-[16px] hover:text-[#FFA700] transition-colors duration-300"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
