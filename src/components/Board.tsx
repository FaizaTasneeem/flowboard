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


    const getCardPos = (id: UniqueIdentifier) => cardDataDummy.findIndex((card: Card) => card.id === id);

    const getOverColumnLastIdx = (overId: UniqueIdentifier) => {
        const overColumnIdxList = cardDataDummy.map((card: Card, idx: number) => {
            if (card.columnId === overId) return idx;
            return -1;
        });
        const reversedOverColumnIdxList = overColumnIdxList.toReversed();
        const overColumnLastIdx = reversedOverColumnIdxList.find((idx: number) => idx !== -1);
        return overColumnLastIdx + 1;

    }

    function swapCol(cardDataDummy: Card[], activeCardId: UniqueIdentifier, overColId: UniqueIdentifier) {
        return cardDataDummy.map((card: Card) => {
            if (card.id === activeCardId) return { ...card, columnId: overColId.toString() };
            return card;
        })
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        let newCardData: Card[] = cardDataDummy;

        if (!over || active.id === over?.id) return;
        console.log(`Dropped ${active.id} over ${over.id}`);

        let activeCardPos = getCardPos(active.id);
        let overCardPos = getCardPos(over.id);

        //updating column of active (draggable) card
        newCardData = overCardPos === -1
            ? swapCol(cardDataDummy, active.id, over.id)    //over.id => column id
            : swapCol(cardDataDummy, active.id, cardDataDummy[overCardPos].columnId);    //over.id => card id

        if (overCardPos === -1) overCardPos = getOverColumnLastIdx(over.id);

        console.log("activeCardPos ", activeCardPos);
        console.log("overCardPos ", overCardPos);

        setCardDataDummy(() => {
            return arrayMove(newCardData, activeCardPos, overCardPos);
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
                                <ColumnComponent column={column} cardData={cardDataDummy?.filter((card: Card) => card.columnId === column.id)} />
                            </div>
                        ))
                    }
                </div>
            </DndContext>
        </div>
    )
}

export default Board