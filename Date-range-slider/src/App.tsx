import { useState } from "react"
import DatePicker from "./components/DatePicker"
import { format } from "./utils/helper";

const App = () => {
  const [currentDate,setCurrentDate] = useState<Date>(new Date());
  const [startDate,setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const {fullFormat} = format(currentDate);
  return (
    <div className=" w-full h-screen bg-zinc-200 flex flex-col items-center justify-center">
      <DatePicker
        todaysDate={currentDate}
        dualCalendar
        startDate={startDate!}
        endDate={endDate!}
        onRangeSelected={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
        themeColor="red"
        rangeColor="red"
        locale="en-US"
        weekStartsOn={1}
        onChange={(date:Date)=>{
          setCurrentDate(date);
          setStartDate(null);
          setEndDate(null);
        }}
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