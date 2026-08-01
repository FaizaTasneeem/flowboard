import { Column, Card } from "../types"

function Column({ column, cardData }: { column: Column, cardData: Card[] }) {
    return (
        <div className="p-2 bg-[#100E1D] border border-[#231F3B] rounded-lg">
            <div className="flex flex-col">
                <span className="p-2 flex gap-2 items-center font-bold text-sm text-white">
                    <div
                        style={{
                            backgroundColor: `${column.color}`,
                            boxShadow: `0 0 8px ${column.color}`
                        }}
                        className="w-2 h-2 rounded-full shadow-2xl">
                    </div>
                    {column.title}
                </span>
                <hr className="mt-2 w-full h-px border-none bg-[#1C192E]" />

                <div className="p-2 flex flex-col gap-2 font-medium text-sm text-[#E2E8F0]">
                    {cardData
                        .filter(card => card.columnId === column.id)
                        .map(card =>
                            <div className="p-2 flex items-start gap-2 bg-[#151327] border border-[#252140] rounded-lg text-[#E2E8F0] cursor-pointer ">
                                <div
                                    className={`py-1 px-2 font-bold text-xs rounded-lg border border-[#231F3B] bg-opacity-0 uppercase
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
                                <div className="rounded-lg">{card.title}</div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Column