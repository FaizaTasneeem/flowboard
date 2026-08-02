import { useState } from "react"
import { Column, Card } from "../types"
import AddCard from "./AddCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCard } from "../api/axios";

function Column({ column, cardData }: { column: Column, cardData: Card[] }) {
    const queryClient = useQueryClient();
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const [showCardDeleteBtn, setShowCardDeleteBtn] = useState("");
    const [newCardOrder] = useState(cardData.filter(card => card.columnId === column.id).length + 1);

    const { mutateAsync } = useMutation({
        mutationFn: deleteCard,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cards'] })
    })

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
                        .map(card =>
                            <div key={card.id} className="p-2 flex justify-between items-start bg-[#1E1B36] border border-[#252140] rounded-lg text-[#E2E8F0] cursor-pointer " onMouseEnter={() => setShowCardDeleteBtn(card.id)} onMouseLeave={() => setShowCardDeleteBtn("")}>
                                <div className="flex gap-2 ">
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
                                    <div className="font-small text-sm rounded-lg">{card.title}</div>
                                </div>
                                <button
                                    className={`cursor-pointer text-gray-400 ${showCardDeleteBtn === card.id ? 'opacity-100' : 'opacity-0'}`}
                                    onClick={() => { console.log(card.id); mutateAsync(card.id) }}
                                >
                                    x
                                </button>
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

                    {showAddCardForm && <AddCard setShowAddCardForm={setShowAddCardForm} column={column} newCardOrder={newCardOrder} />}
                </div>
            </div>
        </div >
    )
}

export default Column