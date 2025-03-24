import FileUp from "./components/FileUp"


const App = () => {
  return (
    <div className=" w-full h-screen bg-gray-300 mx-auto flex justify-center py-2">
      <FileUp
       multiple={true}
      />
    </div>
  )
}

export default App