import React, { useEffect } from 'react'
const pageSize = 10;
const Todos = () => {
    const [todos, setTodos] = React.useState([]);
    const [query, setQuery] = React.useState('');
    const [currIndex, setCurrIndex] = React.useState(1);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch(
              "https://jsonplaceholder.typicode.com/todos"
            );
            const data = await response.json();
            setTodos(data);
          } catch (error) {
            console.log("Error: ", error);
          }
        };
        getData();
      }, []);

      const filterTodo = todos?.filter((todo)=>{
        return todo?.title.toLowerCase().includes(query.toLowerCase());
      })

      const highlightedChar = (title, query) => {
        const parts = title.split(new RegExp(`(${query})`, "gi"));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <span key={index} className="bg-yellow-600 ">{part}</span>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </span>
        );
    };
    
    const handelPageChange = (page) => {
        setCurrIndex(page);
    }

    const paginatedTodo = filterTodo.slice(
        (currIndex - 1) * pageSize, pageSize* currIndex
    )

    const toalPages = Math.ceil(filterTodo.length / pageSize)
  return (
    <div>
        <input type="text"  placeholder='Search...' value={query} onChange={(e)=> setQuery(e.target.value)}/>
        <table className=" w-full">
            <thead >
                <tr>
                    <th className=' ml-3'>User Id</th>
                    <th className=' ml-3'>Id</th>
                    <th className=' ml-3'>Title</th>
                    <th className=' ml-3'>Completed</th>
                    <th className=' ml-3'>Action</th>
                </tr>
            </thead>
            <tbody>
                {paginatedTodo?.map((todo,i)=>(
                    <tr key={todo?.id}>
                        <td>{todo?.userId}</td>
                        <td>{todo?.id}</td>
                        <td>{highlightedChar(todo?.title,query)}</td>
                        <td>{todo.completed}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        {Array.from({length:toalPages},(_,i)=>(
            <button className={` p-2 ${currIndex === i+1 ? "bg-blue-600" : ""}`} onClick={()=>handelPageChange(i+1)}>{i+1}</button>
        ))}
    </div>
  )
}

export default Todos