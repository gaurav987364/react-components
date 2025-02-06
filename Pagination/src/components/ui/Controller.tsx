import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { ControllerProps } from "../../types";
import { HiDotsHorizontal } from "react-icons/hi";

const Controller :React.FC<ControllerProps> = ({
    handlePageChange,
    totalPage,
    buttonToShow,
    currentPage,
    buttonEndIndex,
    buttonStartIndex,
    setPageSize,
    pageSize
}) => {

    const handlePageClick = (pageNumber:number) => {
        if (handlePageChange) {
            handlePageChange(pageNumber);
        }
    }
  return (
    <div className=" border w-[50vw] max-lg:w-[50vw] max-md:w-[76vw] max-sm:w-[90vw] h-[8vh] rounded flex items-center justify-between">
        <div className=" flex items-center">
            <button 
            role="button"
            onClick={()=>handlePageClick(1)} 
            disabled={currentPage === 1}
            className=" cursor-pointer hover:text-gray-400 disabled:cursor-not-allowed">
                <MdKeyboardDoubleArrowLeft size={25}/>
            </button>

            <button 
                onClick={()=>handlePageClick(currentPage! - 1)} 
                disabled={currentPage === 1}
                role="button" 
                className=" flex items-center mb-0.5 cursor-pointer hover:text-gray-400 disabled:cursor-not-allowed"
            >
                <MdKeyboardArrowLeft size={20} className=" mt-0.5"/> 
                <strong className=" text-sm">Prev.</strong>
            </button>
        </div>

        <select 
            value={pageSize} 
            onChange={(e)=>setPageSize && setPageSize(Number(e.target.value))} 
            className=" bg-slate-700/80 rounded text-white"
        >
          {[5, 10, 20, 50].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        <div className=" button-to-show flex items-center">
            {/* //left-side-ellipsis */}
            {buttonStartIndex! > 1 && (
                <span><HiDotsHorizontal /></span>
            )}

            {buttonToShow?.map(page => (
                <button 
                 key={page}
                 disabled={currentPage === page}
                 onClick={()=>handlePageClick(page)}
                 className={` px-3.5 py-1 rounded-lg max-sm:px-2.5 max-sm:py-0.5 disabled:cursor-not-allowed cursor-pointer ${currentPage === page ? " bg-slate-700/80 text-white font-semibold" : ""}`}
                >
                    {page}
                </button>
            ))}

            {/* //right-side-ellipsis */}
            {buttonEndIndex! < totalPage! && (
                <span><HiDotsHorizontal /></span>
            )}
        </div>
        <div className=" flex items-center">
                <button 
                    onClick={()=>handlePageClick(currentPage! + 1)} 
                    disabled={currentPage === totalPage}
                    role="button" 
                    className=" flex items-center mb-0.5 cursor-pointer hover:text-gray-400 disabled:cursor-not-allowed"
                >
                    <strong className=" text-sm">Next</strong>
                    <MdKeyboardArrowRight size={20} className=" mt-0.5"/> 
                </button>

                <button 
                role="button" 
                onClick={()=>handlePageClick(totalPage!)} 
                disabled={currentPage === totalPage}
                className=" cursor-pointer hover:text-gray-400 disabled:cursor-not-allowed">
                    <MdKeyboardDoubleArrowRight size={25}/>
                </button>
        </div>
    </div>
  )
}

export default Controller;



//import React from 'react';
// import { ControlRenderProps } from '../types';

// const Controller: React.FC<{
//   currentPage: number;
//   totalPages: number;
//   pageSize: number;
//   onPageChange: (page: number) => void;
//   onPageSizeChange: (size: number) => void;
//   className?: string;
// }> = ({
//   currentPage,
//   totalPages,
//   pageSize,
//   onPageChange,
//   onPageSizeChange,
//   className = ''
// }) => {
//   const getVisiblePages = () => {
//     // Improved page windowing logic
//     const visiblePages = [];
//     let start = Math.max(1, currentPage - 2);
//     let end = Math.min(totalPages, currentPage + 2);
    
//     if (currentPage <= 3) end = Math.min(5, totalPages);
//     if (currentPage >= totalPages - 2) start = Math.max(totalPages - 4, 1);
    
//     for (let i = start; i <= end; i++) {
//       visiblePages.push(i);
//     }
//     return visiblePages;
//   };

//   return (
//     <div className={`pagination-controls flex flex-col md:flex-row items-center justify-between gap-4 p-4 ${className}`}>
//       <div className="flex items-center gap-2">
//         <select 
//           value={pageSize}
//           onChange={(e) => onPageSizeChange(Number(e.target.value))}
//           className="select select-bordered select-sm"
//         >
//           {[5, 10, 20, 50].map(size => (
//             <option key={size} value={size}>{size} per page</option>
//           ))}
//         </select>
//       </div>
      
//       <div className="flex items-center gap-2">
//         <button
//           onClick={() => onPageChange(1)}
//           disabled={currentPage === 1}
//           className="btn btn-sm"
//         >
//           First
//         </button>
        
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="btn btn-sm"
//         >
//           Previous
//         </button>

//         {getVisiblePages().map(page => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`btn btn-sm ${currentPage === page ? 'btn-active' : ''}`}
//           >
//             {page}
//           </button>
//         ))}

//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="btn btn-sm"
//         >
//           Next
//         </button>
        
//         <button
//           onClick={() => onPageChange(totalPages)}
//           disabled={currentPage === totalPages}
//           className="btn btn-sm"
//         >
//           Last
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Controller;