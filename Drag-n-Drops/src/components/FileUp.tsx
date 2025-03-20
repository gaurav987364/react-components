import React, { useRef, useState } from 'react';
import { MdOutlineCloudUpload } from "react-icons/md";
import { FaRegFileCode, FaTrashCan } from "react-icons/fa6";
import { formatFileSize } from '../utils/helper';

interface FileTypeProps{
    multiple?: boolean;
    name?: string;
    onFileUpload?: (file:File[]) => void;
    required?: boolean;
    showError?: boolean;
    errorMessage?: string;
    showProgress?: boolean;
    uploadErrorMessage?: string;
    disabled?: boolean;
    label?: string;
    className?: string;
};

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
    progress,
    uploadProgress,
    uploadError,
    uploadErrorMessage,
    disabled,
    label,
    className,
 ...rest
}) => {
    const [allFiles,setAllFiles] = useState<File[]>([]);
    const [isDragging,setIsDragging] = useState<boolean>(false);
    const [errors,setErrors] = useState<boolean>(false);
    console.log(errors);
    const dropZoneRef = useRef<HTMLDivElement | null>(null);

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
        //send back to user.
        if(onFileUpload){
            onFileUpload(newFiles);
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
        setAllFiles([...allFiles,...Array.from(files)]);
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
                accept=".psd,.jpg,.jpeg,.pdf,.png"
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
                <div key={file.size} className="flex items-center justify-between h-[20%] bg-gray-200 p-3 rounded-xl">
                <div className="flex items-center gap-1">
                    <FaRegFileCode size={22} />
                    <span className=' w-[80px] line-clamp-1 text-sm font-semibold'>
                    {file.name}
                </span> /
                <span className=' font-thin text-xs mt-0.5 text-gray-500'>{formatFileSize(file.size)}</span>
                </div>
                    <button>
                        <FaTrashCan size={18} fill="red" />
                    </button>
                </div>
            ))}
        </div>
        </div>
    </div>
  )
}

export default FileUp;