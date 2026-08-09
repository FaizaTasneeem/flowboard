import { Card } from "../types"

function CardElem({ card }: { card: Card }) {
    return (
        <div className="flex gap-2 items-start  min-w-0 flex-1">
            <div
                className={`py-1 px-2 font-bold text-[10px] rounded-sm border border-[#231F3B] bg-opacity-0 uppercase 
                    ${card.label === 'bug'
                        ? 'bg-[#2D1322] text-[#FF4D6D]'
                        : card.label === 'feat'
                            ? 'bg-[#0E2B26] text-[#2DD4BF]'
                            : card.label === 'docs'
                                ? 'bg-[#102340] text-[#60A5FA]'
                                : ''
                    }`}
            >
                {card.label}
            </div>
            <div className="w-2/3 text-sm rounded-lg break-words overflow-hidden">{card.title}</div>
        </div>
    )
}

export default CardElem