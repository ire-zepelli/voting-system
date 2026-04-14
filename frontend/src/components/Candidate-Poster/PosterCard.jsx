import React from 'react'
import sampleImage from '../../assets/sample-poster.png'
import CCS from '../../assets/uclmccs.png'
import PSITS from '../../assets/uclmpsits.png'

export default function PosterCard({ name, description, pdfLink }) {
    return (
        <div className=' ml-20 text-white p-4 w-11/12 rounded-lg shadow-lg bg-[#3B0B2E] '>
            <div className='flex'>
                <img src={CCS} alt="UCLM CCS Logo" className='w-16 h-auto' />
                <img src={PSITS} alt="UCLM PSITS Logo" className='w-16 h-auto' /> 
            </div>
            
            <h2 className='-ml-6 p-5 text-7xl font-bold'>{name}</h2>
            <div className='flex m-w-full gap-15'>
                <img src={sampleImage} alt={`${name}'s poster`} className='w-32 sm:w-48 md:w-64 lg:w-80 h-auto' />
                <div className='flex flex-col'>
                    <p className='text-3xl'>{description}</p>
                    {pdfLink && (
                        <a  
                            href={pdfLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='ml-auto self-start mt-auto px-4 py-2 bg-white text-[#3B0B2E] font-semibold rounded hover:bg-gray-200 transition'
                            >
                                View Credentials
                            </a>
                    )}    
                </div>
                

            </div>
        </div>
    )
}