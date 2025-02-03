
import { useEffect, useState } from 'react';
import Pagination from './components/Pagination';

export interface DataProps {
  id: number;
  name: string;
  email: string;
  phone: string;
};


const data = Array.from({length:100},(_,i)=>{
  return {id: i+1, name:`User ${i+1}`, email:`user${i+1}@example.com`, phone:`1234567890${i+1}`};
});

const App = () => {
  // const [data,setData] = useState<DataProps[]>([]);
  // const [isLoading,setIsLoading] = useState(false);
  // const handelPageChange = async ()=>{ // we get page numbr here bsed on that we fecth data fro api;
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch('https://jsonplaceholder.typicode.com/users');
  //     const data = await res.json();
  //     setData(data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log(error);
  //   }
  // };

  // useEffect(()=>{
  //   handelPageChange();
  // },[])
  return (
    <div className=' w-full h-screen bg-slate-400 p-1 overflow-hidden overflow-y-scroll'>
      <Pagination
       data={data}
       rendorRow={(data:DataProps)=>{
        return (
          <div className=' border rounded w-96 h-auto p-1 bg-slate-700/50'>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.phone}</p>
          </div>
        );
       }}
      // totalPage={3}
      // onPageChange={handelPageChange}
      // itemPerPage={20}
      //loading={isLoading}
      loader={<div>Loadinggggsgsgssgs......</div>}
      className=''
      />
    </div>
  )
}

export default App;