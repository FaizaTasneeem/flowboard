import { useQuery } from '@tanstack/react-query'
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { fetchCards, fetchColumns } from '../api/axios'
import Header from './Header'
import ColumnComponent from './ColumnComponent';
import { Card, Column } from '../types';
import { useState, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

function Board() {
    const { data: columnData } = useQuery({
        queryKey: ['columns'],
        queryFn: fetchColumns
    })

    const { data: cardData } = useQuery({
        queryKey: ['cards'],
        queryFn: fetchCards
    })

    const [cardDataDummy, setCardDataDummy] = useState(cardData ?? []);
    useEffect(() => {
        if (cardData) {
            setCardDataDummy(cardData);
        }
    }, [cardData]);

    const getCardPos = (id: UniqueIdentifier | undefined) => cardDataDummy.findIndex((card: Card) => card.id === id);

    function swapOrder(cardDataDummy: Card[], activeId: UniqueIdentifier, overId: UniqueIdentifier | undefined) {
        const activeCurrentOrder = cardDataDummy.find((card: Card) => card.id === activeId)?.order;
        const overCurrentOrder = cardDataDummy.find((card: Card) => card.id === overId)?.order;

        console.log("activeCurrentOrder ", activeCurrentOrder)
        console.log("overCurrentOrder ", overCurrentOrder)

        const newCardData = cardDataDummy.map((card: Card) => {
            if (card.id === activeId) return { ...card, order: overCurrentOrder };
            if (card.id === overId) return { ...card, order: activeCurrentOrder };
            return card;
        })

        return newCardData;
    }

    function handleDragEnd(event: DragEndEvent) {
        console.log(event)
        const { active, over } = event;

        if (over) {
            console.log(`Dropped ${active.id} over ${over.id}`);
        }

        if (active.id === over?.id) return;

        setCardDataDummy((cardDataDummy: Card[]) => {
            const originalPos = getCardPos(active.id);
            const newPos = getCardPos(over?.id);
            const newCardData = swapOrder(cardDataDummy, active.id, over?.id);
            return arrayMove(newCardData, originalPos, newPos);
        })


    }


    return (
        <div className="w-full min-h-screen flex flex-col bg-[#0B0A13]">
            <Header />

            <DndContext
                onDragStart={({ active }) => {
                    console.log(`Started dragging ${active.id}`);
                }}
                onDragEnd={handleDragEnd}
            >
                <div className="w-full py-4 px-10 flex gap-4">
                    {cardDataDummy && columnData?.slice()
                        .sort((a: Column, b: Column) => a.order - b.order)
                        .map((column: Column) => (
                            <div key={column.id} className='w-1/4'>
                                <ColumnComponent column={column} cardData={cardDataDummy} />
                            </div>
                        ))
                    }
                </div>

            </DndContext>
        </div>
    )
}

export default Board