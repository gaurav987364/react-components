import { useState } from "react";
import StarRating from "./components/StarRating";

const App = () => {
  const [ratingCount, setRatingCount] = useState(0);
  const handleRatingChange = (count : number) => {
    setRatingCount(count);
    console.log(`User give rating ${ratingCount}`);
  }
  return (
    <div className=" bg-slate-800 w-full h-screen flex items-center justify-center p-1">
      <StarRating 
        length={5} 
        size={30} 
        color={"yellow"} 
        onRate={handleRatingChange} 
        ratingCount={ratingCount}
      />
    </div>
  )
}

export default App;