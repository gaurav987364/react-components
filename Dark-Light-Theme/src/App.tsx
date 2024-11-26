import Theme from "./components/Theme"
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <div className=" w-full h-screen bg-gray-200 dark:bg-slate-700 p-2">
        <Theme/>
        <h1 className=" dark:text-white">Gaurav</h1>
      </div>
    </ThemeProvider>
  )
}

export default App;