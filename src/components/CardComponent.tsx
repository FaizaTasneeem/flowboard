import { useState } from "react"
import { useDraggable } from "@dnd-kit/core";
import EditAndDeleteBtn from "./EditAndDeleteBtn";
import AddAndEditCard from "./AddAndEditCard";
import { Card, Column } from "../types";

function CardComponent({ card, column, idx }: { card: Card, column: Column, idx: number }) {
    const [showCardEditAndDeleteBtn, setShowCardEditAndDeleteBtn] = useState("");
    const [showEditForm, setShowEditForm] = useState("");
    const { attributes, listeners, setNodeRef } = useDraggable({ id: card.id });

    return (
        <div
            className="flex flex-col"
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >

            {showEditForm !== card.id &&
                <div
                    className="p-2 flex justify-between items-start bg-[#18182C] hover:bg-[#1F1D35] border border-[#2A2A45] hover:border-[#3D3760] rounded-lg text-[#E2E8F0] cursor-grab"
                    onMouseEnter={() => setShowCardEditAndDeleteBtn(card.id)}
                    onMouseLeave={() => setShowCardEditAndDeleteBtn("")}
                >
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
                    <EditAndDeleteBtn showCardEditAndDeleteBtn={showCardEditAndDeleteBtn} setShowEditForm={setShowEditForm} card={card} />
                </div>
            }

            {showEditForm === card.id &&
                <AddAndEditCard
                    setShowAddCardForm={() => setShowEditForm("")}
                    column={column}
                    card={card}
                    cardOrder={idx}
                />
            }

        </div>
    )
}

export default CardComponent