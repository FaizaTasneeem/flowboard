import { useState } from 'react';
import { useSearchParams } from "react-router-dom"
import { DndContext, DragStartEvent, DragEndEvent, DragOverlay, UniqueIdentifier, PointerSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useCards, useColumns, useUpdateCardList } from '../../hooks/useBoardQueries';
import Header from '../ui/Header'
import ColumnComponent from './ColumnComponent';
import CardElem from './CardView';
import { Card, Column } from '../../types';

function Board() {
    const { data: columnData } = useColumns();
    const { data: cardData } = useCards();
    const { mutateAsync } = useUpdateCardList();

    const [searchParams, setSearchParams] = useSearchParams();

    const queryTitle = searchParams.get('title') || "";
    const queryLabel = searchParams.get('label') || "";

    const [activeCard, setActiveCard] = useState<Card | null>(null);
    const [title, setTitle] = useState(queryTitle);
    const [prevTitle, setPrevTitle] = useState(queryTitle);
    const [label, setLabel] = useState(queryLabel);
    const [prevLabel, setPrevLabel] = useState(queryLabel);


    if (queryTitle !== prevTitle) { setPrevTitle(queryTitle); setTitle(queryTitle); };
    if (queryLabel !== prevLabel) { setPrevLabel(queryLabel); setLabel(queryLabel); };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const getCardPos = (id: UniqueIdentifier): number => cardData?.findIndex((card: Card) => card.id === id);

    const getOverColumnLastIdx = (overId: UniqueIdentifier): number => cardData?.findLastIndex((card: Card) => card.columnId === overId) + 1;

    function updateActiveCardCol(cardData: Card[], activeCardId: UniqueIdentifier, overColId: UniqueIdentifier) {
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

        if (!cardData || !over || active.id === over.id || queryTitle !== "" || queryLabel !== "") return;
        console.log(`Dropped ${active.data.current?.order} over ${over.data.current?.order}`);

        let activeCardPos: number = getCardPos(active.id);
        let overCardPos: number = getCardPos(over.id);

        //updating column of active (draggable) card
        const newCardData = overCardPos === -1
            ? updateActiveCardCol(cardData, active.id, over.id)    //over.id => column id
            : updateActiveCardCol(cardData, active.id, cardData[overCardPos].columnId);    //over.id => card id

        if (overCardPos === -1) overCardPos = getOverColumnLastIdx(over.id);

        console.log("activeCardPos ", activeCardPos);
        console.log("overCardPos ", overCardPos);

        const updatedList = arrayMove(newCardData, activeCardPos, overCardPos).map(
            (card, index) => ({ ...card, order: index + 1 })
        );
        mutateAsync({ prevList: cardData, updatedList });
        setActiveCard(null);
    }


    return (
        <div className="w-full min-h-screen flex flex-col bg-[#0B0A13]">
            <Header title={title} label={label} setSearchParams={setSearchParams} setTitle={setTitle} setLabel={setLabel} />

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
                                <ColumnComponent
                                    column={column}
                                    cardData={cardData?.filter((card: Card) =>
                                        card.columnId === column.id &&
                                        (!queryTitle || card.title.toLocaleLowerCase().includes(queryTitle.toLocaleLowerCase())) &&
                                        (!queryLabel || card.label.toLocaleLowerCase().includes(queryLabel.toLocaleLowerCase()))
                                    )}
                                />
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