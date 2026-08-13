import axios from "axios";
import { Card } from "../types";

const columnsPath = `http://localhost:4000/columns`;
const cardsPath = `http://localhost:4000/cards`;

export async function fetchColumns() {
    const { data } = await axios.get(columnsPath);
    return data;
}

export async function fetchCards() {
    const { data } = await axios.get(cardsPath);
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

export async function updateCardList({ prevList, updatedList }: { prevList: Card[], updatedList: Card[] }) {
    const filteredList = updatedList.filter(updatedCard => {
        const filteredCard = prevList.find(prevCard => updatedCard.id === prevCard.id);
        return filteredCard?.columnId !== updatedCard.columnId || filteredCard?.order !== updatedCard.order;
    });
    const newListRequests = filteredList.map(card => editCard({ id: card.id, card }));
    return Promise.all(newListRequests);
}