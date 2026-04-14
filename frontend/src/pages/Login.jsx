import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Input from '../components/Input';
import uclmccs from '../assets/uclmccs.png';
import uclmpsits from '../assets/uclmpsits.png';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  // Determine current view state based on pathname
  const isNotSignedIn = path === '/login/not-signed-in';
  const isTimerExpired = path === '/login/timerexpired' || path === '/timer-expired';
  const isLogin = !isNotSignedIn && !isTimerExpired;

  return (
    <div className="min-h-screen flex flex-col font-inter" style={{ backgroundColor: '#34102A' }}>
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {/* Dynamic Content */}
        <div className="w-full max-w-[550px] fade-in-up">
          {/* Logos */}
          <div className="flex gap-1 mb-1 items-center justify-start ml-1">
            <img src={uclmccs} alt="UCLM CCS Logo" className="w-[45px] h-auto object-contain" />
            <img src={uclmpsits} alt="UCLM PSITS Logo" className="w-[45px] h-auto object-contain" />
          </div>

          {isLogin && (
            <>
              <h1 className="text-[46px] font-bold text-white mb-6 tracking-tight">Login</h1>
              <form onSubmit={(e) => e.preventDefault()}>
              <Input label="ID Number" id="idNumber" type="text" maxLength={8} placeholder=""/>                
              <Input label="Password" id="password" type="password" placeholder="" />
                
                <div className="flex items-center gap-2 mb-6 mt-1">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="w-3.5 h-3.5 rounded-sm bg-white border-0 text-[#FFA700] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#FFA700]"
                  />
                  <label htmlFor="remember" className="text-xs text-white/90 cursor-pointer pt-[2px]">
                    Remember me
                  </label>
                </div>

                <Button onClick={() => navigate('/')}>Login</Button>
                
                <div className="mt-8 text-center text-sm text-white/80">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-[#FFA700] hover:text-[#E58000] hover:underline transition-colors font-medium">
                    Register
                  </Link>
                </div>
              </form>
            </>
          )}

          {isNotSignedIn && (
            <>
              <h1 className="text-[44px] font-bold text-white mb-2 tracking-tight mt-1">Oops!</h1>
              <h2 className="text-[44px] font-bold text-white mb-12 tracking-tight leading-8">Please sign in to continue.</h2>
              <Button onClick={() => navigate('/login')}>Redirect to Login</Button>
            </>
          )}

          {isTimerExpired && (
            <>
              <h1 className="text-[44px] font-bold text-white mb-8 tracking-tight leading-[1.1] mt-6">The election has officially <br /> ended.</h1>
              <Button onClick={() => navigate('/')}>Back to Homepage</Button>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
