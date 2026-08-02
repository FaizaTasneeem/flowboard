import { useState } from "react"
import { Column, Card } from "../types"
import AddCard from "./AddCard";
import EditAndDelete from "./EditAndDelete";
import AddCardForm from "./AddCardForm";
import { useQueryClient, useMutation } from "@tanstack/react-query";

function Column({ column, cardData }: { column: Column, cardData: Card[] }) {
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const [showCardEditAndDeleteBtn, setShowCardEditAndDeleteBtn] = useState("");
    const [showEditForm, setShowEditForm] = useState("");
    const [newCardOrder] = useState(cardData.filter(card => card.columnId === column.id).length);

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

                <div className="p-2 flex flex-col gap-2 text-[#E2E8F0]">
                    {cardData
                        .filter(card => card.columnId === column.id)
                        .map((card, idx) =>
                            <div key={card.id} className="flex flex-col">

                                {showEditForm !== card.id &&
                                    <div className="p-2 flex justify-between items-start bg-[#18182C] hover:bg-[#1F1D35] border border-[#2A2A45] hover:border-[#3D3760] rounded-lg text-[#E2E8F0] " onMouseEnter={() => setShowCardEditAndDeleteBtn(card.id)} onMouseLeave={() => setShowCardEditAndDeleteBtn("")}>
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
                                        <EditAndDelete showCardEditAndDeleteBtn={showCardEditAndDeleteBtn} setShowEditForm={setShowEditForm} card={card} />
                                    </div>
                                }

                                {showEditForm === card.id &&
                                    <AddCard
                                        setShowAddCardForm={() => setShowEditForm("")}
                                        column={column}
                                        card={card}
                                        cardOrder={idx}
                                    />
                                }

                            </div>
                        )
                    }

                    {!showAddCardForm &&
                        <button
                            className="p-2 cursor-pointer text-left text-[#4B466A] font-medium text-sm border border-dashed border-[#221E38] rounded-lg hover:border-gray-400 hover:text-gray-400"
                            onClick={() => setShowAddCardForm(true)}
                        >
                            + Add card
                        </button>
                    }

                    {showAddCardForm &&
                        <AddCard
                            setShowAddCardForm={setShowAddCardForm}
                            column={column}
                            card={{
                                id: "",
                                columnId: "",
                                title: "",
                                label: "",
                                order: -1
                            }}
                            cardOrder={newCardOrder + 1}
                        />
                    }
                </div>
            </div>
        </div >
    )
}

export default Column