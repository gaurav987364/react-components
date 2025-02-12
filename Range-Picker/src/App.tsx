import { useState } from 'react'

import Range from "./components/Range";
// import RangeSlider from './components/RangeSlider'
const min = 0;
const max = 400;
const App = () => {
  const [range,setRange] = useState([120,300]);
  return (
    <div className=' w-full h-screen bg-slate-700 text-neutral-50 flex items-center justify-center '>
      {/* <RangeSlider 
        min={min} 
        max={max} 
        step={1} 
        onChange={setRange}
        value={range} 
      /> */}
      <Range
        min={min}
        max={max}
        step={5}
        value={range}
        onChange={setRange}  // replace with your function here
      />
    </div>
  )
}

export default App