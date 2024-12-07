import Board from './components/Board'
import KanbanBoard from './components/KanbanBoard'
import Practise from './components/Practise'
// import DragBoard from './components/DragBoard'

const App = () => {
  return (
    <div className=' w-full h-screen text-neutral-50 p-5 bg-slate-950'>
      {/* <Board/> */}
      {/* <DragBoard/> */}
      {/* <KanbanBoard/> */}
      <Practise/>
    </div>
  )
}

export default App