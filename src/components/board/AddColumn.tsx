import { useState } from "react"
function AddColumn() {
    const [showColumnForm, setShowColumnForm] = useState(false);

    function handleColumnFormSubmit() {

    }

    return (
        <div
            className="p-2 bg-[#100E1D] flex flex-col justify-center items-center border border-[#231F3B] font-bold text-sm text-white rounded-lg cursor-pointer"
            onClick={() => setShowColumnForm(!showColumnForm)}
        >
            <span className="p-2">+ Add Column</span>

            {showColumnForm &&
                <form onSubmit={handleColumnFormSubmit} className="p-2 w-full flex flex-col">
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="my-2 p-2 py-4 bg-[#1E1B36] text-xs border border-[#231F3B] rounded-lg focus:outline focus:outline-purple-800 placeholder:text-xs placeholder:text-gray-300"
                        placeholder="column title"
                        required
                    />
                    <input
                        type="text"
                        id="color"
                        name="color"
                        className="my-2 p-2 py-4 bg-[#1E1B36] text-xs border border-[#231F3B] rounded-lg focus:outline focus:outline-purple-800 placeholder:text-xs placeholder:text-gray-300"
                        placeholder="column color"
                        required
                    />

                </form>
            }
        </div>
    )
}

export default AddColumn