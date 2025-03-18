import SelectGrid from "./components/SelectGrid"

const App = () => {
  return (
    <div className=" w-full h-screen flex items-center justify-center bg-[#B5E2FA]">
      <SelectGrid
       rows={5}
       cols={5}
       selectColor={"purple"}
      />
    </div>
  )
}

export default App