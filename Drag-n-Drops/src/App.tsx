import FileUp from "./components/FileUp"


const App = () => {
  return (
    <div className=" w-full h-screen bg-gray-300 mx-auto flex justify-center py-2">
      <FileUp
       showError={true}
       multiple={true}
      />
    </div>
  )
}

export default App