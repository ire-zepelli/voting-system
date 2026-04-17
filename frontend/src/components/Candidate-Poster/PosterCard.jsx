import React, { useState } from 'react'
import sampleImage from '../../assets/sample-poster.png'
import CCS from '../../assets/uclmccs.png'
import PSITS from '../../assets/uclmpsits.png'

export default function PosterCard({ title, name, description, pdfLink, image, className }) {
    const [showPdf, setShowPdf] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const getEmbedUrl = (url) => {
        if (!url) return '';
        // Convert Google Drive view link to preview link for embedding
        if (url.includes('drive.google.com') && url.includes('/view')) {
            return url.replace('/view', '/preview');
        }
        return url;
    };

    return (
        <div className={`flex flex-col text-white p-6 sm:p-10 rounded-[2rem] shadow-2xl bg-gradient-to-b from-[#3B0B2E] to-[#200518] border border-white/5 ${className || 'ml-20 w-11/12'}`}>
            {/* Header: Logos & Title */}
            <div className='flex justify-between items-center mb-8 border-b border-white/10 pb-6 shrink-0'>
                <div className='flex gap-4' onClick={() => { setShowPdf(false); setIframeLoaded(false); }} style={{ cursor: showPdf ? 'pointer' : 'default' }}>
                    <img src={CCS} alt="UCLM CCS Logo" className='w-16 h-auto drop-shadow-md' />
                    <img src={PSITS} alt="UCLM PSITS Logo" className='w-16 h-auto drop-shadow-md' />
                </div>
                {(title || showPdf) && (
                    <h3 className='text-3xl sm:text-4xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#ff9500] to-[#ffb74d] drop-shadow-[0_2px_15px_rgba(255,149,0,0.5)] uppercase text-center flex-1'>
                        {showPdf ? 'Credentials' : title}
                    </h3>
                )}
                <div className='w-32 flex justify-end'>
                    {showPdf && (
                        <button
                            onClick={() => { setShowPdf(false); setIframeLoaded(false); }}
                            className='px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all'
                        >
                            ← Info
                        </button>
                    )}
                </div>
            </div>


            {/* Main Content Area */}
            {showPdf ? (
                <div className='flex-1 w-full min-h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center relative shadow-inner'>
                    {!iframeLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center z-0">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-10 h-10 border-[3px] border-white/5 border-t-[#ff9500] rounded-full animate-spin"></div>
                                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Securely Loading</span>
                            </div>
                        </div>
                    )}
                    <iframe
                        src={getEmbedUrl(pdfLink)}
                        className={`w-full h-full border-none min-h-[50vh] bg-transparent transition-opacity duration-700 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                        title={`${name} Credentials`}
                        allow="autoplay"
                        loading="lazy"
                        onLoad={() => setIframeLoaded(true)}
                    />
                </div>
            ) : (
                <div className='flex flex-col sm:flex-row w-full flex-1 gap-10 lg:gap-16 min-h-[400px]'>

                    {/* Candidate Portrait with Glowing/Textured Background */}
                    <div className='shrink-0 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#ff9500]/40 via-[#3B0B2E]/70 to-[#d13a8b]/40 border-[3px] border-white/20 shadow-[inset_0_0_30px_rgba(255,255,255,0.15),0_20px_50px_rgba(0,0,0,0.7)] p-4 w-64 sm:w-[22rem] lg:w-[28rem] xl:w-[32rem] min-h-[300px] h-full group'>
                        {/* Dark gradient fade at the bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0313] via-transparent to-transparent opacity-50 pointer-events-none" />

                        <img
                            src={image || sampleImage}
                            alt={`${name}'s poster`}
                            className='relative z-10 w-full h-full rounded-2xl object-cover drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500 ease-out'
                            loading="lazy"
                        />
                    </div>

                    {/* Info Text Area */}
                    <div className='flex flex-col'>
                        <h2 className='text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-tighter mb-4'>
                            {name}
                        </h2>
                        <div className='w-full flex justify-start pb-5'>
                            {pdfLink && (
                                <button
                                    onClick={() => setShowPdf(true)}
                                    className='shrink-0 px-6 py-2.5 bg-gradient-to-r from-[#ff9500] to-[#d48108] text-black font-extrabold text-sm sm:text-base tracking-wide rounded-full hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(255,149,0,0.4)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 w-max'
                                >
                                    View Credentials
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Decorative separator */}
                        <div className='w-24 h-2 p-1 bg-gradient-to-r from-[#ff9500] to-[#d13a8b] rounded-full mb-6 shadow-[0_0_10px_rgba(255,149,0,0.6)]'></div>

                        <p className='text-2xl sm:text-2xl text-white/80 font-light leading-relaxed mb-6'>
                            {description}
                        </p>

                    </div>
                </div>
            )}
        </div>
    )
}