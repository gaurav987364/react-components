import { useEffect, useRef, useState } from "react"
import Pills from "./Pills";

interface Users{
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    id?: number; // unique id for user
}
const MultiSearch = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Users[]>([]);
    const [selectedUser, setSelectedUser] = useState<Users[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [highlightIndex, setHighlightIndex] = useState<number>(-1); 
    // check if user already been selected so dont show in suggestions  list.
    const [alreadySelectedUser, setAlreadySelectedUser] = useState(new Set());
    const fetchUsers = async ()=>{
        if(searchValue.trim() === ""){
            setSuggestions([]);
            return;
        }

        fetch(`https://dummyjson.com/users/search?q=${searchValue}`)
        .then(res => res.json())
        .then((data)=> setSuggestions(data?.users))
        .catch(err=> console.error(err));
    }

    useEffect(()=>{
        const handler = setTimeout(() => {
            if (searchValue.trim()) {
                fetchUsers();
            } else {
                setSuggestions([]);
            }
        }, 300);
    
        // Clear the timeout if searchValue changes before the delay is over
        return () => clearTimeout(handler);
    },[searchValue]);

    const handelSelectedUser = (us: Users)=>{
        // console.log(us)
        setSelectedUser([...selectedUser, us]);
        // check if user already selected so dont show in suggestions list(set me email set kr rhe hai)
        setAlreadySelectedUser(new Set([...alreadySelectedUser, us.email])); // email is unique in this api
        setSearchValue("");
        setSuggestions([]);
        setHighlightIndex(-1); // Reset highlight index
        // shifting focus after select user everytime
        inputRef.current?.focus()
    }

    const handelRemoveUser = (us: Users)=>{
        const updatedUsers = selectedUser.filter(((selctuser) => selctuser.id !== us.id))
        setSelectedUser(updatedUsers);
       
        const updateSavedSetusers = new Set(alreadySelectedUser);
        updateSavedSetusers.delete(us.email);
        setAlreadySelectedUser(updateSavedSetusers);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handelKeyDown = (e: any)=>{
        if(e.key === "Backspace" && e.target.value === "" && selectedUser.length>0){
            const lastUser = selectedUser[selectedUser.length - 1];
            handelRemoveUser(lastUser);
            setSuggestions([])
            return;
        }
        if (e.key === "ArrowDown") {
            setHighlightIndex((prevIndex) =>
              Math.min(prevIndex + 1, suggestions.length - 1)
            );
            e.preventDefault(); // Prevent default scrolling
        }
      
        if (e.key === "ArrowUp") {
            setHighlightIndex((prevIndex) =>
              Math.max(prevIndex - 1, 0)
            );
            e.preventDefault(); // Prevent default scrolling
        }
      
        if (e.key === "Enter" && highlightIndex >= 0) {
            const selectedSuggestion = suggestions[highlightIndex];
            if (selectedSuggestion) {
              handelSelectedUser(selectedSuggestion);
            }
        }
    }
  return (
    // <div className=" w-[40rem] h-[20rem] relative rounded-lg">
    //     <div className=" input">
    //         {/* pills */}
    //         <span className=" w-full h-auto flex items-center gap-1  absolute top-[11px]">            
    //         {selectedUser?.map((user)=>{
    //             return (
    //                  <Pills 
    //                  key={user.email} 
    //                  image={user.image} 
    //                  text={user.firstName} 
    //                  onClick={()=>handelRemoveUser(user)}
    //              />
    //             )
    //         })}
    //         </span>
    //         {/* search suggestions */}

    //         <input 
    //          type="text"
    //          value={searchValue}
    //          onChange={(e)=> setSearchValue(e.target.value)}
    //          placeholder="Search for users..."
    //          className=" bg-gray-200 outline-none  focus:border-[2px] border-blue-700 w-full p-2 rounded-lg shadow-lg shadow-gray-400"
    //          />
    //          <div>
    //             <ul className=" w-full max-h-[300px] overflow-y-scroll list-none p-0 m-0 absolute bg-white border border-l-black border-r-black border-b-black no-scrollbar mt-1">
    //                 {suggestions?.map((user : Users)=> {
    //                     return !alreadySelectedUser.has(user?.email) ? (
    //                         <li onClick={()=> handelSelectedUser(user)} key={user?.email} className=" flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 shadow-md shadow-slate-200 transition-transform">
    //                             <img src={user?.image} alt="image" className=" w-10 h-10 rounded-full overflow-hidden" />
    //                             <span className="font-semibold italic text-sm">{`${user?.firstName} ${user?.lastName}`}</span>
    //                         </li>
    //                     ) : <></>
    //                 })}

    //             </ul>
    //          </div>
    //     </div>
    // </div>

    <div className="relative w-full max-w-lg rounded-lg">
        <div className="relative">
            {/* Pills */}
            <div className="flex flex-wrap items-center gap-2 py-2 px-3 bg-gray-200 rounded-lg shadow-lg">
            {selectedUser?.map((user) => {
                return (
                <Pills
                    key={user.email}
                    image={user.image}
                    text={user.firstName}
                    onClick={() => handelRemoveUser(user)}
                />
                );
            })}
            <input
                type="text"
                ref={inputRef}
                value={searchValue}
                onKeyDown={handelKeyDown}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={
                selectedUser.length === 0 ? "Search for users..." : "Search for users..."
                }
                className="flex-1 min-w-[120px] bg-transparent outline-none focus:border-none p-1 text-sm"
            />
            </div>
            {/* Search suggestions */}
            <ul className="absolute top-full left-0 right-0 max-h-72 overflow-y-scroll bg-white border border-gray-300 rounded-lg mt-2 z-10 shadow-md no-scrollbar">
            {suggestions?.map((user: Users, index:number) => {
                const isHighlighted = index === highlightIndex;
                return !alreadySelectedUser.has(user?.email) ? (
                <li
                    onClick={() => handelSelectedUser(user)}
                    key={user?.email}
                    className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${
                        isHighlighted ? "bg-blue-100" : "hover:bg-gray-100"
                    }`}
                >
                    <img
                        src={user?.image}
                        alt="user"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium">
                        {`${user?.firstName} ${user?.lastName}`}
                    </span>
                </li>
                ) : null;
            })}
            </ul>
        </div>
    </div>
  )
}

export default MultiSearch