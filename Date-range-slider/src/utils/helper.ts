export const StartOfMonth = (date:Date)=>{
    if(!(date instanceof Date)){
        throw new TypeError("provide valid date.")
    }
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    return firstDayOfMonth;
};

export const EndOfMonth = (date:Date)=>{
    if(!(date instanceof Date)){
        throw new TypeError("provide valid date.")
    }
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDayOfMonth = new Date(year, month + 1, 0);
    return lastDayOfMonth;
};

export const getDaysInMonth = (year:number | undefined, month:number | undefined)=>{
    return new Date(year!, month! + 1, 0).getDate(); 
    //month+1 because in js month are 0-11
    //getDate() give todays days in month
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
};

export const PrevMonth = (date:Date)=>{
    if(!(date instanceof Date)){
        throw new TypeError("provide valid date.")
    }
    const year = date.getFullYear(); //2025
    const month = date.getMonth() - 1; //if march then it give 01 due to js
    const daysInPrevMonth = getDaysInMonth(year,month); //28
    const day = Math.min(date.getDate(), daysInPrevMonth); //10,28 so min
    return new Date(year, month, day); //whole date
};

export const NextMonth = (date:Date) => { 
    if (!(date instanceof Date)) { 
        throw new TypeError("Provide a valid date.");
    } 
    const year = date.getFullYear(); 
    const month = date.getMonth() + 1; 
    const daysInNextMonth = getDaysInMonth(year, month); 
    const day = Math.min(date.getDate(), daysInNextMonth); 
    return new Date(year, month, day); 
};

export const PrevYear = (date:Date)=>{
    if(!(date instanceof Date)){
        throw new TypeError("provide valid date.")
    };
    const prevYear = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
    return prevYear;
};

export const NextYear = (date:Date)=>{
    if(!(date instanceof Date)){
        throw new TypeError("provide valid date.")
    };
    const nextYear = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
    return nextYear;
};