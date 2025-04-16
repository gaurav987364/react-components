import Header from "./components/Header";
import Home from "./components/Home";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <main className=" w-full min-h-screen bg-neutral-100 dark:bg-slate-900 duration-200 relative isolate">
       <Header/>
       <Home/>
      </main>
    </ThemeProvider>
  )
}

export default App;