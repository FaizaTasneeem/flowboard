import { useState } from "react"
import { Column, Card } from "../types"
import AddAndEditCard from "./AddAndEditCard";
import CardComponent from "./CardComponent";

function ColumnComponent({ column, cardData }: { column: Column, cardData: Card[] }) {
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const [newCardOrder] = useState(cardData?.filter(card => card.columnId === column.id).length);


    return (
        <div className="p-2 bg-[#100E1D] border border-[#231F3B] rounded-lg">
            <div className="flex flex-col">
                <span className="p-2 flex justify-between items-center font-bold text-sm text-white">
                    <div className="flex gap-2 items-center">
                        <div
                            style={{
                                backgroundColor: `${column.color}`,
                                boxShadow: `0 0 8px ${column.color}`
                            }}
                            className="w-2 h-2 rounded-full shadow-2xl">
                        </div>
                        {column.title}
                    </div>
                    <span className="p-3 w-2.5 h-2.5 rounded-full text-xs font-normal flex justify-center items-center bg-[#18182C]">{cardData?.filter(card => card.columnId === column.id).length}</span>

                </span>
                <hr className="mt-2 w-full h-px border-none bg-[#1C192E]" />

                <div className="p-2 flex flex-col gap-2 text-[#E2E8F0]">
                    {cardData?.filter(card => card.columnId === column.id)
                        .slice()
                        .sort((a, b) => a.order - b.order)
                        .map((card, idx) =>
                            <div key={card.id}>
                                <CardComponent card={card} column={column} idx={idx} />
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
                        <AddAndEditCard
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

export default ColumnComponent