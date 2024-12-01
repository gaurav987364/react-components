/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  config: {
    name: string;
    Component: React.FC<any>;
  }[];
}

const StepperByMe = ({ config }: Props) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const stepRef = useRef<HTMLDivElement[]>([]);
  const [progressBarStyle, setProgressBarStyle] = useState({
    left: 0,
    width: 0,
  });

  const ActiveComponent = config[currentStep - 1].Component;

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === config.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const updateProgressBar = () => {
    if (stepRef.current.length === config.length) {
      const firstStep = stepRef.current[0];
      const lastStep = stepRef.current[config.length - 1];

      if (firstStep && lastStep) {
        const left = firstStep.offsetLeft + firstStep.offsetWidth / 2;
        const right = lastStep.offsetLeft + lastStep.offsetWidth / 2;
        const width = right - left;

        setProgressBarStyle({ left, width });
      }
    }
  };

  useEffect(() => {
    updateProgressBar();
  }, [config.length, stepRef.current]);

  useEffect(() => {
    const handleResize = () => updateProgressBar();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (config.length - 1)) * 100;
  };

  return (
    <div className="bg-purple-300 w-full h-screen px-2 flex items-center justify-center">
      <div className="relative w-[600px] h-[250px] border">
        {/* Step Indicator */}
        <div className="w-full flex h-[30%] mt-2">
        {config?.map((item, index) => {
         const isActive = currentStep === index + 1; 
         // Determine if this step is active
         const isCompleted = currentStep > index + 1 || isComplete; 
         // Determine if this step is completed
                return (
                <div 
                 ref={(iRef) => {
                    // @ts-ignore
                    stepRef.current[index] = iRef;
                }} 
                key={item.name} 
                className="w-full flex items-center flex-col">
                    <span
                    className={`px-3 bg-gray-200 
                        ${isCompleted ? "bg-green-400" : ""}  
                        rounded-full py-1 z-10`}
                    >
                    {isCompleted ? <span>&#10003;</span> : <span className={`${isActive ? "text-blue-500 font-bold" : ""}`}>{index + 1}</span>}
                    </span>
                    <span
                    className={`font-semibold ${
                        isActive ? "text-black" : "text-gray-500/60"
                    }`}
                    >
                    {item.name}
                    </span>
                </div>
                );
            })}
        </div>

        {/* Progress Bar */}
        <div
          className="absolute top-[9%] bg-gray-500 h-[4px]"
          style={{
            left: `${progressBarStyle.left}px`,
            width: `${progressBarStyle.width}px`,
            position: "absolute",
          }}
        >
          <div
            className="h-full bg-green-500"
            style={{
              width: `${calculateProgressBarWidth()}%`,
            }}
          ></div>
        </div>

        {/* Buttons */}
        <div className="w-full flex gap-2 items-center justify-center mt-4">
          <button
            onClick={handleNext}
            className="px-4 py-1.5 rounded-xl cursor-pointer bg-blue-600 font-bold text-white hover:bg-blue-500"
          >
            {currentStep === config.length ? "Finish" : "Next"}
          </button>
        </div>

        {/* Active Component */}
        <ActiveComponent />
      </div>
    </div>
  );
};

export default StepperByMe;
