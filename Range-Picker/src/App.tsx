import { useState } from 'react'
import RangeSlider from './components/RangeSlider'

const App = () => {
  const [range,setRange] = useState([18,50]);
  return (
    <div>
      <RangeSlider
        min={18}
        max={50}
        value={range}
        onChange={setRange}
        step={1}
        showTooltip={true}
      />
    </div>
  )
}

export default App