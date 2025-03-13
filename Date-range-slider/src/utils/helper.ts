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


//new
// utils/date-utils.ts

// Date comparison functions
export const isSameMonth = (date1: Date, date2: Date): boolean => {
return date1.getFullYear() === date2.getFullYear() && 
        date1.getMonth() === date2.getMonth();
};

export const isSameYear = (date1: Date, date2: Date): boolean => {
return date1.getFullYear() === date2.getFullYear();
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
return isSameYear(date1, date2) &&
        isSameMonth(date1, date2) &&
        date1.getDate() === date2.getDate();
};
  
  // Formatting function
export const format2 = (date: Date, locale: string = 'en-US') => {
return {
    monthName: date.toLocaleDateString(locale, { month: 'long' }),
    year: date.getFullYear(),
    shortYear: date.toLocaleDateString(locale, { year: '2-digit' }),
    weekday: date.toLocaleDateString(locale, { weekday: 'short' })
};
};
  
//   // Other utility functions you'll need
//   export const StartOfMonth = (date: Date): Date => {
//     return new Date(date.getFullYear(), date.getMonth(), 1);
//   };
  
//   export const EndOfMonth = (date: Date): Date => {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 0);
//   };
  
//   export const NextMonth = (date: Date): Date => {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 1);
//   };
  
//   export const PrevMonth = (date: Date): Date => {
//     return new Date(date.getFullYear(), date.getMonth() - 1, 1);
//   };
  
//   export const NextYear = (date: Date): Date => {
//     return new Date(date.getFullYear() + 1, date.getMonth(), 1);
//   };
  
//   export const PrevYear = (date: Date): Date => {
//     return new Date(date.getFullYear() - 1, date.getMonth(), 1);
//   };
  
//   export const getDaysInMonth = (year: number, month: number): number => {
//     return new Date(year, month + 1, 0).getDate();
//   };