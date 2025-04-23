import Dp from "./components/dp"
import DropDown from "./components/DropDown"
import DropdownItem from "./components/DropdownItem"

const items = [1,2,3,4,5,6,7,8,9,10]
const App = () => {
  return (
    <div className=" w-full min-h-screen flex items-center justify-center bg-slate-200 relative">
      {/* <DropDown 
        content={
          items.map(item => (<DropdownItem key={item}>{item+"hello"}</DropdownItem>))
        } 
        titleBtn={"Dropdown Menu"} 
      /> */}
      <Dp/>
    </div>
  )
}

export default App