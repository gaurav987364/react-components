import { PropsWithChildren } from "react";

export interface DatePickerProps {
    todaysDate?:Date;
    onChange?:(date:Date) => void;
    startDate?:Date;
    endDate?:Date;
    onRangeSelected?:(start:Date | null,end:Date | null) => void;
    dualCalendar?:boolean;
    className?:string;
    themeColor?:string;
    rangeColor?:string;
    minDate?:Date;
    maxDate?:Date;
    locale?:string;
    weekStartsOn?:number;
};

export interface CellProps extends PropsWithChildren {
    onClick?:() => void;
    className?: string;
    style?:Record;
};