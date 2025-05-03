import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/GamePage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/gamepage" element={<GamePage/>}/>
       </Routes>
     </BrowserRouter>
      <Toaster
        reverseOrder={false}
        position="top-center"
      />
    </>
  )
}

export default App;