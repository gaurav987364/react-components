import React, { useState } from "react"
import 'react-tooltip/dist/react-tooltip.css'
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaAngleRight, FaChevronDown, FaRegPlusSquare } from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RiDeleteBin5Line, RiFileEditLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { getIconForItem } from "../data";
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
                    name:"public",
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
    const [editId,setEditId] = useState<number |null>(null);
    const [editText, setEditText] = useState<string>("");
    //drag and drop states;
    const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
    const [draggedOverId, setDraggedOverId] = useState<number | null>(null);


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

    //?delete files and folders...
    const handelDelete = (id:number)=>{
        const updatedItems = deleteItems(folder,id);
        setFolder(updatedItems);
        setActiveId(null);
    };
    const deleteItems = (
        folderList: Folder[],
        id: number
    ):Folder[]=>{
        return folderList.filter((folder)=> folder.id !== id)
        .map((folder)=>(
            {...folder, files: deleteItems(folder.files, id)}
        ))
    };

    //?update files and folders...
    const editStateSetter = (id:number,text:string)=>{
        setEditId(id);
        setEditText(text);
    }
    const handelSaveEdit = ()=>{
        if(!editText.trim()) return;
        const updateItems = editItem(folder,editId,editText);
        setFolder(updateItems);
        setEditId(null);
        setEditText("");
    }
    const editItem = (
        folderList: Folder[],
        id: number | null,
        newText: string
    ):Folder[]=>{
        return folderList.map((folder)=>{
            if(folder.id === id){
                return {...folder, name:newText}
            }
            return {...folder, files:editItem(folder.files, id, newText)}
        })
    };

    //?drag and drop operations
    const handelDragStart = (id:number)=>{
        setDraggedItemId(id);
    };

    const handelOnDrop = (targetId:number)=>{
       if(draggedItemId === null) return; // no item is dragged

       //prevent dropping onto itself
       if(draggedItemId === targetId) return;

       //clone the folder just like copy
       const updatedFolderArray = moveDragItem(folder,targetId,draggedItemId);
       if(updatedFolderArray){
           setFolder(updatedFolderArray);
       }
       setDraggedItemId(null);
       setDraggedOverId(null);
    };

    const moveDragItem = (
        folderList: Folder[],
        targetId: number,
        draggedItemId: number
    ):Folder[] | null=>{
        let draggedItem : Folder | null = null;

        const removeDragitem = (list:Folder[]):Folder[]=>{
            return list.filter((folder)=>{
                if(folder.id === draggedItemId){
                    draggedItem = folder;
                    return false;
                }
                return true;
            }).map((folder)=>(
                {...folder, files:removeDragitem(folder.files)}
            ))
        };


        const addDragItem = (list :Folder[]):Folder[]=>{
            return list.map((folder)=>{
                //only files and folder move to another folder not to file
                if(folder.id === targetId && folder.isFolder){
                    return {
                        ...folder, 
                        files:[...folder.files, draggedItem!]
                    }
                }
                return {...folder, files:addDragItem(folder.files)}
            })
        };

        //perform removal and addidtion;
        const withoutDraggedItems = removeDragitem(folderList);
        if(draggedItem){
            return addDragItem(withoutDraggedItems);
        }
        return null;
    };

    
    const rendorFolder = (folder: Folder[]) => {
        //?sort for render folder over file in array
        const sortedList = [...folder].sort((a, b) => {
          if (a.isFolder === b.isFolder) return 0;
          return a.isFolder ? -1 : 1; // Folders come before files
        });
      
        return sortedList.map((item) => {
          const isActive = activeId === item.id;
          const isOpen = openFolders.has(item.id);
          const onHover = draggedOverId === item.id;
      
          return (
            <div key={item.id} className={`ml-2 pl-2`}>
              <div className={`flex items-center gap-1 cursor-pointer px-2 `}>
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
                    {isOpen ? <FaChevronDown size={18}/> : <FaAngleRight size={18}/>} 
                    {/* Arrow icon changes based on open/close state */}
                  </span>
                )}
      
                {/* Render folder or file with onClick for selection */}
                <div
                  draggable="true"
                  onDragStart={()=>handelDragStart(item.id)}
                  onDrop={()=>handelOnDrop(item.id)}
                  onDragOver={(e)=> {
                    e.preventDefault()
                    // prevent triggering the select handler
                  }}
                  onClick={(e) => selectFolder(e, item.id)}
                  className={`flex-1 ${isActive ? "bg-gray-600 text-white" : "bg-transparent hover:bg-gray-500/20 transition-colors "} ${onHover ? "bg-blue-500/50" : ""}`}
                >
                   <span className={`inline-block mr-1 -mb-[2px]`}>
                      {getIconForItem(item.name, item.isFolder)}
                   </span>
                  {item.name}
                </div>
                <RiFileEditLine 
                  onClick={(e)=>{
                    e.stopPropagation();
                    editStateSetter(item.id, item.name)
                  }}
                  size={18}
                  className=" hover:text-green-600 hover:animate-pulse cursor-pointer" 
                  data-tooltip-id="my-tooltip" 
                  data-tooltip-content="Edit"
                />
                <RiDeleteBin5Line onClick={(e)=>{
                    e.stopPropagation();
                    handelDelete(item.id)
                }} 
                    size={18} 
                    className=" hover:text-red-500 hover:animate-pulse cursor-pointer"
                    data-tooltip-id="my-tooltip" data-tooltip-content="Delete"
                />
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
                {editId ?  (
                    <span className=" flex items-center gap-1">
                        <input 
                            type="text" 
                            placeholder="Edit..."
                            value={editText}
                            onChange={(e)=> setEditText(e.target.value)}
                            className=" w-[10rem] p-1 text-white rounded bg-transparent placeholder:text-white font-semibold text-sm mt-1 px-3 outline-none border-[1px] focus:outline-purple-500"
                        />
                        <FaRegPlusSquare 
                            onClick={handelSaveEdit}
                            size={20}  
                            className=" mt-1 cursor-pointer hover:text-blue-300"
                            data-tooltip-id="my-tooltip" data-tooltip-content="Save"
                        />
                        <Tooltip id="my-tooltip"
                        style={{backgroundColor:"black",color:"white",fontWeight:"600"}}
                        />
                    </span>
                ) : (
                    <span>
                        <input 
                        type="text" 
                        placeholder="Create..."
                        value={inputValue}
                        onChange={(e)=> setInputValue(e.target.value)}
                         className=" w-[10rem] p-1 text-white rounded bg-transparent placeholder:text-white font-semibold text-sm mt-1 px-3 outline-none border-[1px] focus:outline-purple-500"
                       />
                    </span>
                )}
            </span>
            <span className=" flex items-center">
                <button onClick={addNewFiles} className=" cursor-pointer hover:text-gray-300">
                    <AiOutlineFileAdd 
                        size={20} 
                        data-tooltip-id="my-tooltip" data-tooltip-content="New file"
                    />
                    <Tooltip id="my-tooltip"
                        style={{backgroundColor:"black",color:"white",fontWeight:"600"}}
                    />
                </button>
                <button onClick={addNewFolder} className=" cursor-pointer mt-1 hover:text-gray-300">
                    <MdOutlineCreateNewFolder 
                        size={20}
                        data-tooltip-id="my-tooltip" data-tooltip-content="New folder"
                    />
                    <Tooltip id="my-tooltip"
                        style={{backgroundColor:"black",color:"white",fontWeight:"600"}}
                    />
                </button>
            </span>
        </div>
        <div>
            {rendorFolder(folder)}
        </div>
    </div>
  )
}

export default Folder;