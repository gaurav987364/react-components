import React, { memo, useEffect, useState } from 'react'
import { CellProps, DatePickerProps } from '../utils/types';
import clsx from 'clsx';
import { format2, getDaysInMonth, isSameMonth, NextMonth, NextYear, PrevMonth, PrevYear, StartOfMonth } from '../utils/helper';

// const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const DatePicker :React.FC<DatePickerProps> = ({
//     className = "",
//     dualCalendar = false,
//     endDate,
//     startDate,
//     todaysDate,
//     rangeColor = "",
//     onChange,
//     onRangeSelected,
//     themeColor = "",
// }) => {
//   const [selectedDate, setSelectedDate] = useState<Date>(todaysDate || new Date());
//   const [nextMonthDate, setNextMonthDate] = useState<Date>(NextMonth(selectedDate)); // Right-side calendar

//   // console.log(selectedDate,nextMonthDate);

//   //making header buttons working
//   const nextMonth = ()=>{
//     setSelectedDate(NextMonth(selectedDate));
//     if(dualCalendar) setNextMonthDate(NextMonth(nextMonthDate));
//   };
//   const prevMonth = ()=>{
//     setSelectedDate(PrevMonth(selectedDate));
//     if(dualCalendar) setNextMonthDate(PrevMonth(nextMonthDate));
//   };
//   const nextYear = ()=>{
//     setSelectedDate(NextYear(selectedDate));
//     if(dualCalendar) setNextMonthDate(NextYear(nextMonthDate));
//   };
//   const prevYear = ()=>{
//     setSelectedDate(PrevYear(selectedDate));
//     if(dualCalendar) setNextMonthDate(PrevYear(nextMonthDate));
//   };

//   const setDate = (date:Date)=>{
//     // const selectedDate = new Date(todaysDate!.getFullYear(), todaysDate!.getMonth(),index);
//     if(onRangeSelected){
//       if (!startDate || (startDate && endDate)) {
//         onRangeSelected?.(date, null);// Set startDate if no range is selected
//       } else if (date >= startDate) {
//         onRangeSelected?.(startDate, date);// Set endDate if selecting a later date
//       } else {
//         onRangeSelected?.(date, null); // Reset startDate if selecting an earlier date
//       }
//     } else {
//       onChange?.(date);
//     }
//   }

//   //recursion of function
//   const renderCalender = (calenderDate:Date)=>{
//     const MonthStartDate = StartOfMonth(calenderDate!);
//     const MonthEndDate = EndOfMonth(calenderDate!);
//     const totalDays = getDaysInMonth(calenderDate?.getFullYear(), calenderDate?.getMonth());
//     const prefixDays = MonthStartDate.getDay();
//     const suffixDays = 6 - MonthEndDate.getDay();
//     const {monthFormat} = format(calenderDate!);

//     return (
//       <div className={`w-full sm:w-[300px] max-h-[350px] border  ${className}`}>
//       <div className=' grid grid-cols-7 items-center justify-center text-center'>
//         {/* {Making Header} */}
//         <Cell onClick={prevYear} className=' text-lg border-b'>&lt;&lt;</Cell>
//         <Cell onClick={prevMonth} className=' text-lg border-b'>&lt;</Cell>
//         <Cell className=' col-span-3 border-b border-black' style={{color:`${themeColor}`}}>{monthFormat}</Cell>
//         <Cell onClick={nextMonth} className=' text-lg border-b'>&gt;</Cell>
//         <Cell onClick={nextYear} className=' text-lg border-b'>&gt;&gt;</Cell>

//         {/* Printing Sunday, Monday, Tuesday, etc. */}
//         {weekDays.map((day)=> <Cell key={day} className=' border-b text-sm'>{day}</Cell>)}

//         {/* Printing Days Before the Start of the Month */}
//         {Array.from({length: prefixDays}).map((_,i)=> <Cell key={i}></Cell>)}

//         {/* Printing Days */}
//         {Array.from({length: totalDays}).map((_,i)=> {
//           const days = i+1;

          
//           const currentDate = new Date(calenderDate!.getFullYear(),calenderDate!.getMonth(),days);
          
//           const isToday = calenderDate.getDate() === days;

//           const isStart = startDate && currentDate.getTime() === startDate.getTime();

//           const isEnd = endDate && currentDate.getTime() === endDate.getTime();

//           const isInRange = startDate && endDate && currentDate > startDate && currentDate < endDate;

//           return (
//             <Cell 
//             key={i+1} 
//             className={clsx(
//               "relative text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer mt-0.5 hover:border border-blue-500",
//               isToday ? " border-b-[3px] border-blue-500" : "",

//               isInRange ? " bg-blue-500 text-white font-thin" : "",

//               isStart ? "rounded-tl-full rounded-bl-full bg-blue-500 text-white font-thin" : "",
              
//               isEnd ? "rounded-tr-full rounded-br-full bg-blue-500 text-white font-thin" : "",
//             )}
//             style={{
//               background: isInRange 
//                 ? rangeColor || ""
//                 : isStart || isEnd 
//                 ? themeColor || ""
//                 : undefined,
//               color: isStart || isEnd ? "#fff9f9" : undefined, 
//             }}
//             onClick={()=>setDate(currentDate)}
//             >
//               <span>{days}</span>
//             </Cell>
//           )
//         })}

//         {/* Printing Days After the End of the Month */}
//         {Array.from({length: suffixDays}).map((_,i)=> <Cell key={i}></Cell>)}
//       </div>
//     </div>
//     )
//   }
//   return (
//     <div className=' flex gap-0'>
//       {renderCalender(selectedDate)}
//       {dualCalendar && renderCalender(nextMonthDate)}
//     </div>
//   )
// };


const DatePicker: React.FC<DatePickerProps> = ({
  className = "",
  dualCalendar = false,
  endDate,
  startDate,
  todaysDate = new Date(),
  rangeColor = "#3b82f6",
  themeColor = "#3b82f6",
  onChange,
  onRangeSelected,
  minDate,
  maxDate,
  locale = "en-US",
  weekStartsOn = 0,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(todaysDate);
  const nextMonthDate = NextMonth(selectedDate);
  
  // Sync with external startDate changes
  useEffect(() => {
    if (startDate && !isSameMonth(selectedDate, startDate)) {
      setSelectedDate(startDate);
    }
  }, [startDate]);

  // Navigation handlers
  const navigate = (fn: (date: Date) => Date) => {
    setSelectedDate(prev => {
      const newDate = fn(prev);
      if (minDate && newDate < minDate) return prev;
      if (maxDate && NextMonth(newDate) > maxDate) return prev;
      return newDate;
    });
  };

  const handleDateSelection = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (onRangeSelected) {
      if (!startDate || (startDate && endDate)) {
        onRangeSelected(date, null);
      } else {
        const [newStart, newEnd] = date > startDate 
          ? [startDate, date] 
          : [date, startDate];
        onRangeSelected(newStart, newEnd);
      }
    } else {
      onChange?.(date);
    }
  };

  const isDateDisabled = (date: Date) => {
    return (minDate && date < minDate) || (maxDate && date > maxDate);
  };

  const renderCalendar = (date: Date, isSecondCalendar = false) => {
    const monthStart = StartOfMonth(date);
    const totalDays = getDaysInMonth(date.getFullYear(), date.getMonth());
    const prefixDays = (monthStart.getDay() - weekStartsOn + 7) % 7;
    const { monthName, year } = format2(date, locale);

    return (
      <div
        className={clsx(
          "w-full sm:w-[300px] max-h-[350px] border bg-white",
          dualCalendar && !isSecondCalendar && "border-r-0",
          dualCalendar && isSecondCalendar && "border-l-0",
          className
        )}
      >
        <div className="grid grid-cols-7 items-center justify-center text-center">
          {/* Header */}
          {!isSecondCalendar && (
            <>
              <Cell
                onClick={() => navigate(PrevYear)}
                aria-label="Previous year"
                className="text-lg border-b p-2 hover:bg-gray-200"
              >
                &lt;&lt;
              </Cell>
              <Cell
                onClick={() => navigate(PrevMonth)}
                aria-label="Previous month"
                className="text-lg border-b p-2 hover:bg-gray-200"
              >
                &lt;
              </Cell>
            </>
          )}

          <Cell
            className={clsx(
              "border-b border-black p-[10px] font-semibold",
              dualCalendar ? "col-span-5" : "col-span-3"
            )}
            style={{ color: themeColor }}
          >
            {monthName} {year}
          </Cell>

          {isSecondCalendar && (
            <>
              <Cell
                onClick={() => navigate(NextMonth)}
                aria-label="Next month"
                className="text-lg border-b p-2 hover:bg-gray-200"
              >
                &gt;
              </Cell>
              <Cell
                onClick={() => navigate(NextYear)}
                aria-label="Next year"
                className="text-lg border-b p-2 hover:bg-gray-200"
              >
                &gt;&gt;
              </Cell>
            </>
          )}

          {/* Week days */}
          {Array.from({ length: 7 }).map((_, i) => {
            const weekDay = new Date(0, 0, weekStartsOn + i).toLocaleDateString(locale, {
              weekday: "short"
            });
            return (
              <Cell
                key={weekDay}
                className="border-b text-xs font-medium uppercase text-gray-500 py-2"
              >
                {weekDay}
              </Cell>
            );
          })}

          {/* Calendar grid */}
          {Array.from({ length: prefixDays }).map((_, i) => (
            <Cell key={`prefix-${i}`} />
          ))}

          {Array.from({ length: totalDays }).map((_, i) => {
            const day = i + 1;
            const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
            const isToday = currentDate.toDateString() === new Date().toDateString();
            const sd =  startDate?.toDateString() === currentDate.toDateString();
            const ed = endDate?.toDateString() === currentDate.toDateString();
            const isInRange = startDate && endDate && currentDate > startDate && currentDate < endDate;
            const isDisabled = isDateDisabled(currentDate);

            return (
              <Cell
                key={`day-${day}`}
                onClick={() => !isDisabled && handleDateSelection(currentDate)}
                className={clsx(
                  "h-10 text-sm transition-colors relative",
                  !isDisabled && "cursor-pointer hover:bg-blue-50",
                  isDisabled && "text-gray-300 cursor-not-allowed",
                  isToday && ` font-bold border-b-2`,
                )}
                aria-disabled={isDisabled}
                aria-current={isToday ? "date" : undefined}
              >
                <div
                  className={clsx(
                    "w-full h-7 flex items-center justify-center",
                    startDate?.toDateString() === currentDate.toDateString() &&
                      `rounded-tl-full rounded-bl-full bg-green-500 font-thin text-white`,
                    endDate?.toDateString() === currentDate.toDateString() &&
                      "rounded-tr-full rounded-br-full bg-green-500 font-thin text-white",
                    isInRange && "bg-green-500 font-thin text-white"
                  )}
                  style={{
                    background: isInRange ? rangeColor : (sd || ed ? themeColor : ''),
                  }}
                >
                  {day}
                </div>
              </Cell>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={clsx("flex gap-0.5", dualCalendar && "shadow-lg")}>
      {renderCalendar(selectedDate)}
      {dualCalendar && renderCalendar(nextMonthDate, true)}
    </div>
  );
};

const Cell = memo<CellProps>(({ className, onClick, children, ...props }) => (
  <div
    className={clsx(
      "flex items-center justify-center",
      onClick && "hover:bg-gray-200 cursor-pointer",
      className
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
));

export default memo(DatePicker);



// //** Cell Component */
// export const Cell : React.FC<CellProps> = ({
//   className = "",
//   onClick,
//   children,
//   ...props
// })=>{
//   return (
//     <div 
//       onClick={onClick} 
//       className={clsx(" h-10 flex font-semibold items-center justify-center ",{" text-lg cursor-pointer ":onClick}, className)}
//       {...props}
//     > 
//       {children}
//     </div>
//   )
// };

// export default memo(DatePicker);


//? changes in below code for dual-feature

// import React, { memo } from 'react'
// import { CellProps, DatePickerProps } from '../utils/types';
// import clsx from 'clsx';
// import { EndOfMonth, format, getDaysInMonth, NextMonth, NextYear, PrevMonth, PrevYear, StartOfMonth } from '../utils/helper';

// const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const DatePicker :React.FC<DatePickerProps> = ({
//     className = "",
//     dualCalendar = false,
//     endDate,
//     startDate,
//     todaysDate,
//     rangeColor = "",
//     onChange,
//     onRangeSelected,
//     themeColor = "",
// }) => {
//   const MonthStartDate = StartOfMonth(todaysDate!);
//   const MonthEndDate = EndOfMonth(todaysDate!);
//   const totalDays = getDaysInMonth(todaysDate?.getFullYear(), todaysDate?.getMonth());
//   const prefixDays = MonthStartDate.getDay();
//   const suffixDays = 6 - MonthEndDate.getDay();
//   const {monthFormat} = format(todaysDate!);

//   //making header buttons working
//   const nextMonth = ()=>{
//     onChange?.(NextMonth(todaysDate!));
//   };
//   const prevMonth = ()=>{
//     onChange?.(PrevMonth(todaysDate!));
//   };
//   const nextYear = ()=>{
//     onChange?.(NextYear(todaysDate!));
//   };
//   const prevYear = ()=>{
//     onChange?.(PrevYear(todaysDate!));
//   };

//   const setDate = (index:number)=>{
//     const selectedDate = new Date(todaysDate!.getFullYear(), todaysDate!.getMonth(),index);
//     if (onRangeSelected) {
//       if (!startDate || (startDate && endDate)) {
//         onRangeSelected(selectedDate, null);
//       } else if (startDate && !endDate && selectedDate >= startDate) {
//         onRangeSelected(startDate, selectedDate);
//       } else {
//         onRangeSelected(selectedDate, null);
//       }
//     } else {
//       onChange?.(selectedDate);
//     }
//   }
//   return (
//     <div className={`w-[350px] max-h-[400px] border p-1 rounded ${className}`}>
//       <div className=' grid grid-cols-7 items-center justify-center text-center'>
//         {/* {Making Header} */}
//         <Cell onClick={prevYear} className=' text-lg border-b'>&lt;&lt;</Cell>
//         <Cell onClick={prevMonth} className=' text-lg border-b'>&lt;</Cell>
//         <Cell className=' col-span-3 border-b border-black' style={{color:`${themeColor}`}}>{monthFormat}</Cell>
//         <Cell onClick={nextMonth} className=' text-lg border-b'>&gt;</Cell>
//         <Cell onClick={nextYear} className=' text-lg border-b'>&gt;&gt;</Cell>

//         {/* Printing Sunday, Monday, Tuesday, etc. */}
//         {weekDays.map((day)=> <Cell key={day} className=' border-b text-sm'>{day}</Cell>)}

//         {/* Printing Days Before the Start of the Month */}
//         {Array.from({length: prefixDays}).map((_,i)=> <Cell key={i}></Cell>)}

//         {/* Printing Days */}
//         {Array.from({length: totalDays}).map((_,i)=> {
//           const days = i+1;

//           const isToday = todaysDate!.getDate() === days;

//           const currentDate = new Date(todaysDate!.getFullYear(),todaysDate!.getMonth(),days);

//           const isStart = startDate && currentDate.getTime() === startDate.getTime();

//           const isEnd = endDate && currentDate.getTime() === endDate.getTime();

//           const isInRange = startDate && endDate && currentDate > startDate && currentDate < endDate;

//           return (
//             <Cell 
//             key={i+1} 
//             className={clsx(
//               "relative text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer mt-0.5",
//               {
//                 "bg-gray-900 text-white font-bold rounded-full": isToday, // Today’s Date
//                 "hover:bg-gray-100 hover:text-black": !isInRange && !isStart && !isEnd, // Default Hover
//               }
//             )}
//             style={{
//               background: isInRange 
//                 ? rangeColor || "linear-gradient(to right, #fca5a5, #fecaca)"
//                 : isStart || isEnd 
//                 ? themeColor || "#f87171"
//                 : undefined,
//               color: isStart || isEnd ? "#fff" : undefined, 
//               borderRadius: isStart ? "20px 0 0 20px" : isEnd ? "0 20px 20px 0" : undefined,
//               padding: isStart || isEnd ? "0 2px" : undefined, 
//             }}
//             onClick={()=>setDate(days)}
//             >
//               {days}
//             </Cell>
//           )
//         })}

//         {/* Printing Days After the End of the Month */}
//         {Array.from({length: suffixDays}).map((_,i)=> <Cell key={i}></Cell>)}
//       </div>
//     </div>
//   )
// };




// //** Cell Component */
// export const Cell : React.FC<CellProps> = ({
//   className = "",
//   onClick,
//   children,
//   ...props
// })=>{
//   return (
//     <div 
//       onClick={onClick} 
//       className={clsx(" h-10 flex font-semibold items-center justify-center",{" text-lg hover:text-gray-200 hover:bg-zinc-800/80 cursor-pointer":onClick}, className)}
//       {...props}
//     > 
//       {children}
//     </div>
//   )
// };

// export default memo(DatePicker);