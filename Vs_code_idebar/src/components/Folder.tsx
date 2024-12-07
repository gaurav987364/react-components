import React, { useState } from "react"
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaAngleRight, FaChevronDown, FaFolder, FaRegFileAlt, } from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";
interface Folder {
    id:number;
    name: string;
    isFolder:boolean;
    files:Folder[];
}
const Folder = () => {
    const [folder,setFolder] = useState<Folder[]>([
        {
            id:1,
            name:"root",
            isFolder:true,
            files:[
                {
                    id:2,
                    name:"Public",
                    isFolder:true,
                    files:[]
                },
                {
                    id:3,
                    name:"src",
                    isFolder:true,
                    files:[
                        {
                            id:4,
                            name:"App.tsx",
                            isFolder:false,
                            files:[]
                        }
                    ]
                }
            ]
        }
    ]);
    const [inputValue, setInputValue] = useState<string>("");
    const [activeId, setActiveId] = useState<number | null>(null);
    const [openFolders,setOpenFolders] = useState<Set<number>>(new Set());
    //?select the particluar item
    const selectFolder = (e : React.MouseEvent,id:number)=>{
        e.stopPropagation();
        console.log("Clicked Item ID:", id);
        // select active state for the clicked item
        setActiveId((prev) => (prev === id ? null : id));
    };

    //? add new folder
    const addNewFolder = ()=>{
        if(!activeId) return;
        if(!inputValue.trim()) return;

        const newFolder = {
            id: Date.now(),
            name:inputValue,
            isFolder:true,
            files:[]
        };

        let updatedFolder : Folder[];
        if(activeId){
            updatedFolder = addItems(folder,activeId,newFolder,"folder")
        } else{
            updatedFolder = [...folder, newFolder];
        }
        setFolder(updatedFolder);
        setActiveId(null);
        setInputValue("");
    };
    //? add new file
    const addNewFiles = ()=>{
        if(!activeId) return;
        if(!inputValue.trim()) return;

        const newFile = {
            id: Date.now(),
            name:inputValue,
            isFolder:false,
            files:[]
        };

        let updatedFolder : Folder[];
        if(activeId){
            updatedFolder = addItems(folder,activeId,newFile,"file")
        } else{
            updatedFolder = [...folder, newFile];
        }
        setFolder(updatedFolder);
        setActiveId(null);
        setInputValue("");
    };

    //? worker for adding new files/folders
    const addItems = (
        folderList:Folder[],
        parentId:number,
        newFolder:Folder,
        itemType : "folder" | "file"
    ):Folder[]=>{
        return folderList?.map((folder)=>{
            if(folder.id === parentId){
                if(!folder?.isFolder){
                    alert("Can't create file and folder inside file. Please select a folder.")
                    return null;
                }
                return {...folder, files:[...folder.files, newFolder]}
            }
            const updatedFiles = addItems(folder.files,parentId,newFolder,itemType);
            if(updatedFiles === null){
                return null; // when we do addfile inside file
            }
            return {...folder, files:updatedFiles}
        }).filter(Boolean) as Folder[]; // filter out null items;
    }

    //? open and close folder
    const openfolderfunction = (id:number)=>{
        setOpenFolders((pv)=>{
            const updateValue = new Set(pv);
            if(updateValue.has(id)){
                updateValue.delete(id);
            } else{
                updateValue.add(id);
            }
            return updateValue;
        })
    }
    //     //?sort folder before files
    //     const sortedList = [...folder].sort((a,b)=>{
    //         if(a.isFolder === b.isFolder) return 0;
    //         return a.isFolder ? -1 : 1; // folder come before files..
    //     })
    //     return sortedList.map((item)=>{
    //         const isActive = activeId === item.id;
    //         const isOpen = openFolders.has(item.id);
    //         return (
    //             <div 
    //                 onClick={(e)=>selectFolder(e,item?.id)} 
    //                 key={item.id} 
    //                 className={`ml-2 pl-2 cursor-pointer ${
    //                     isActive ? "bg-gray-600 text-white" : "bg-transparent"
    //                 }`}
    //             >
    //                 {item?.isFolder ? (
    //                         <div onClick={()=>openfolderfunction(item?.id)} className={`flex items-center gap-1 w-full z-10`}>
    //                             <FaFolder 
    //                              fill={activeId === item.id ? "orange" : "yellow"}
    //                              />
    //                             {item?.name}
    //                         </div>
    //                 ) : (
    //                     <div className=" w-full flex items-center gap-1 -ml-3 pl-1 border-l-[2px]">
    //                         <FaRegFileAlt 
    //                          fill={activeId === item.id ? "orange" : "white"}
    //                         />
    //                         {item?.name}
    //                     </div>
    //                 )}
    //                 {isOpen && (
    //                  <div className=" ml-4">{rendorFolder(item?.files)}</div>
    //                 )}
    //             </div>
    //         )
    //     })
    // };

    const rendorFolder = (folder: Folder[]) => {
        //?sort for render folder over file in array
        const sortedList = [...folder].sort((a, b) => {
          if (a.isFolder === b.isFolder) return 0;
          return a.isFolder ? -1 : 1; // Folders come before files
        });
      
        return sortedList.map((item) => {
          const isActive = activeId === item.id;
          const isOpen = openFolders.has(item.id);
      
          return (
            <div key={item.id} className={`ml-2 pl-2`}>
              <div className={`flex items-center gap-1 cursor-pointer`}>
                {/* Render the arrow for toggling open/close */}
                {item?.isFolder && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); 
                      // Prevent triggering the select handler
                      openfolderfunction(item.id);
                    }}
                    className="cursor-pointer mt-1 text-neutral-500 hover:text-gray-200"
                  >
                    {isOpen ? <FaChevronDown size={18}/> : <FaAngleRight size={18}/>} {/* Arrow icon changes based on open/close state */}
                  </span>
                )}
      
                {/* Render folder or file with onClick for selection */}
                <div
                  onClick={(e) => selectFolder(e, item.id)}
                  className={`flex-1 ${isActive ? "bg-gray-600 text-white" : "bg-transparent hover:bg-gray-500/20 transition-colors"}`}
                >
                  {item.isFolder ? (
                    <FaFolder
                      fill={isActive ? "orange" : "yellow"}
                      className="inline-block mr-1"
                    />
                  ) : (
                    <FaRegFileAlt
                      fill={isActive ? "orange" : "white"}
                      className="inline-block mr-1"
                    />
                  )}
                  {item.name}
                </div>
              </div>
      
              {/* Render nested folders/files if the folder is open */}
              {isOpen && <div className="ml-4">{rendorFolder(item.files)}</div>}
            </div>
          );
        });
      };
      
  return (
    <div className=" w-80 shrink-0 h-auto bg-neutral-700">
        <div className=" px-2 flex w-full items-center justify-between">
            <span>Vs Code.</span>
            {/* <span className="ml-1 text-gray-500">/src/components</span> */}
            <span>
                <input 
                 type="text" 
                 placeholder="Create..."
                 value={inputValue}
                 onChange={(e)=> setInputValue(e.target.value)}
                  className=" w-[10rem] p-1 text-white rounded bg-transparent placeholder:text-white font-semibold text-sm mt-1 px-3 outline-none border-[1px] focus:outline-purple-500"
                />
            </span>
            <span className=" flex items-center">
                <button onClick={addNewFiles} className=" cursor-pointer hover:text-gray-300">
                    <AiOutlineFileAdd size={20}/>
                </button>
                <button onClick={addNewFolder} className=" cursor-pointer mt-1 hover:text-gray-300">
                    <MdOutlineCreateNewFolder size={20}/>
                </button>
            </span>
        </div>
        <div>
            {rendorFolder(folder)}
        </div>
    </div>
  )
}

export default Folder