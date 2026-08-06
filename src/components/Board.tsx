import { useQuery } from '@tanstack/react-query'
import { DndContext } from "@dnd-kit/core";
import { fetchCards, fetchColumns } from '../api/axios'
import Header from './Header'
import ColumnComponent from './ColumnComponent';
import { Column } from '../types';

function Board() {
    const { data: columnData } = useQuery({
        queryKey: ['columns'],
        queryFn: fetchColumns
    })

    const { data: cardData } = useQuery({
        queryKey: ['cards'],
        queryFn: fetchCards
    })


    return (
        <div className="w-full min-h-screen flex flex-col bg-[#0B0A13]">
            <Header />

            <DndContext
                onDragStart={({ active }) => {
                    console.log(`Started dragging ${active.id}`);
                }}
                onDragEnd={({ active, over }) => {
                    if (over) {
                        console.log(`Dropped ${active.id} over ${over.id}`);
                    }
                }}
                onDragCancel={({ active }) => {
                    console.log(`Cancelled dragging ${active.id}`);
                }}
            >
                <div className="w-full py-4 px-10 flex gap-4">
                    {columnData?.slice()
                        .sort((a: Column, b: Column) => a.order - b.order)
                        .map((column: Column) => (
                            <div key={column.id} className='w-1/4'>
                                <ColumnComponent column={column} cardData={cardData} />
                            </div>

                        ))
                    }
                </div>
            </DndContext>
        </div>
    )
}

export default Board