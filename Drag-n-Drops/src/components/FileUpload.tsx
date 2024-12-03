import { useRef, useState } from "react"
import { Icons_Type, Icontypes } from "../utils/utils";
export interface filetype {
    name: string;
    size: number;
    type: Icontypes;
}
const FileUpload = ({getFiles} : {getFiles : (files: filetype[])=> void}) => {
    const [files, setFiles] =  useState<filetype[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    const onDragEnter = ()=>{
        ref.current?.classList.add("dragenter");
    }
    const onDragLeaveS = ()=>{
        ref.current?.classList.remove("dragenter");
    }
    const onDrop = ()=>{
        ref.current?.classList.remove("dragenter");
        console.log("File dropped");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFileDrops = (e:any)=>{
        const newFile = e.target.files[0];
        if(newFile){
            const updatedListOfFiles = [...files, newFile];
            setFiles(updatedListOfFiles);
            getFiles(updatedListOfFiles);
        }
    };

    const removeItem = (item : filetype)=>{
        const updatedList = files.filter((file)=>file !== item);
        setFiles(updatedList);
        getFiles(updatedList);
    };

  return (
    <>
    <div className=" w-[450px] h-fit rounded-lg bg-white/90 shadow-lg shadow-gray-400 p-5">
        <div className=" w-full h-full">
            <h1 className=" text-center text-3xl font-semibold">
                React's file upload's
            </h1>
            <div className=" mx-auto w-[300px] h-[160px] bg-gray-200 border-[2px] border-dashed border-blue-400 rounded-xl cursor-pointer hover:bg-blue-100 transition-opacity mt-5">
            <div  
            ref={ref} 
                onDragEnter={onDragEnter} 
                onDragLeave={onDragLeaveS} 
                onDrop={onDrop} 
                className=" relative z-10 mx-auto w-[100px] flex flex-col items-center justify-center mt-2"
            >
                <img src="/upload.png" alt="upload files" className=" w-full h-full object-cover"/>

                <input 
                    type="file" 
                    value="" 
                    onChange={onFileDrops} 
                    className=" absolute top-0 left-0 translate-x-1/5 translate-y-1/2 opacity-0 w-full h-full"
                />

                <h2 className=" w-full text-gray-500/70 text-xs text-center">
                    Drag and drop your file here
                </h2>
            </div>
            </div>
        </div>

        <div>
           {files.length <= 5 ? (
            <div>
                 {files.length > 0 ? (
                <div>
                    <p className=" text-xl font-semibold text-center mt-1
                     capitalize">your files preview</p>

                    {files?.map((item : filetype,index)=>( 
                        <div key={index} className=" flex w-full justify-between items-center gap-1 hover:bg-blue-200/20 rounded-xl transition-transform">
                            <div className=" flex justify-between items-center gap-2 mt-3">
                            <img src={Icons_Type[item.type.split('/')[1]] || Icons_Type['default']} alt="📂" width="36"/>
                                <p className=" font-semibold text-md line-clamp-1">{item.name}</p>
                                <p className=" text-gray-400">{item.size}</p>
                            </div>
                            <span className=" size-6 cursor-pointer" onClick={()=>removeItem(item)}>❌</span>
                        </div> 
                    ))}
                </div>
            ) : (
                <div></div>
            )}
            </div>
           ) : (
            <div>
                <p className=" text-red-500 font-bold italic text-lg text-center">You cannot upload more than 5 files.</p>
            </div>
           )}
        </div>
    </div>
    </>
  )
}

export default FileUpload