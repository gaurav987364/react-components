import React, { useEffect, useState } from "react"
import LinearProgress from "./components/LinearProgress"
import CircularProgress from "./components/CircularProgress"
// import IndeterminateProgress from "./components/IndeterminateProgress"
import ProgressBar from "./components/ProgressBar"

const App = () => {
  const [progress, setProgress] = useState(0);

  const getDynamicProgress = (duration : number,steps:number) => {
    let progress = 0;
    const interval = duration / 100;
    const intervalId = setInterval(() => {
        console.log(`Progress: ${progress}%`);
        progress += steps;
        setProgress(progress);
        if (progress > 99) {
            clearInterval(intervalId);
        }
    }, interval);
    return intervalId;
  };
  useEffect(()=>{
    const intervalId = getDynamicProgress(9000,4);
    return ()=> clearInterval(intervalId);
  },[]);



  return (
    <React.Fragment>
      <div className=" p-5 w-full h-screen">
       <ProgressBar 
        progress={progress}  
        showValue 
        showLabel 
        label="Progress Bar"
        progressColor="purple"
       />
       {/* <ProgressBar indeterminate/> */}

        <LinearProgress
          variant="linear"
          value={progress}
          size="xl"
          color="bg-pink-500"
          showValue
          label={(value) => `${value}%`}
          className="rounded-full"
        />

      <CircularProgress value={progress} />
      <CircularProgress 
        value={progress}
        size="lg"
        color="text-green-500"
        strokeWidth={6}
        showValue
      />
      <CircularProgress
        value={progress}
        size="sm"
        color="text-purple-500"
        className="border-4 border-gray-100 rounded-full"
        showValue
        label={<span className="text-sm font-bold text-purple-500">900%</span>}
      />

      {/* <IndeterminateProgress
        // variant="indeterminate"
        className="h-2 bg-gray-200 rounded-full"
      >
        <div className="w-1/2 h-full bg-blue-500 progress-indeterminate rounded-full" />
      </IndeterminateProgress> */}
      </div>
    </React.Fragment>
  )
}

export default App