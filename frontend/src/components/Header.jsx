import React from 'react'

function Header() {
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


        </div>
    )
}

export default Header
