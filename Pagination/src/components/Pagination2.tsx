import { memo, useEffect, useState } from 'react'
import { PaginationProps } from '../types'
import Controller from './ui/Controller';
import DefaultLoader from './ui/DefaultLoader';


//contanst;
const PAZE_SIZE = 5;
const DEFAULT_PAGE = 1;


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Pagination2 = <T extends Record<string, any>>({
  data = [],
  rendorFn,
  className = "",
  itemPerPage = PAZE_SIZE,
  loader,
  loaderType = "spinner",
  loading = false,
  gridClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3",
  totalItems,
  onPageChange,
  isServerSide = false,
}: PaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState<number>(itemPerPage);

  //start and end index based on page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  //data per page (for server side and client side)
  const dataPerPage = isServerSide ? data : data?.slice(startIndex, endIndex);

  //total pages (based on static data or api-data);
  // const totalNumberOfPages = Math.ceil(data?.length / pageSize);
  const totalNumberOfPages = Math.ceil(
    (isServerSide ? totalItems || 0 : data?.length) / pageSize
  );

  //making array of pages
  const totalPagesButtons = Array.from({length:totalNumberOfPages}, (_,i)=> i+1);


  //max buttons to display;
  const maxButtons = 5;
  let buttonStartIndex = currentPage - Math.floor(maxButtons/2);
  let buttonEndIndex = currentPage + Math.floor(maxButtons/2);

  if(buttonStartIndex < 1){
    buttonStartIndex = 1;
    buttonEndIndex = Math.min(totalNumberOfPages, maxButtons);
  };

  if(buttonEndIndex > totalNumberOfPages){
    buttonEndIndex = totalNumberOfPages;
    buttonStartIndex = Math.max(1, totalNumberOfPages - maxButtons + 1);
  }

  const buttonToDisplay = totalPagesButtons?.slice(
    buttonStartIndex-1,
    buttonEndIndex
  );


  //function for hanle page change
  const handlePageChange = (pageNumber: number) => {
    if(pageNumber < 1 || pageNumber > totalNumberOfPages) return;
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    onPageChange?.(currentPage, pageSize);
  }, [currentPage, pageSize]);
  return (
    <div className={`pagination-container ${className} overflow-hidden overflow-y-scroll no-scrollbar`}>
      {loading ? loader || (
         <DefaultLoader
          type={loaderType}
          ariaLabel='Loader'
          size={30}
          color='pink'
         />
      ) : (
        <div className={` pagination-content data-grid ${gridClass}`}>
          {dataPerPage?.map((item,index)=>{
            return (
              <div key={item.id || index} className="pagination-item">{rendorFn(item)}</div>
            );
          })}
        </div>
      )}
      <div className=' control-buttons-ui w-full h-auto flex items-center justify-center mt-5'>
        <Controller 
          handlePageChange={handlePageChange}
          totalPage={totalNumberOfPages}
          buttonToShow={buttonToDisplay}
          currentPage={currentPage}
          buttonStartIndex={buttonStartIndex}
          buttonEndIndex={buttonEndIndex}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  )
}
export default memo(Pagination2);




//? Usage example