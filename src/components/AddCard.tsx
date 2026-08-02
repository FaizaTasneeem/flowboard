import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addCard } from "../api/axios"
import { Column } from "../types";

function AddCard({ setShowAddCardForm, column, newCardOrder }: { setShowAddCardForm: (show: boolean) => void, column: Column, newCardOrder: number }) {
    const queryClient = useQueryClient();
    const [formValues, setFormValues] = useState({
        title: "",
        label: ""
    })

    const { mutateAsync } = useMutation({
        mutationFn: addCard,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cards'] })
    });

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = event.target.name;
        const value = event.target.value;
        setFormValues({ ...formValues, [name]: value });
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData: any = new FormData(event.currentTarget);
        let newCard = (Object as any).fromEntries(formData);
        newCard = { ...newCard, columnId: column.id, order: newCardOrder }

        console.log(newCard);
        mutateAsync(newCard);
        setShowAddCardForm(false);
    }


    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <textarea
                name="title"
                id="title"
                value={formValues.title}
                onChange={handleFormChange}
                className="my-2 p-2 py-4 bg-[#1E1B36] border border-[#231F3B] rounded-lg focus:outline focus:outline-purple-800 placeholder:text-sm"
                placeholder="What needs to be done?"
            >
            </textarea>
            <div className="flex font-bold text-xs text-[#6E6894] gap-2">
                <label htmlFor="bug" className="cursor-pointer p-2 px-4 border border-[#231F3B] rounded-2xl bg-[#2D1322] text-[#FF4D6D]" >
                    <input type="radio" id="bug" name="label" value="bug" onChange={handleFormChange} hidden />
                    BUG
                </label>
                <label htmlFor="feat" className="cursor-pointer p-2 px-4 border border-[#231F3B] rounded-2xl bg-[#0E2B26] text-[#2DD4BF]" >
                    <input type="radio" id="feat" name="label" value="feat" onChange={handleFormChange} hidden />
                    FEAT
                </label>
                <label htmlFor="docs" className="cursor-pointer p-2 px-4 border border-[#231F3B] rounded-2xl bg-[#102340] text-[#60A5FA]" >
                    <input type="radio" id="docs" name="label" value="docs" onChange={handleFormChange} hidden />
                    DOCS
                </label>
            </div>

            <hr className="mt-2 w-full h-px border-none bg-[#1C192E]" />

            <div className="mt-2 text-xs text-[#6E6894] flex justify-end gap-2">
                <button className="cursor-pointer p-2 px-4 border border-[#231F3B] rounded-lg" onClick={() => setShowAddCardForm(false)}>Cancel</button>
                <button className="cursor-pointer p-2 px-4 border border-[#231F3B] rounded-lg" type="submit">Add</button>
            </div>

        </form>
    )
}

export default AddCard