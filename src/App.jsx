import { useQuery } from '@tanstack/react-query'
import { fetchCards, fetchColumns } from './api/axios'
import Header from './components/Header'
import Column from './components/Column';

function App() {
  const { data: columnData } = useQuery({
    queryKey: ['columns'],
    queryFn: fetchColumns
  })

  const { data: cardData } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards
  })

  console.log(columnData);


  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0B0A13]">
      <Header />
      <div className="w-full py-4 px-10 flex gap-4">
        {columnData?.map(column => (
          <div key={column.id} className='w-full'>
            <Column column={column} cardData={cardData} />
          </div>

        ))}
      </div>
    </div>
  )
}

export default App
