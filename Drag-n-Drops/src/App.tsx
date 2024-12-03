import FileUpload, { filetype } from "./components/FileUpload"

const App = () => {
  const getFiles = (files : filetype[])=>{
    console.log(files);
    // You can process the files here.
  }
  return (
    <div className=" w-full h-screen bg-gray-300 mx-auto flex justify-center py-2">
      <FileUpload getFiles={(files)=> getFiles(files)}/>
    </div>
  )
}

export default App