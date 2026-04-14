export default function ViewPDFbtn({ href, children }) {
    if (href) {
        return (
            <a>
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className='self-start px-4 py-2 bg-white text-[#3B0B2E] font-semibold rounded hover:bg-gray-200 transition'
            
                {children}
            </a>
        )
    }

    return (
        <button className='self-start px-4 py-2 bg-white text-[#3B0B2E] font-semibold rounded hover:bg-gray-200 transition'>
            {children}
        </button>
    )
}