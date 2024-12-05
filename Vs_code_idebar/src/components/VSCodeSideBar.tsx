import { useState } from "react";

interface DataProps {
  id: number;
  name: string;
  isFolder: boolean;
  childs: DataProps[];
}

const VSCodeSideBar = () => {
  const [data, setData] = useState<DataProps[]>([
    {
      id: 1,
      name: "root",
      isFolder: true,
      childs: [],
    },
  ]);

  const [openFolders, setOpenFolders] = useState<Set<number>>(new Set());

  // Generate a unique ID for each new file/folder
  const generateId = () => Date.now();

  // Toggle folder open/close state
  const toggleFolder = (id: number) => {
    setOpenFolders((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  // Recursive function to add a folder or file
  const addNode = (parentId: number, name: string, isFolder: boolean) => {
    const addRecursively = (nodes: DataProps[]): DataProps[] =>
      nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            childs: [
              ...node.childs,
              {
                id: generateId(),
                name,
                isFolder,
                childs: isFolder ? [] : [],
              },
            ],
          };
        }
        if (node.childs.length > 0) {
          return {
            ...node,
            childs: addRecursively(node.childs),
          };
        }
        return node;
      });

    setData((prevData) => addRecursively(prevData));
  };

  // Recursive function to delete a file by ID
  const deleteNode = (nodeId: number) => {
    const deleteRecursively = (nodes: DataProps[]): DataProps[] =>
      nodes.filter((node) => {
        if (node.id === nodeId) return false; // Delete this node
        if (node.childs.length > 0) {
          node.childs = deleteRecursively(node.childs); // Check children
        }
        return true;
      });

    setData((prevData) => deleteRecursively(prevData));
  };

  const renderFiles = (fileList: DataProps[]) => {
    return fileList.map((file) => (
      <div key={file.id} className="ml-4 flex items-center space-x-2">
        {file.isFolder ? (
          <div>
            <span
              className="cursor-pointer flex items-center space-x-2"
              onClick={() => toggleFolder(file.id)}
            >
              📂 {file.name}
            </span>
            {openFolders.has(file.id) && renderFiles(file.childs)}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span>📄 {file.name}</span>
            <button
              className="text-red-600 hover:underline"
              onClick={() => deleteNode(file.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    ));
  };

  const handleAdd = (isFolder: boolean) => {
    const parentId = parseInt(prompt("Enter Parent Folder ID:") || "1", 10);
    const name = prompt(`Enter ${isFolder ? "Folder" : "File"} Name:`) || "";
    if (name.trim()) {
      addNode(parentId, name, isFolder);
    }
  };

  return (
    <div className="w-1/2 h-screen bg-green-200 p-3">
      <div className="w-full flex justify-between gap-x-1 bg-gray-300 rounded-md px-2 py-2">
        <span className="font-bold text-lg">File Manager</span>
        <div className="space-x-2">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => handleAdd(true)}
          >
            📂 Add 
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            onClick={() => handleAdd(false)}
          >
            📄 Add 
          </button>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-md p-3 shadow-md overflow-auto h-full">
        {renderFiles(data)}
      </div>
    </div>
  );
};

export default VSCodeSideBar;
