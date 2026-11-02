import { useState } from "react";
import { Card, Column } from "../../types";
import AddAndEditCardForm from "../forms/AddAndEditCardForm";
import { useAddCard, useEditCard } from "../../hooks/useBoardQueries";

function AddAndEditCard({ setShowAddCardForm, column, card, cardOrder }: { setShowAddCardForm: (show: boolean) => void, column: Column, card: Card, cardOrder: number }) {
    const [formValues, setFormValues] = useState({
        id: card.id || "",
        columnId: card.columnId || "",
        title: card.title || "",
        label: card.label || "",
        order: card.order || -1
    })

    const { mutateAsync: add } = useAddCard();
    const { mutateAsync: edit } = useEditCard();

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = event.target.name;
        const value = event.target.value;
        setFormValues({ ...formValues, [name]: value });
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            let newCard = { ...formValues, columnId: column.id, order: cardOrder }

            card.id !== ""
                ? await edit({ id: card.id, card: newCard })
                : await add({ ...newCard, id: Date.now().toString() });
            setShowAddCardForm(false);
        }
        catch (error) {
            console.error("Failed to save card:", error);
        }
    }


    return (
        <AddAndEditCardForm
            formValues={formValues}
            handleSubmit={handleSubmit}
            handleFormChange={handleFormChange}
            setShowAddCardForm={setShowAddCardForm}
        />
    )
}

export default AddAndEditCard