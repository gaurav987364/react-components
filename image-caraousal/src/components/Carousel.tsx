// first implment the css so that it is responsive;
// following children prop pattren
// navigating buttons 
// indicator also done
// we have to one thing that is we dont use autoplay on simple slider , on simple slider we are simply disabled the navigating buttons so that user cant navigate and dont see janky scrolls; but inidcators m ye fixx nahi kiya hai abhi 
// autoplay logic is only apply on infinite slider
// when user give swipe means touch controls feature
// mouse wheel scrolling 
// thumbnail showing true/false
// 


import React, { useState, Children, useRef, useEffect } from "react";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";

interface Props extends React.PropsWithChildren {
  children?: React.ReactNode;
  autoplay?: boolean | string ;
  interval?: number | undefined; // Interval between slides in milliseconds
  infinite?: boolean | string; // Infinite loop
}

const Carousel: React.FC<Props> = ({ 
    children,
    autoplay = false,
    interval = 4000,
    infinite = true, 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Track current slide
  const [isHovered,setIsHovered] = useState(false);


  const totalSlides = React.Children.count(children);

  const sliderRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  //Button disabled logic
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === totalSlides - 1;

  const slides = Children.map(children, (child) => (
    <div
      key={Math.random()}
      className="flex-shrink-0 w-full h-full flex items-center justify-center bg-slate-900"
    >
      {child}
    </div>
  ));

  // Navigation buttons
  const next = ()=>{
    setCurrentIndex(prev => (prev+1)%totalSlides);
  };
  const prev = ()=>{
    setCurrentIndex(prev => prev === 0? totalSlides - 1 : prev - 1);
  };


  // loop logic
  // duplicate slides

  // autoplay (doing render on every slide change)
  useEffect(()=>{
    if(autoplay && !isHovered){
        const timer = setInterval(() => {
          next();
        }, interval);
        return ()=> clearInterval(timer);
    }
  },[autoplay,isHovered,currentIndex,totalSlides]);

  return (
    <div className="container w-[90%] max-w-[1200px] mx-auto h-[400px] max-md:h-[300px] border rounded cursor-pointer shadow-md shadow-slate-950"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={carouselRef} className="carouselBox relative w-full h-full overflow-hidden">
        {/* Slides Container */}
        <div
          ref={sliderRef}
          className="slider flex h-full transition-transform duration-300 ease-linear"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, 
          }}
        >
         {slides}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute z-50 inset-0 flex items-center justify-between px-2">
          <button 
             onClick={prev} 
             //disabled={isFirstSlide}
             className="text-salmon bg-transparent p-1 rounded-full cursor-pointer disabled:cursor-not-allowed disabled:text-slate-700">
            <BiChevronLeftCircle size={32} 
          />
          </button>
          <button
            onClick={next}
            //disabled={isLastSlide}  // disable next button when it's the last slide
            className="text-salmon bg-transparent p-1 rounded-full cursor-pointer disabled:cursor-not-allowed disabled:text-slate-700"
          >
            <BiChevronRightCircle size={32} />
          </button>
        </div>
      </div>
        {/* //indicators */}
        <div className="flex items-end justify-center mt-1 gap-1">
            {slides?.map((_,i)=>(
                <button
                  key={i}
                  onClick={()=>setCurrentIndex(i)}
                  className={`indicator cursor-pointer flex items-center justify-center w-3 h-3 rounded-full ${currentIndex === i? ' bg-gray-200' : 'bg-gray-700'}`}
                />
            ))}
        </div>
    </div>
  );
};

export default Carousel;
