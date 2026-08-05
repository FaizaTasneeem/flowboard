import { DndContext } from "@dnd-kit/core";
import Board from "./components/Board"

function App() {
  return (
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
      <Board />
    </DndContext>
  )
}

export default App
