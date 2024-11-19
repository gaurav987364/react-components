import Otp from "./components/Otp"

const App = () => {
  return (
    <div className=" w-full h-screen bg-slate-300 flex items-center justify-center p-3">
      <Otp count={4}/>
    </div>
  )
}

export default App