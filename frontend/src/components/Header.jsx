import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className='h-16 flex flex-row items-center px-4 bg-[#3B0B2E]/5 text-white mx-5 gap-5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            <p className='pr-10'>Return to Home</p>
            <div className='flex flex-row gap-15'>
                <p>Candidates</p>
                <p>Voting</p>
                <p>Results</p>
            </div>

            {/* Mobile */}
            <div className="sm:hidden flex items-center justify-between px-5 py-6">
                <Link to="/" className="flex items-center gap-2 hover:text-white transition-all duration-300 group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 opacity-80 group-hover:-translate-x-1 transition-transform duration-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <span className="text-[15px]">Return to Home</span>
                </Link>

                <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-[5px] p-1" aria-label="Toggle menu">
                    <span className={`block w-5 h-[2px] bg-white/90 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                    <span className={`block w-5 h-[2px] bg-white/90 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-5 h-[2px] bg-white/90 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </button>
            </div>

            <div className={`sm:hidden flex flex-col items-center gap-5 overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                <Link to="/candidate-poster" onClick={() => setMenuOpen(false)} className="text-[16px] hover:text-[#FFA700] transition-colors duration-300">Candidates</Link>
                <Link to="/voting"           onClick={() => setMenuOpen(false)} className="text-[16px] hover:text-[#FFA700] transition-colors duration-300">Voting</Link>
                <Link to="/results"          onClick={() => setMenuOpen(false)} className="text-[16px] hover:text-[#FFA700] transition-colors duration-300">Results</Link>
            </div>
        </div>
    );
}

export default Header;