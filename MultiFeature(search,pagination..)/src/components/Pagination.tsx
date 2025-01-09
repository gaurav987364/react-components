import { useEffect, useState } from 'react'

const pageSize = 4;
const Pagination = () => {
    const [users,setUsers] = useState([]);
    const [query,setQuery] = useState("");
    const fetchUsers = async ()=>{
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const data = await res.json();
        setUsers(data);
    };
    const [page, setPage] = useState(1);
    const handlePageChange = (page:number) => {
        setPage(page);
    }

    const filteredUsers = users.filter((user)=> user?.title.toLowerCase().includes(query.toLowerCase()));
    const paginatedUsers = filteredUsers?.slice(
        (page-1)*pageSize,
        page*pageSize
    );

    const totalPages = (filteredUsers.length / pageSize)
    useEffect(()=>{
        fetchUsers();
    },[])
  return (
    <div className=' flex flex-col gap-2 justify-start flex-wrap h-auto bg-slate-700  p-5'>
        <div>
            <input 
            type="text" 
            value={query}
            placeholder='Search for user...'
            className=' w-1/2 p-3 rounded-lg'
            onChange={(e)=>setQuery(e.target.value)}
             />
        </div>
        <div className=' flex items-center gap-2 flex-wrap'>
            {paginatedUsers?.map((user)=>(
                <UserCard user={user} key={user.id}/>
            ))}
        </div>

        <div>
            {Array.from({length:totalPages},(_,i)=>(
                <button onClick={()=>handlePageChange(i+1)}>{i+1}</button>
            ))}
        </div>
    </div>
  )
}


export const UserCard = ({user})=>{
    return (
        <div>
            <div className="w-60 bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600 border border-slate-300 grid grid-col-2 justify-center p-4 gap-4 rounded-lg shadow-md">
            <div className="col-span-2 text-lg font-bold capitalize rounded-md">
                {user.title.slice(0,20)}
            </div>
            <div className="col-span-2 rounded-md">
                {user.body.slice(0,20)}
            </div>
            <div className="col-span-1">
                <button className="rounded-md bg-slate-300 hover:bg-slate-600 hover:text-slate-200 duration-300 p-2">
                    {user.website}
                </button>
            </div>
            </div>
        </div>
    )
}
export default Pagination;