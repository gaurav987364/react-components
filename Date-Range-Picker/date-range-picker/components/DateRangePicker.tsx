"use client"
import React, { useEffect, useState } from 'react'
import { CgCalendarDates } from 'react-icons/cg'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from 'react-date-range';


const DateRangePicker = () => {
    const [isShowDateRange,setisShowDateRange] = useState<boolean>(false);
    const [isMobile,setisMobile] = useState<boolean>(false);
    const [state, setState] = useState([
        {
            startDate: new Date("2023-12-29"),
            endDate: new Date("2024-01-02"),
            key: 'selection'
        }
    ]);

    useEffect(()=>{
        const handelResize = ()=>{
            setisMobile(window.innerWidth <= 728)
        };

        handelResize();
        window.addEventListener('resize', handelResize);
        return ()=>{
            window.removeEventListener('resize', handelResize);
        };
    },[])
  return (
    <div className=' flex items-center h-full mt-10'>
        <div className=' relative'>
           <div>
            <h3 className=' text-center'>
                Selected Dates from : <strong>{state[0].startDate.toDateString()}</strong> - to: <strong>{state[0].endDate.toDateString()}</strong> 
            </h3>
           </div>
           <div>
                <div className=' flex w-full items-center justify-center'>
                    <button onClick={()=> setisShowDateRange(!isShowDateRange)} className=' flex items-center gap-x-1 rounded-lg border px-4 py-2 bg-[salmon] text-neutral-50 text-sm'>
                                <CgCalendarDates className=' text-lg'/>
                                <span className=' font-semibold'>Select Date</span>
                    </button>
                </div>
                {isShowDateRange && (
                    <div className=' absolute flex items-center justify-center lg:-right-24 max-sm:right-2 mt-1'>
                        <DateRange
                        editableDateInputs={true}
                        onChange={item => setState([{//+
                            startDate: item.selection.startDate || new Date(),
                            endDate: item.selection.endDate || new Date(),
                            key: 'selection'
                        }])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                        showPreview={true}
                        rangeColors={["salmon"]}
                        showDateDisplay={false}
                        months={isMobile ? 1 : 2}
                        direction={isMobile ? "vertical" : "horizontal"}
                        className=' rounded-lg shadow-md'
                        />
                    </div>
                )}
           </div>
        </div>
    </div>
  )
}

export default DateRangePicker;