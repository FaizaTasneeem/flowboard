import { Card } from "../../types"

function AddAndEditCardForm({ formValues, handleSubmit, handleFormChange, setShowAddCardForm }: {
    formValues: Card,
    handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void,
    handleFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    setShowAddCardForm: (show: boolean) => void
}) {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <textarea
                name="title"
                id="title"
                value={formValues.title}
                onPointerDown={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                onChange={handleFormChange}
                className="my-2 p-2 py-4 bg-[#1E1B36] text-xs border border-[#231F3B] rounded-lg focus:outline focus:outline-purple-800 placeholder:text-xs"
                placeholder="What needs to be done?"
            >
            </textarea>
            <div className="flex font-bold text-xs text-[#6E6894] gap-2">
                <label htmlFor="bug" onPointerDown={(e) => e.stopPropagation()} className={`cursor-pointer p-2 px-4 border ${formValues.label === "bug" ? 'border-red-300' : 'border-[#231F3B]'} rounded-2xl bg-[#2D1322] text-[#FF4D6D]`} >
                    <input
                        type="radio"
                        id="bug"
                        name="label"
                        value={"bug"}
                        checked={formValues.label === "bug"}
                        onChange={handleFormChange}
                        hidden
                    />
                    BUG
                </label>
                <label htmlFor="feat" onPointerDown={(e) => e.stopPropagation()} className={`cursor-pointer p-2 px-4 border ${formValues.label === "feat" ? 'border-green-300' : 'border-[#231F3B]'} rounded-2xl bg-[#0E2B26] text-[#2DD4BF]`} >
                    <input
                        type="radio"
                        id="feat"
                        name="label"
                        value={"feat"}
                        checked={formValues.label === "feat"}
                        onChange={handleFormChange}
                        hidden
                    />
                    FEAT
                </label>
                <label htmlFor="docs" onPointerDown={(e) => e.stopPropagation()} className={`cursor-pointer p-2 px-4 border ${formValues.label === "docs" ? 'border-blue-300' : 'border-[#231F3B]'} rounded-2xl bg-[#102340] text-[#60A5FA]`} >
                    <input
                        type="radio"
                        id="docs"
                        name="label"
                        value={"docs"}
                        checked={formValues.label === "docs"}
                        onChange={handleFormChange}
                        hidden
                    />
                    DOCS
                </label>
            </div>

            <hr className="mt-2 w-full h-px border-none bg-[#1C192E]" />

            <div className="mt-2 text-xs text-[#6E6894] flex justify-end gap-2">
                <button className="cursor-pointer p-2 px-4 border border-[#231F3B] rounded-lg" onPointerDown={(e) => e.stopPropagation()} onClick={() => setShowAddCardForm(false)} type="button">Cancel</button>
                <button className="cursor-pointer p-2 px-4 border border-[#231F3B] rounded-lg" onPointerDown={(e) => e.stopPropagation()} type="submit">Save</button>
            </div>

        </form>
    )
}

export default AddAndEditCardForm