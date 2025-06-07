import { useState } from "react";
import { DataProps } from "../App"


interface PaginationProps {
    data: DataProps[],
    itemPerPage?: number;
    className?: string;
    loading?: boolean;
    loader?: React.ReactNode;
    totalPage?: number; // from user 
    onPageChange?:(pageNumber:number)=> void;
    rendorRow:(data:DataProps)=>React.ReactNode;
}

//?Constants
const DEFAULT_PAGE = 1;
const PAGE_SIZE = 5;

const Pagination = ({
    data,
    rendorRow,
    itemPerPage=PAGE_SIZE,
    className="",
    onPageChange,
    loading = false,
    loader,
    totalPage, // take from user when data is from api;
}:PaginationProps) => {
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
    const [pageSize, setPageSize] = useState(itemPerPage);

    const startIndex =totalPage ? 0 : (currentPage - 1) * pageSize; //0 or not calcluate when totalPage is from user is available;
    const endIndex = startIndex + pageSize; //104

    const dataPerPage = data.slice(startIndex, endIndex); // return only first 10 data
    const totalPages =totalPage ?? Math.ceil(data.length / pageSize); // like totaldta/pagsize suppose itbcomes 7.5 so ciel does it 8
    //use nullish coelishing because when data is from api; user have to give totalpage value so that based on that it calculate pages;

    //best practice to show number of pages
    const totalNumberOfPages = Array.from({length:totalPages}, (_,i)=> i+1);

    //now our wor to get only 5 buttons in the view;
    const maxButtons = 5;
    let buttonStartIndex = currentPage - Math.floor(maxButtons/2);
    let buttonEndIndex = currentPage + Math.floor(maxButtons/2);
    //console.log(buttonStartIndex, buttonEndIndex) //-1,3 //5

    //if page less that 1
    if(buttonStartIndex < 1){
        buttonStartIndex = 1;
        buttonEndIndex = Math.min(totalPages, maxButtons); //1,5
    };

    //if page more than total pages
    if(buttonEndIndex > totalPages){
        buttonEndIndex = totalPages;
        buttonStartIndex = Math.max(1, totalPages - maxButtons + 1); //16,20
    };

    //finally getting array of button so that we loop over it
    const buttonsAtOneTime = totalNumberOfPages.slice(
        buttonStartIndex - 1,
        buttonEndIndex
    );


    //handeling Api data requests
    const handelPageChange = (pageNumber: number)=>{
        setCurrentPage(pageNumber);
        if(onPageChange){
            onPageChange(pageNumber);
        }
    }
  return (
    <div className={`pagination w-full h-full ${className}`}>
        <div className="pagination-content">
            {loading && <div>{loader}</div>}
          {!loading && (
            <div>
                {dataPerPage?.map(item => <div key={item.id}>{rendorRow(item)}</div>)}
            </div>
          )}
        </div>
        <div className="buttons flex gap-1 items-center border p-1 rounded w-fit">
            <button
             onClick={()=>handelPageChange(1)} //setCurrentPage ko replace kiya hai
             disabled={currentPage === 1}
            >
                First
            </button>

            <button 
                className=" px-5 py-1 bg-purple-600 text-white font-semibold text-md rounded-sm disabled:bg-purple-400 disabled:text-gray-300 disabled:cursor-not-allowed"
                disabled={currentPage === 1} 
                onClick={() => handelPageChange(currentPage - 1)}>
                Prev
            </button>

            {/* //dropdown to select items per page range */}
            <select onChange={(e)=>setPageSize(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
            </select>

            <div className=" total-pages">
                {/* Left ellipsis when there are pages before the current range */}
                {buttonStartIndex > 1 && (
                    <span className="px-2 py-1">...</span>
                )}
                {buttonsAtOneTime?.map(page =>(
                    <button 
                        key={page}
                        className={` px-5 py-1 ${currentPage === page? "bg-purple-600 text-white font-semibold text-md rounded-sm" : "text-gray-500 hover:bg-purple-400 hover:text-white"}`}
                        disabled={currentPage === page}
                        onClick={() => handelPageChange(page)}>
                        {page}
                    </button>
                ))}
                {/* Right ellipsis when there are pages after the current range */}
                {buttonEndIndex < totalPages && (
                    <span className="px-2 py-1">...</span>
                )}
            </div>
            <button  
                className=" px-5 py-1 bg-purple-600 text-white font-semibold text-md rounded-sm disabled:bg-purple-400 disabled:text-gray-300 disabled:cursor-not-allowed"
                disabled={currentPage === totalPages}  // if current page is last page then disable next button
                onClick={() => handelPageChange(currentPage + 1)}>
                Next
            </button>

            <button 
             onClick={()=>handelPageChange(totalPages)}
             disabled={currentPage === totalPages}
            >
                Last
            </button>
        </div>
    </div>
  )
}

export default Pagination;