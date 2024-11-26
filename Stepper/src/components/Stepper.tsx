/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"


interface Props{
    configs: object[]
}

const Stepper = ({configs}:Props) => {
    const [currentStep, setCurrentStep] =  useState<number>(1);
    const [isComplete, setIsComplete] = useState(false);


    if(!configs.length){
        return <></>;
    }
  return (
    <>
    <div className="stepper">
       {configs.map((step:any,idx)=>(
         <div key={step?.name} className={`step ${currentStep>idx+1 || isComplete? "complete":""} ${currentStep === idx+1 ? "active" : ""}`}>
            <span className="step-number">{idx+1}</span>
            <span className=" step-name">{step.name}</span>
         </div>
       ))}
    </div>

    {!isComplete && (
        <button className="btn" onClick={()=>{}}>
        {currentStep === configs.length ? "Finish" : "Next"}
        </button>
    )}
    </>
  )
}

export default Stepper