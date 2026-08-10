import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addCard, editCard } from "../../api/axios"
import { Card, Column } from "../../types";
import AddAndEditCardForm from "../forms/AddAndEditCardForm";

function AddAndEditCard({ setShowAddCardForm, column, card, cardOrder }: { setShowAddCardForm: (show: boolean) => void, column: Column, card: Card, cardOrder: number }) {
    const queryClient = useQueryClient();

    const [formValues, setFormValues] = useState({
        id: card.id || "",
        columnId: card.columnId || "",
        title: card.title || "",
        label: card.label || "",
        order: card.order || -1
    })

    const { mutateAsync: add } = useMutation({
        mutationFn: addCard,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cards'] })
    });
    const { mutateAsync: edit } = useMutation({
        mutationFn: editCard,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cards'] })
    })


    function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = event.target.name;
        const value = event.target.value;
        setFormValues({ ...formValues, [name]: value });
    }
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        // const formData: any = new FormData(event.currentTarget);
        // let newCard = (Object as any).fromEntries(formData);
        let newCard = { ...formValues, columnId: column.id, order: cardOrder }

        console.log(newCard);
        card.id !== "" ? edit({ id: card.id, card: newCard }) : add(newCard);
        setShowAddCardForm(false);
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