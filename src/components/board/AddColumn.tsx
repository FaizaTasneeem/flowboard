import { useState } from "react";
import { useAddColumn } from "../../hooks/useBoardQueries";

function AddColumn({ colOrder }: { colOrder: number }) {
    const [showColumnForm, setShowColumnForm] = useState(false);
    const [colName, setColName] = useState("");
    const [colColor, setColColor] = useState("");

    const { mutateAsync: addCol } = useAddColumn();

    async function handleColumnFormSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            let newCol = { id: crypto.randomUUID(), title: colName, color: colColor, order: colOrder };
            await addCol(newCol);
            setShowColumnForm(false);
            setColName("");
            setColColor("");
        }
        catch (error) {
            console.error("Failed to add column:", error);
        }
    }

    return (
        <div className="w-96 shrink-0 p-2 bg-[#100E1D] flex flex-col justify-center items-center border border-[#231F3B] font-bold text-sm text-white rounded-lg cursor-pointer">
            <span className="w-full p-2" onClick={() => setShowColumnForm(!showColumnForm)}>+ Add Column</span>

            {showColumnForm &&
                <form onSubmit={handleColumnFormSubmit} className="p-2 w-full flex flex-col">
                    <input
                        type="text"
                        id="colTitle"
                        name="colTitle"
                        value={colName}
                        onChange={(e) => setColName(e.target.value)}
                        className="my-2 p-2 py-4 bg-[#1E1B36] text-xs border border-[#231F3B] rounded-lg focus:outline focus:outline-purple-800 placeholder:text-xs placeholder:text-gray-400"
                        placeholder="column title"
                        required
                    />
                    <input
                        type="text"
                        id="colColor"
                        name="colColor"
                        value={colColor}
                        onChange={(e) => setColColor(e.target.value)}
                        className="my-2 p-2 py-4 bg-[#1E1B36] text-xs border border-[#231F3B] rounded-lg focus:outline focus:outline-purple-800 placeholder:text-xs placeholder:text-gray-400"
                        placeholder="column color"
                        required
                    />

                    <div className="mt-2 text-xs text-[#6E6894] flex justify-end gap-2">
                        <button className="cursor-pointer p-2 px-4 border border-[#231F3B] rounded-lg" onPointerDown={(e) => e.stopPropagation()} onClick={() => setShowColumnForm(false)} type="button">Cancel</button>
                        <button className="cursor-pointer p-2 px-4 border border-[#231F3B] rounded-lg" onPointerDown={(e) => e.stopPropagation()} type="submit">Save</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default AddColumn