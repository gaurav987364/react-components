import { useEffect, useRef, useState } from "react"
import Pills from "./Pills";

type Users = {
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    id?: number; // unique id for user
}
const MultiSearch2 = () => {
    const [inputVal, setInputVal] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Users[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<Users[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [alreadyUser, setAlreadyUser] = useState(new Set());
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const fetchUsers = async ()=>{
        if(inputVal.trim() === ""){
            setSuggestions([]);
            return;
        }

        fetch(`https://dummyjson.com/users/search?q=${inputVal}`)
        .then(res => res.json())
        .then((data)=> setSuggestions(data?.users))
        .catch(err=> console.error(err));
    };

    const selectUser = (us:Users)=>{
        setSelectedUsers((prev)=>[...prev, us]);
        setAlreadyUser((prev)=> new Set([...prev, us?.email]));
        setInputVal("");
        setSuggestions([]);
        inputRef.current?.focus();
    };

    const deleteUser = (us:Users)=>{
        const updateUser = selectedUsers.filter((item)=>{
            return item?.id !== us?.id
        });
        setSelectedUsers(updateUser);

        const updateSetUserDetails = new Set(alreadyUser);
        updateSetUserDetails.delete(us?.email);
        setAlreadyUser(updateSetUserDetails);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handelKeyDown = (e:any)=>{
        if(e.key === "Backspace" && e.target.value === "" && selectedUsers.length>0){
            const lastUser = selectedUsers[selectedUsers.length - 1];
            deleteUser(lastUser);
            return;
        }

        if(e.key === "ArrowDown"){
            setHighlightedIndex((prevIndex)=>{
                return Math.min(prevIndex + 1, suggestions.length -1)
            });
            e.preventDefault();
        }
        if(e.key === "ArrowUp"){
            setHighlightedIndex((prevIndex) =>{
                return Math.max(prevIndex - 1, 0)
            })
            e.preventDefault(); // Prevent default scrolling
        }

        if(e.key === "Enter" && highlightedIndex >= 0){
            const selectedUser = suggestions[highlightedIndex];
            selectUser(selectedUser);
        }
    }

    useEffect(()=>{
        const debounce = setTimeout(()=>{
            if(inputVal.trim()){
                fetchUsers();
            } else{
                setSuggestions([]);
            }

            return ()=>clearTimeout(debounce);
        },350)
    },[inputVal])
  return (
    <div className=" relative w-full max-w-lg rounded-lg bg-red-50">
        <div className=" relative">
            <div className=" flex flex-wrap gap-2 py-2 shadow-lg shadow-purple-300 rounded-lg px-3">
            {/* pills */}
            {selectedUsers?.map((user)=>{
                return (
                    <Pills key={user?.email} image={user?.image} text={user?.firstName} onClick={()=>deleteUser(user)}/>
                )
            })}

            <input 
              type="text"
              ref={inputRef}
              value={inputVal}
              spellCheck
              onKeyDown={handelKeyDown}
              onChange={(e)=>setInputVal(e.target.value)} 
              className=" flex-1 min-w-[120px] bg-transparent outline-none focus:border-blue-500 p-1 text-sm text-black placeholder-gray-800 placeholder:font-semibold placeholder:text-[15px]"
              placeholder={
                suggestions.length === 0 ? "search for users..." : "Search for users..."
              }
            />
            </div>
        </div>
        {/* {suggestions} */}
        <ul className=" absolute top-full right-0 left-0 max-h-72 bg-gray-200 overflow-y-scroll border border-gray-300 rounded-lg mt-2 z-10 shadow-md no-scrollbar">
            {suggestions?.map((user:Users, index:number)=>{
                const isHighlighted = index === highlightedIndex;
                return !alreadyUser.has(user?.email)  ? (
                    <li key={user?.email} className={` flex items-center cursor-pointer hover:bg-purple-200 transition-transform ${isHighlighted ? "bg-blue-100" : "hover:bg-gray-100"}` } onClick={()=>selectUser(user)} >
                        <img
                         src={user?.image}
                         alt="user"
                         className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium">
                         {`${user?.firstName} ${user?.lastName}`}
                        </span>
                    </li>
                ) : null
            })}
        </ul>
    </div>
  )
}

export default MultiSearch2