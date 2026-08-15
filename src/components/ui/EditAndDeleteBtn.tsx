import { Pencil, X } from "lucide-react";
import { Card } from "../../types"
import { useDeleteCard } from "../../hooks/useBoardQueries";


function EditAndDeleteBtn({ showCardEditAndDeleteBtn, setShowEditForm, card }: { showCardEditAndDeleteBtn: string, setShowEditForm: (show: string) => void, card: Card }) {
  const { mutateAsync: del } = useDeleteCard();

  return (
    <div className="flex gap-1">
      <button
        className={`cursor-pointer text-gray-400 ${showCardEditAndDeleteBtn === card.id ? 'opacity-100' : 'opacity-0'}`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => setShowEditForm(card.id)}
      >
        <Pencil size={10} />
      </button>
      <button
        className={`cursor-pointer text-gray-400 ${showCardEditAndDeleteBtn === card.id ? 'opacity-100' : 'opacity-0'}`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => del(card.id)}
      >
        <X size={12} />
      </button>
    </div>
  )
}

export default EditAndDeleteBtn