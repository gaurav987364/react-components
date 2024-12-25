import Game from './components/Game';

export const data = ["😡","🌚","👽","💀","👻","🦐","🪼","🐦‍⬛",];
const App = () => {
  return (
    <div className=' w-full h-screen flex items-center justify-center bg-slate-950'>
     <Game />
    </div>
  )
}

export default App