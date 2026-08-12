import { useState } from 'react';
import { DndContext, DragStartEvent, DragEndEvent, DragOverlay, UniqueIdentifier, PointerSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useCards, useColumns, useUpdateCardList } from '../../hooks/useBoardQueries';
import Header from '../ui/Header'
import ColumnComponent from './ColumnComponent';
import CardElem from './CardView';
import { Card, Column } from '../../types';

function Board() {
    const { data: columnData } = useColumns();
    // const { data: cardData } = useCards();
    const [cardData, setCardData] = useState<Card[] | null>(null);
    const { mutateAsync } = useUpdateCardList();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const [activeCard, setActiveCard] = useState<Card | null>(null);


    const getCardPos = (id: UniqueIdentifier): number => cardData?.findIndex((card: Card) => card.id === id) ?? -1;

    const getOverColumnLastIdx = (overId: UniqueIdentifier): number => {
        if (!cardData) return -1;
        return cardData.findLastIndex((card: Card) => card.columnId === overId) + 1;
    };

    function swapCol(cardData: Card[], activeCardId: UniqueIdentifier, overColId: UniqueIdentifier) {
        return cardData.map((card: Card) => {
            if (card.id === activeCardId) return { ...card, columnId: overColId.toString() };
            return card;
        })
    }

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        if (active) console.log(`Started dragging ${active.data.current?.order}`);
        if (active.data.current) setActiveCard(active.data.current as Card);
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!cardData || !over || active.id === over.id) return;
        console.log(`Dropped ${active.data.current?.order} over ${over.data.current?.order}`);

        let activeCardPos: number = getCardPos(active.id);
        let overCardPos: number = getCardPos(over.id);

        //updating column of active (draggable) card
        const newCardData = overCardPos === -1
            ? swapCol(cardData, active.id, over.id)    //over.id => column id
            : swapCol(cardData, active.id, cardData[overCardPos].columnId);    //over.id => card id

        if (overCardPos === -1) overCardPos = getOverColumnLastIdx(over.id);

        console.log("activeCardPos ", activeCardPos);
        console.log("overCardPos ", overCardPos);

        const updatedList = arrayMove(newCardData, activeCardPos, overCardPos).map(
            (card, index) => ({ ...card, order: index + 1 })
        );
        setCardData(updatedList);
        mutateAsync(updatedList);
        setActiveCard(null);
    }


    return (
        <div className="w-full min-h-screen flex flex-col bg-[#0B0A13]">
            <Header setCardData={setCardData} />

            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="w-full py-4 px-10 flex gap-4">
                    {cardData && columnData?.slice()
                        .sort((a: Column, b: Column) => a.order - b.order)
                        .map((column: Column) => (
                            <div key={column.id} className='w-1/4'>
                                <ColumnComponent column={column} cardData={cardData.filter((card: Card) => card.columnId === column.id)} />
                            </div>
                        ))
                    }
                </div>

                <DragOverlay dropAnimation={null}>
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