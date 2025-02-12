import React, { Dispatch, memo, SetStateAction, useEffect, useRef, } from "react";

type RangeSliderType = {
  min: number;
  max: number;
  onChange?: Dispatch<SetStateAction<number[]>>;
  value?: number[];
  step?: number;
}


const RangeSlider : React.FC<RangeSliderType> = ({
  min = 0,
  max = 0,
  onChange,
  value = [min, max],
  step = 1,
}) => {
  const [minValue, setMinValue] = React.useState(value[0]);
  const [maxValue, setMaxValue] = React.useState(value[1]);
  const [minDisplay, setMinDisplay] = React.useState(value[0]);
  const [maxDisplay, setMaxDisplay] = React.useState(value[1]);

  const tackRef = useRef<HTMLDivElement | null>(null);
  const minInputRef = useRef<HTMLInputElement | null>(null);
  const maxInputRef = useRef<HTMLInputElement | null>(null);

  const minDisplayRef = useRef<HTMLDivElement | null>(null);
  const maxDisplayRef = useRef<HTMLDivElement | null>(null);

  const zIndexMin = '10';
  const zIndexMax = '20';

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(minInputRef && minInputRef.current && maxInputRef && maxInputRef.current){
      minInputRef.current.style.zIndex = zIndexMin;
      maxInputRef.current.style.zIndex = zIndexMax;
    }
    const newValue = Number(e.target.value);
    if(newValue <= maxValue){
      setMinValue(newValue)
      setMinDisplay(newValue)
      onChange?.([newValue,maxValue]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(minInputRef && minInputRef.current && maxInputRef && maxInputRef.current){
      minInputRef.current.style.zIndex = zIndexMin;
      maxInputRef.current.style.zIndex = zIndexMax;
    }
    const newValue = Number(e.target.value);
    if(newValue >= minValue){
      setMaxValue(newValue)
      setMaxDisplay(newValue)
      onChange?.([minValue,newValue]);
    }
  };



  useEffect(()=>{
    if(tackRef && tackRef.current){
      const minLeft = `${((minValue - min) / (max - min))*100}%`;
      const maxLeft = `${((max - maxValue) / (max - min))*100}%`;
      tackRef.current.style.left = minLeft;
      tackRef.current.style.right = maxLeft;
    }
  },[max, min, maxValue, minValue]);
  return (
    <div className=" container w-full p-5">
      <div className="slider relative h-1 bg-white rounded-full">
        <div ref={tackRef} className="track h-full absolute bg-pink-500"/>
        <input 
         type="range"
         min={min}
         max={max}
         step={step}
         value={minValue}
         ref={minInputRef}
         name="min"
         className="input absolute w-full bg-transparent  top-[50%]  translate-y-[-50%] appearance-none p-0 m-0 pointer-events-auto"
         onChange={handleMinChange}
        />
        <input 
         type="range"
         min={min}
         max={max}
         step={step}
         value={maxValue}
         ref={maxInputRef}
         name="max"
         className="input absolute w-full bg-transparent  top-[50%] translate-y-[-50%] appearance-none p-0 m-0 pointer-events-auto"
         onChange={handleMaxChange}
        />
      </div>
      <div className="display mt-5">
        <div className="min-display" ref={minDisplayRef} style={{zIndex: zIndexMin}}>{minDisplay}</div>
        <div className="max-display" ref={maxDisplayRef} style={{zIndex: zIndexMax}}>{maxDisplay}</div>
      </div>
    </div>
  )
}

export default memo(RangeSlider);






