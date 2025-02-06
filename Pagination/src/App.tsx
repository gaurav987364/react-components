
import { useEffect, useState } from 'react';
import Pagination2 from "./components/Pagination2";


// const data = Array.from({length:100},(_,i)=>{
//   return {id: i+1, name:`User ${i+1}`, email:`user${i+1}@example.com`, phone:`1234567890${i+1}`};
// });

const App = () => {
  const [data2,setData] = useState([]);
  console.log(data2)
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const fetchData = async (page :number, size:number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=react&page=${page}&per_page=${size}`
      );
      const result = await response.json();
      setData(result.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch data when page or pageSize changes
  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (
    <div className=' w-full h-screen bg-black text-neutral-50 p-1 overflow-hidden overflow-y-scroll'>
      <Pagination2
       data={data2}
       className=" w-full flex gap-5 flex-wrap items-center"
       itemPerPage={pageSize}
       totalItems={100} //pages hai ye
       isServerSide
       loading={loading}
       loaderType='spinner'
       onPageChange={(page, size) => {
         setCurrentPage(page);
         setPageSize(size);
       }}
       gridClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
       rendorFn={(d)=>{
        return (
          <div className=" ui w-[300px] h-[150px] border flex items-center justify-center flex-col rounded bg-pink-500">
            {/* <span>{d.id}</span>  
            <span>{d.name}</span>
            <span>{d.email}</span>
            <span>{d.phone}</span> */}
            <span>{d.id}</span>
          </div>
        )
       }}
      />
    </div>
  )
}

export default App;
