import React, { useRef, useState } from 'react';
import { MdOutlineCloudUpload } from "react-icons/md";
import { FaRegFileCode, FaTrashCan } from "react-icons/fa6";
import { acceptedFileTypes, formatFileSize } from '../utils/helper';
import  usePromiseTracker  from '../hooks/usePromiseTracker';

interface FileTypeProps{
    multiple?: boolean;
    name?: string;
    onFileUpload?: (file:File[]) => void;
    required?: boolean;
    showError?: boolean;
    errorMessage?: string;
    showProgress?: boolean;
    disabled?: boolean;
    label?: string;
    className?: string;
};

// interface FileUploadEventProps extends React.ChangeEvent<HTMLInputElement>{
//     target: HTMLInputElement & EventTarget;
// };

const UPLOAD_SPEED_KBPS = 500; // Simulated upload speed in KB/s

interface DragEventHandlers {
    onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    OnDrop: (event: React.DragEvent<HTMLDivElement>) => void;
};
const FileUp:React.FC<FileTypeProps> = ({
    multiple,
    name,
    onFileUpload,
    required,
    showError = false,
    errorMessage,
    showProgress = false,
    disabled,
    label,
    className,
 ...rest
}) => {
    const [allFiles,setAllFiles] = useState<File[]>([]);
    const [promises,setPromises] = useState<Promise<string>[]>([]);
    const [isDragging,setIsDragging] = useState<boolean>(false);
    const [errors,setErrors] = useState<boolean>(false);
    console.log(errors);
    const dropZoneRef = useRef<HTMLDivElement | null>(null);

    //use of promise tracker;
    const  {progress} = usePromiseTracker(promises);
    console.log(progress);

    //file types
    const allfiletypes = Object.values(acceptedFileTypes).flat().join(",");

    //file upload function 
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        //making an array of file {item 1}.
        const filesArray = Array.from(e.target.files!);

        //prevents duplicate file uploads
        const newFiles = filesArray.filter(
            (file)=>  !allFiles.some((f)=> f.name === file.name && f.size === file.size)
        );

        if(newFiles.length === 0){
            if(showError){
                setErrors(true);
            }
            return;
        }

        //set files
        setAllFiles([...allFiles, ...newFiles]);


        //setting promise for each file upload
        const uploadPromise:Promise<string>[] = allFiles.map((file:File)=>{
            return new Promise((resolve) => {
                // Simulate file upload with a timeout
                const fileSizeKb = file.size / 1024;
                const uploadTime = (fileSizeKb / UPLOAD_SPEED_KBPS) * 1000; // Convert KB/s to ms
                setTimeout(() => {
                    resolve(`Uploaded ${file.name}`);
                }, uploadTime);
            });
        })

        //call upload function
        setPromises(uploadPromise);
        //send back to user.
        if(onFileUpload){
            onFileUpload(newFiles);
        }
    }

    //delete files
    const deleteFile = (file:File)=>{
        const updatedFiles = allFiles?.filter((f) =>{
            return f.name!== file.name || f.size!== file.size;
        });
        setAllFiles(updatedFiles);
        if(onFileUpload){
            onFileUpload(updatedFiles);
        }
    }

    //drag events
    //     onDragEnter: Fires when a dragged file enters the dropzone.
    // onDragOver: Fires repeatedly when a dragged file is over the dropzone (prevents default behavior).
    // onDragLeave: Fires when the dragged file leaves the dropzone.
    // onDrop: Fires when the file is dropped

    const onDragEnter: DragEventHandlers['onDragEnter'] = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setIsDragging(true);
    };
    const onDragLeave:DragEventHandlers['onDragLeave'] = (event)=>{
        event.preventDefault()
        event.stopPropagation()
        setIsDragging(false);
    };
    const handleDragOver:DragEventHandlers['handleDragOver'] = (event) => {
        event.preventDefault(); // Prevent default to allow drop
        event.stopPropagation();
    };
    const OnDrop:DragEventHandlers['OnDrop'] = (event)=>{
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false); // Remove highlight
        
        const files = event.dataTransfer!.files; // Get dropped files
        setAllFiles([...allFiles,...files]);
    };
  return (
        <div className="w-full max-w-[600px] h-[350px] max-sm:h-[80%] shadow-lg shadow-[#00000057] rounded-3xl bg-[#feffe9d6] p-4">
            <h1 className="text-center text-xl font-semibold">
            {label ? label : "File Upload"}
            </h1>

        <div className="w-full flex max-sm:flex-col gap-4 border-t border-[#b8acac] mt-2 pt-3">
        {/* Dropzone Section */}
        <div className="flex-1 flex items-center justify-center">
            <div className={`relative dropzone w-full max-w-[320px] border-2  border-dashed rounded-2xl flex flex-col items-center justify-center space-y-2 p-4 text-center transition-all ${
            isDragging ? "border-[#6e33ee] bg-purple-200" : "border-gray-400"
            }`}
                ref={dropZoneRef}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={handleDragOver}
                onDrop={OnDrop}
            >
            <MdOutlineCloudUpload size={50} fill="#6e33ee" />
            <h1 className="font-semibold">
                {isDragging ? "Drop your files here!" : "Drag & Drop files to upload"}
            </h1>
            <strong>Or</strong>
           {/* File Input (Hidden) with Label */}
            <label htmlFor="file-upload" className="px-4 py-2 bg-[#6e33ee] text-white rounded-full hover:bg-[#3806a3cb] transition cursor-pointer">
            Browse
            </label>
            <input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                disabled={disabled}
                required={required}
                multiple={multiple}
                name={name}
                accept={allfiletypes}
                aria-label={label}
                {...rest}
                className="hidden"
            />
            <p className="text-xs text-gray-500 italic">Supported files: PSD, JPG, PDF...</p>
            </div>
        </div>

        {/* Uploaded Files List */}
        <div className="flex-1 w-full max-h-[250px] overflow-auto p-2 space-y-2">
            <h1 className=" sticky text-center font-semibold text-lg">
                Uploaded Files
            </h1>
            {allFiles?.map(file => (
                <div key={file.name} className="relative w-full">
                <div className="flex items-center justify-between bg-gray-100 p-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <FaRegFileCode size={22} className="text-blue-500" />
                    <span className="w-[100px] truncate text-sm font-semibold">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({formatFileSize(file.size)})
                    </span>
                  </div>
                  <button onClick={() => deleteFile(file)} className="hover:opacity-80">
                    <FaTrashCan size={18} className="text-red-500" />
                  </button>
                </div>
          
                {/* Progress Bar */}
                <div className="absolute left-0 bottom-0 w-full h-[3px] bg-gray-300 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `40%` }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
        </div>
    </div>
  )
}

export default FileUp;