/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useRef, useState} from "react";

interface Props {
  configs: {
    Component: React.FC<any>;
    name: string;
  }[];
}
const CheckoutStepper = ({configs} : Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[configs.length - 1].offsetWidth / 2,
    });
  }, [stepRef, configs.length]);

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === configs.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (configs.length - 1)) * 100;
  };

  const ActiveComponent = configs[currentStep - 1]?.Component;
  if (!configs.length) {
    return <></>;
  }
  return (
    <>
      <div className="stepper">
        {configs.map((step:any, index:number) => {
          return (
            <div
              key={step.name}
              // @ts-expect-error
              ref={(el) => (stepRef.current[index] = el)}
              className={`step ${
                currentStep > index + 1 || isComplete ? "complete" : ""
              } ${currentStep === index + 1 ? "active" : ""} `}
            >
              <div className="step-number">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-name">{step.name}</div>
            </div>
          );
        })}

        <div
          className="progress-bar"
          style={{
            width: `calc(100%-${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{width: `${calculateProgressBarWidth()}%`}}
          ></div>
        </div>
      </div>

      <ActiveComponent />

      {!isComplete && (
        <button className="btn" onClick={handleNext}>
          {currentStep === configs.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

export default CheckoutStepper;