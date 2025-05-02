import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Wordle from "./components/Wordle";

const App = () => {
  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/game" element={<Wordle/>}/>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App;