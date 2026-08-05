import { useQuery } from '@tanstack/react-query'
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
        </div>
    )
}

export default Board