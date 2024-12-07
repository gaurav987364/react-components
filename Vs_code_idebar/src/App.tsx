import Folder from "./components/Folder"
import VSCodeSideBar from "./components/VSCodeSideBar"

const App = () => {
  return (
    <div className=" w-full h-screen bg-sky-950 text-neutral-50 p-3">
      {/* <VSCodeSideBar/> */}
      <Folder/>
    </div>
  )
}

export default App