import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import { DndContext, DragStartEvent, DragEndEvent, DragOverlay, UniqueIdentifier, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { fetchCards, fetchColumns } from '../api/axios'
import Header from './Header'
import ColumnComponent from './ColumnComponent';
import CardElem from './CardElem';
import { Card, Column } from '../types';

function Board() {
    const { data: columnData } = useQuery({
        queryKey: ['columns'],
        queryFn: fetchColumns
    })
    const { data: cardData } = useQuery({
        queryKey: ['cards'],
        queryFn: fetchCards
    })

    const sensors = useSensors(
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const [activeCard, setActiveCard] = useState<Card | null>(null);
    const [cardDataDummy, setCardDataDummy] = useState(cardData ?? []);
    useEffect(() => {
        if (cardData) {
            setCardDataDummy(cardData);
        }
    }, [cardData]);


    const getCardPos = (id: UniqueIdentifier) => cardDataDummy.findIndex((card: Card) => card.id === id);

    const getOverColumnLastIdx = (overId: UniqueIdentifier) => cardDataDummy.findLastIndex((card: Card) => card.columnId === overId) + 1;

    function swapCol(cardDataDummy: Card[], activeCardId: UniqueIdentifier, overColId: UniqueIdentifier) {
        return cardDataDummy.map((card: Card) => {
            if (card.id === activeCardId) return { ...card, columnId: overColId.toString() };
            return card;
        })
    }

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        if (active.id) console.log(`Started dragging ${active.id}`);
        if (active.data.current) setActiveCard(active.data.current as Card);
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
                sensors={sensors}
                onDragStart={handleDragStart}
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

                <DragOverlay>
                    {activeCard &&
                        <div className='p-2 bg-[#18182C] border border-[#2A2A45] rounded-lg text-[#E2E8F0] cursor-grab'>
                            <CardElem card={activeCard} />
                        </div>
                    }
                </DragOverlay>
            </DndContext>
        </div>
    )
}

export default Board