import { IconType } from "react-icons";
import { FaFile, FaFileZipper, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileAudio, FaFileVideo, FaFileImage, FaFileCode } from "react-icons/fa6";
import {FaFileAlt,FaFilePdf,} from "react-icons/fa"
import { BiSolidFilePng, BiSolidFileJpg, BiSolidFileTxt } from "react-icons/bi";
import { AiOutlineFileGif } from "react-icons/ai";
import { BsFiletypeSvg, BsFiletypeJson, BsFiletypeCss, BsFiletypeHtml, BsFiletypeJs, BsFiletypeTsx } from "react-icons/bs";
import { SiJpeg, SiPython, SiPhp, SiCplusplus, SiSharp, SiGo, SiRust, SiKotlin, SiSwift, SiRuby } from "react-icons/si";

interface IconTypeProps {
    [key: string]: IconType;
};

interface FileIconProps {
    filename: string;
    size?: number;
    color?: string;
};


const Icons_Type: IconTypeProps = {
    "default": FaFile,          // Default fallback icon
    "pdf": FaFilePdf,           // PDF files
    "png": BiSolidFilePng,      // PNG images
    "jpg": BiSolidFileJpg,      // JPG images
    "jpeg": SiJpeg,             // JPEG images
    "gif": AiOutlineFileGif,    // GIF images
    "svg": BsFiletypeSvg,       // SVG vector images
    "zip": FaFileZipper,        // ZIP, RAR, compressed files
    "txt": BiSolidFileTxt,      // Text files
    "json": BsFiletypeJson,     // JSON files
    "xml": FaFileCode,          // XML files
    "csv": FaFileExcel,         // CSV files
    "doc": FaFileWord,          // Microsoft Word documents
    "docx": FaFileWord,         // Microsoft Word (new format)
    "xls": FaFileExcel,         // Excel spreadsheet
    "xlsx": FaFileExcel,        // Excel spreadsheet (new format)
    "ppt": FaFilePowerpoint,    // PowerPoint presentation
    "pptx": FaFilePowerpoint,   // PowerPoint (new format)
    "mp3": FaFileAudio,         // MP3 audio files
    "wav": FaFileAudio,         // WAV audio files
    "ogg": FaFileAudio,         // OGG audio files
    "mp4": FaFileVideo,         // MP4 video files
    "avi": FaFileVideo,         // AVI video files
    "mov": FaFileVideo,         // MOV video files
    "wmv": FaFileVideo,         // WMV video files
    "flv": FaFileVideo,         // FLV video files
    "html": BsFiletypeHtml,     // HTML files
    "css": BsFiletypeCss,       // CSS stylesheets
    "js": BsFiletypeJs,         // JavaScript files
    "jsx": FaFileCode,          // JSX (React JavaScript)
    "ts": BsFiletypeTsx,         // TypeScript files
    "tsx": FaFileCode,          // TypeScript with JSX
    "py": SiPython,             // Python scripts
    "php": SiPhp,               // PHP scripts
    "cpp": SiCplusplus,         // C++ source files
    "c": FaFileCode,            // C source files
    "cs": SiSharp,             // C# source files
    "go": SiGo,                 // Go language files
    "rs": SiRust,               // Rust source files
    "kt": SiKotlin,             // Kotlin source files
    "swift": SiSwift,           // Swift language files
    "rb": SiRuby,               // Ruby scripts
    "sh": FaFileCode,           // Shell scripts
    "bat": FaFileCode,          // Batch scripts
    "exe": FaFileAlt,           // Executable files
    "apk": FaFileAlt,           // Android APK files
    "dmg": FaFileAlt,           // MacOS disk image
    "iso": FaFileAlt,           // ISO disk images
    "psd": FaFileImage,         // Adobe Photoshop files
    "ai": FaFileImage,          // Adobe Illustrator files
    "sketch": FaFileImage,      // Sketch design files
    "xd": FaFileImage,          // Adobe XD files
};



const FileIcon: React.FC<FileIconProps> = ({ filename, size = 24, color = "black" }) => {
    // Extract file extension
    const fileExtension = filename.split(".").pop()?.toLowerCase() || "default";
  
    // Get the corresponding icon or fallback to "default"
    const IconComponent = Icons_Type[fileExtension] || Icons_Type["default"];
  
    return <IconComponent size={size} color={color} />;
};
  
export default FileIcon;