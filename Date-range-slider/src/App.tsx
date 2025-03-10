import { useState } from "react"
import DatePicker from "./components/DatePicker"

const App = () => {
  const [currentDate,setCurrentDate] = useState<Date>(new Date());
  const [startDate,setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  }
  const handleRangeSelection = (start:Date | null,end:Date | null)=>{
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className=" w-full h-screen bg-zinc-200 flex items-center justify-center">
      <DatePicker
       todaysDate={currentDate}
       dualCalendar
       onChange={handleDateChange}
       startDate={startDate!}
       endDate={endDate!}
       onRangeSelected={handleRangeSelection}
       rangeColor="linear-gradient(to right, #32e916, #dda570)"
       themeColor="green" 
      />
    </div>
  )
}

export default App