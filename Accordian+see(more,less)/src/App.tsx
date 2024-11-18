// import Accordian from "./components/Accordian"

import AgeCalculater from "./components/AgeCalculater"
import StopWatch from "./components/StopWatch"

const App = () => {
  return (
    <div className=" w-full h-screen flex items-center justify-center p-2">
      {/* <Accordian/> */}
      <StopWatch/>
      <AgeCalculater/>
    </div>
  )
}

export default App