import React from "react";
import LinearProgress from "./components/LinearProgress"
import CircularProgress from "./components/CircularProgress"
// import IndeterminateProgress from "./components/IndeterminateProgress"
import ProgressBar from "./components/ProgressBar"
import { useProgressInc } from "./hooks/useProgressInc";
// import { useProgressDec } from "./hooks/useProgressDec";
// import FileUploadStatus from "./components/FileUploadStatus"

const App = () => {
  const progress = useProgressInc(4000,2);
  // const progress = useProgressDec(4000,true);
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

        <CircularProgress 
        value={50}
        showValue 
        strokeWidth={3}
        label={(value)=> `${value}%`}
        />
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

      {/* <FileUploadStatus/> */}
      </div>
    </React.Fragment>
  )
}

export default App