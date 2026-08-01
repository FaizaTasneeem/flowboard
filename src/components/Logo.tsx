
function Logo() {
    return (
        <div className="flex items-center gap-2.5 select-none">
            {/* Purple Icon Box */}
            <div className="w-8 h-8 rounded-lg bg-[#815BF5] flex items-center justify-center shadow-sm">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-white/90"
                >
                    <rect x="4" y="4" width="16" height="16" rx="1" />
                    <line x1="12" y1="4" x2="12" y2="20" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                </svg>
            </div>

            <span className="font-bold font-sans text-white">
                Flow
                <span className="text-[#7C5CFC]">Board</span>
            </span>
        </div>
    )
}

export default Logo