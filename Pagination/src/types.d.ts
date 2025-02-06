

// export interface DataProps {
//     id: number;
//     name: string;
//     email: string;
//     phone: string;
// };

import React from "react";
import { LoaderType } from "./components/ui/DefaultLoader";


export interface PaginationProps<T> {
    data?: T[],
    itemPerPage?: number;
    className?: string;
    loading?: boolean;
    loader?: React.ReactNode;
    loaderType?: LoaderType;
    totalPage?: number; // from user 
    onPageChange?:(pageNumber:number,pageSize:number) => void;
    rendorFn:(data:T)=>React.ReactNode;
    gridClass?: string;
    //props for server-side pagination
    totalItems?: number;
    isServerSide?: boolean;
    onPageChange?:(page : number, pageSize : number) => void;
};


export interface ControllerProps {
    handlePageChange?:(pageNumber:number) => void;
    totalPage?:number;
    buttonToShow?:number[];
    currentPage?:number;
    buttonStartIndex?:number;
    buttonEndIndex?:number;
    setPageSize?:(page:number)=> void;
    pageSize?: number;
}



// types.ts
// export interface PaginationProps<T> {
//     data?: T[];
//     itemsPerPage?: number;
//     className?: string;
//     loading?: boolean;
//     loader?: React.ReactNode;
//     totalItems?: number;
//     isServerSide?: boolean;
//     onPageChange?: (page: number, pageSize: number) => void;
//     children: (data: T) => React.ReactNode;
//     controlClass?: string;
//     gridClass?: string;
//     renderControls?: (props: ControlRenderProps) => React.ReactNode;
//   }
  
//   export interface ControlRenderProps {
//     currentPage: number;
//     totalPages: number;
//     handlePageChange: (page: number) => void;
//     pageSize: number;
//     setPageSize: (size: number) => void;
//   }