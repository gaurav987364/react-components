import { AiFillGithub, AiOutlineHtml5 } from "react-icons/ai"; // Example
import { DiCss3, DiJavascript1, DiPhp, DiPython } from "react-icons/di";
import { FaFolder, FaRegFileAlt } from "react-icons/fa";

import { BsFileBinary, BsFileCode, BsFileEarmarkPdf, BsFileEarmarkText } from "react-icons/bs";
import { DiJava, DiReact, DiRuby } from "react-icons/di";
import {  SiGo, SiKotlin, SiMarkdown, SiRust, SiSwift, SiTypescript, SiYaml } from "react-icons/si";
import { IoScanCircleSharp } from "react-icons/io5";
import { TbFolderStar } from "react-icons/tb";
import { LuFolderCode } from "react-icons/lu";
import { BiLogoTailwindCss } from "react-icons/bi";

// Icon mapping for file types and folder names
const iconMapping: Record<string, JSX.Element> = {
  // File extensions
  ".html": <AiOutlineHtml5 className="text-red-500" />,
  ".css": <DiCss3 className="text-blue-500" />,
  ".js": <DiJavascript1 className="text-yellow-500" />,
  ".jsx": <DiReact className="text-blue-500" />,
  ".ts": <SiTypescript className="text-blue-600" />,
  ".tsx": <DiReact className="text-blue-400" />,
  ".json": <BsFileCode className="text-green-500" />,
  ".md": <SiMarkdown className="text-gray-600" />,
  ".yaml": <SiYaml className="text-orange-500" />,
  ".yml": <SiYaml className="text-orange-500" />,
  ".py": <DiPython className="text-blue-400" />,
  ".java": <DiJava className="text-red-600" />,
  ".rb": <DiRuby className="text-red-500" />,
  ".php": <DiPhp className="text-violet-500" />,
  ".c": <BsFileCode className="text-blue-500" />,
  ".cpp": <BsFileCode className="text-blue-700" />,
  ".cs": <IoScanCircleSharp className="text-green-600" />,
  ".go": <SiGo className="text-teal-500" />,
  ".rs": <SiRust className="text-orange-600" />,
  ".swift": <SiSwift className="text-orange-400" />,
  ".kt": <SiKotlin className="text-purple-400" />,
  ".txt": <BsFileEarmarkText className="text-gray-500" />,
  ".pdf": <BsFileEarmarkPdf className="text-red-500" />,
  ".bin": <BsFileBinary className="text-gray-800" />,
  ".lock": <BsFileEarmarkText className="text-gray-600" />,
  "tailwind" : <BiLogoTailwindCss  className=" text-teal-300"/>,
  // Default file icon
  "defaultFile": <FaRegFileAlt className="text-white" />,

  // Folder names
  "node_modules": <AiFillGithub className="text-gray-500" />,
  ".git": <AiFillGithub className="text-gray-600" />,
  "src": <LuFolderCode className="text-green-500" />,
  "public": <FaFolder className="text-blue-500" />,
  "assets": <FaFolder className="text-purple-500" />,
  "components": <TbFolderStar className="text-yellow-500" />,
  "dist": <FaFolder className="text-orange-500" />,
  "build": <FaFolder className="text-yellow-500" />,
  "config": <FaFolder className="text-gray-500" />,
  "scripts": <FaFolder className="text-red-500" />,
  // Default folder icon
  "defaultFolder": <FaFolder className="text-yellow-500" />,
};

export default iconMapping;



export const getIconForItem = (name: string, isFolder: boolean): JSX.Element => {
  if (isFolder) {
    return iconMapping[name] || iconMapping["defaultFolder"];
  }
  const extension = name.substring(name.lastIndexOf(".")); // Get file extension
  return iconMapping[extension] || iconMapping["defaultFile"];
};
