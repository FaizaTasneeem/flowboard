import axios from "axios";
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