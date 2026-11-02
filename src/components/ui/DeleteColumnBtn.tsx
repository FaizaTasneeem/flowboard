import { Trash2 } from "lucide-react";
import { useDeleteColumn } from "../../hooks/useBoardQueries";

function DeleteColumnBtn({ colId }: { colId: string }) {
    const { mutateAsync: del } = useDeleteColumn();

    return (
        <>
            {colId !== "col-backlog" && colId !== "col-todo" && colId !== "col-in-progress" && colId !== "col-done" &&
                <div onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); del(colId) }}>
                    <Trash2 size={16} className="cursor-pointer text-gray-400 hover:text-red-400" />
                </div>
            }
        </>
    )
}

export default DeleteColumnBtn