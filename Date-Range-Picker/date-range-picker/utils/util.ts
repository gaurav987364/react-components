export const StartOfMonth = (date:Date)=>{
    if(!(date instanceof Date)){
        throw new TypeError("provide valid date.")
    };

    const year = date.getFullYear();
    const month = date.getMonth();

    // Start of the month is the first day of the given month and year. 1st January is always the 1st day of the month. 0th month is January. 0th year is considered as 0.
    const startDate = new Date(year,month,1);

    return startDate;
};

export const EndOfMonth = (date:Date)=>{
    if(!(date instanceof Date)){
        throw new TypeError("provide valid date.")
    };

    const year = date.getFullYear();
    const month = date.getMonth();

    // End of the month is the last day of the given month and year. 31st December is always the 31st day of the month. 11th month is December. 0th year is considered as 0.
    const endDate = new Date(year,month+1,0); //?setting the day as 0 return the last day of the month; always

    return endDate;
};

export const format = (date:Date)=>{
   // Ensure the provided date is a Date object 
    if (!(date instanceof Date)) { 
       throw new TypeError('The argument must be a Date object'); 
    } 
    
     const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]; 
     // Get the month (0-11)
       const month = date.getMonth(); 
      // Get the full year 
      const year = date.getFullYear(); 
      // Get the day of the month (1-31)
      const day = date.getDate();  
     // Get the full month name 
      const monthName = monthNames[month];
      const fullDate = `${day} ${monthName} ${year} `

      return {monthFormat:`${monthName} ${year}`, fullFormat:fullDate}
}

export function getDaysInMonth(year:number | undefined, month:number | undefined) { 
    return new Date(year!, month! + 1, 0).getDate(); 
};
export const prevMonth = (date:Date) => { 
    if (!(date instanceof Date)) { 
        throw new TypeError("Provide a valid date."); 
    } const year = date.getFullYear(); 
    const month = date.getMonth() - 1; 
    const daysInPrevMonth = getDaysInMonth(year, month); 
    const day = Math.min(date.getDate(), daysInPrevMonth); 
    return new Date(year, month, day); 
}; 
export const nextMonth = (date:Date) => { 
    if (!(date instanceof Date)) { 
        throw new TypeError("Provide a valid date.");
    } 
    const year = date.getFullYear(); 
    const month = date.getMonth() + 1; 
    const daysInNextMonth = getDaysInMonth(year, month); 
    const day = Math.min(date.getDate(), daysInNextMonth); 
    return new Date(year, month, day); 
};

export const prevYear = (date:Date)=>{
    if(!(date instanceof Date)){
        throw new TypeError("provide valid date.")
    };
    const prevYear = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
    return prevYear;
};

export const nextYear = (date:Date)=>{
    if(!(date instanceof Date)){
        throw new TypeError("provide valid date.")
    };
    const nextYear = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
    return nextYear;
};
