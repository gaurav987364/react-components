import React, { useEffect, useState } from 'react'

const App = () => {
  const [names,setNames] = useState([]);
  const [query,setQuery] = useState("");

  const fetchNames = async ()=>{
    try {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      console.log(data.users)
      setNames(data?.users)
    } catch (error) {
      console.error(error)
    }
  }

  const filterArr = names?.filter(user => user?.firstName?.includes(query));
  console.log(filterArr)

  useEffect(()=>{
    fetchNames()
  },[])
  return (
    <div>
      <input 
        type="text" 
        placeholder='search' 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
      />
      {filterArr?.map(name =>(
        <div>
          <span key={name?.id}>{name?.firstName}</span>
        </div>
      ))}
    </div>
  )
}

export default App;