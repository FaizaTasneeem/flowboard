import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, X } from "lucide-react";
import { deleteCard } from "../api/axios";
import { Card } from "../types"


function EditAndDeleteBtn({ showCardEditAndDeleteBtn, setShowEditForm, card }: { showCardEditAndDeleteBtn: string, setShowEditForm: (show: string) => void, card: Card }) {
  const queryClient = useQueryClient();

  const { mutateAsync: del } = useMutation({
    mutationFn: deleteCard,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cards'] })
  })

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