import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Input from '../components/Input';
import uclmccs from '../assets/uclmccs.png';
import uclmpsits from '../assets/uclmpsits.png';

export default function Register() {
  const navigate = useNavigate();

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

          <h1 className="text-[46px] font-bold text-white mb-6 tracking-tight">Register</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input label="ID Number" id="idNumber" type="text" maxLength={8} placeholder=""/>                
            <Input label="Password" id="password" type="password" placeholder="" />
            <Input label="Confirm Password" id="confirmPassword" type="password" placeholder="" />
            
            <div className="mt-8">
              <Button onClick={() => navigate('/login')}>Register</Button>
            </div>
            
            <div className="mt-8 text-center text-sm text-white/80">
              Already have an account?{' '}
              <Link to="/login" className="text-[#FFA700] hover:text-[#E58000] hover:underline transition-colors font-medium">
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
