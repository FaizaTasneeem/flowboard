import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditAndDeleteBtn from "../ui/EditAndDeleteBtn";
import AddAndEditCard from "./AddAndEditCard";
import { Card, Column } from "../../types";
import CardElem from "./CardView";

function CardComponent({ card, column, idx }: { card: Card, column: Column, idx: number }) {
    const [showCardEditAndDeleteBtn, setShowCardEditAndDeleteBtn] = useState("");
    const [showEditForm, setShowEditForm] = useState<string | null>(null);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id, data: card });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            className="flex flex-col"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >

            {showEditForm !== card.id &&
                <div
                    className="p-2 flex justify-between items-start bg-[#18182C] hover:bg-[#1F1D35] border border-[#2A2A45] hover:border-[#3D3760] rounded-lg text-[#E2E8F0] cursor-grab"
                    onMouseEnter={() => setShowCardEditAndDeleteBtn(card.id)}
                    onMouseLeave={() => setShowCardEditAndDeleteBtn("")}
                >
                    <CardElem card={card} />
                    <EditAndDeleteBtn showCardEditAndDeleteBtn={showCardEditAndDeleteBtn} setShowEditForm={setShowEditForm} card={card} />
                </div>
            }

            {showEditForm === card.id &&
                <AddAndEditCard
                    setShowAddCardForm={() => setShowEditForm(null)}
                    column={column}
                    card={card}
                    cardOrder={idx}
                />
            }

        </div>
    )
}

export default CardComponent