import axios from "axios";
import { Card, cardsParamsType } from "../types";

const columnsPath = `http://localhost:4000/columns`;
const cardsPath = `http://localhost:4000/cards`;

export async function fetchColumns() {
    const { data } = await axios.get(columnsPath);
    return data;
}

export async function fetchCards({ title, label }: cardsParamsType) {
    if (!title && !label) {
        const { data } = await axios.get(`${cardsPath}?_sort=order`);
        return data;
    }
    if (label) {
        const { data } = await axios.get(`${cardsPath}?_sort=order&label=${label}`);
        console.log(data)
        return data;
    }
    const { data } = await axios.get(`${cardsPath}?_sort=order&title=${title}&label=${label}`);
    return data;
}

export async function addCard(card: Card) {
    const { data } = await axios.post(cardsPath, card);
    return data;
}

export async function editCard({ id, card }: { id: string, card: Card }) {
    const { data } = await axios.patch(`${cardsPath}/${id}`, card)
    return data;
}

export async function deleteCard(id: string) {
    const { data } = await axios.delete(`${cardsPath}/${id}`)
    return data;
}

export async function updateCardList(updatedList: Card[]) {
    const newListRequests = updatedList.map(card => editCard({ id: card.id, card }));
    return Promise.all(newListRequests);
}