import { useState } from "react"
import DatePicker from "./components/DatePicker"
import { format } from "./utils/helper";

const App = () => {
  const [currentDate,setCurrentDate] = useState<Date>(new Date());
  const [startDate,setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const {fullFormat} = format(currentDate);
  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  }
  const handleRangeSelection = (start:Date | null,end:Date | null)=>{
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className=" w-full h-screen bg-zinc-200 flex flex-col items-center justify-center">
      <DatePicker
       todaysDate={currentDate}
       dualCalendar
       onChange={handleDateChange}
       startDate={startDate!}
       endDate={endDate!}
       onRangeSelected={handleRangeSelection}
       rangeColor="linear-gradient(to right, #4d4a54, #a08494)"
       themeColor="purple" 
      />
      <div>
        {fullFormat}
        {startDate && endDate && `Selected: ${format(startDate).fullFormat} - ${format(endDate).fullFormat}`}
        {!startDate &&!endDate && "No date selected"}
      </div>
    </div>
  )
}

export default App