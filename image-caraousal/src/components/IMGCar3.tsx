// import React, { Children, useLayoutEffect, useMemo, useState } from 'react'
// interface Props extends React.PropsWithChildren {
//     title?: string;
//     image?: string;
//     description?: string;
//     children?:React.ReactNode
// }
// const IMGCar3:React.FC<Props> = ({children}) => {
//     const [current,setCurrnet] = useState<number>(1);
//     const [translateX,setTranslateX] = useState<number>(0);
//     const containerRef = React.useRef<HTMLDivElement>(null);



//     const slides = useMemo(()=>{
//         if(children?.length > 1){
//             const items = Children.map(children, (child,index)=>(
//                 <li className='min-w-[500px] h-[300px] flex-shrink-0 flex items-center justify-center bg-white shadow-md' key={index}>{child}</li>
//             ));
//             return [
//             <li className='min-w-[500px] h-[300px] flex-shrink-0 flex items-center justify-center bg-white shadow-md' key={children.length + 1}>
//                 {children[children.length -1]}
//             </li>, 
//             ...items, 
//             <li className='min-w-[500px] h-[300px] flex-shrink-0 flex items-center justify-center bg-white shadow-md' key={children.length + 2}>
//                 {children[0]}
//             </li>
//         ]
//         };
//         return <li className='min-w-[500px] h-[300px] flex-shrink-0 flex items-center justify-center bg-white shadow-md'>{children[0]}</li>
//     },[children]);

//     console.log(containerRef.current?.clientWidth*current)
//     useLayoutEffect(()=>{
//         setTranslateX(containerRef.current?.clientWidth*current);
//     },[])
//   return (
//     <div className='w-[500px] h-[300px] overflow-hidden relative'>
//         <div ref={containerRef} className=' relative flex list-none items-center h-full transition-transform duration-500' style={{transform:`translate3d(${-translateX}px,0,0)`}}>
//           {slides}
//         </div>
//         <div className=' absolute inset-0 flex items-center justify-between px-1'> 
//         </div>
//     </div>
//   )
// }

// export default IMGCar3




import React, { useEffect, useRef } from "react";

const IMGCar3: React.FC = () => {
  console.log("render")
  const sliderRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const moveSlide = (direction: "next" | "prev") => {
    const slider = sliderRef.current;

    if (slider) {
      if (direction === "next") {
        // Move to the next slide
        carouselRef.current!.style.justifyContent = "flex-start";
        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = "translateX(-20%)"; // Move left

        // After the animation, append the first slide to the end
        setTimeout(() => {
          slider.appendChild(slider.firstElementChild!);
          slider.style.transition = "none"; // Disable transition temporarily
          slider.style.transform = "translateX(0)"; // Reset position
        }, 500); // Wait for the transition to complete
      } else if (direction === "prev") {
        // Move to the previous slide
        carouselRef.current!.style.justifyContent = "flex-end";
        slider.style.transition = "none"; // Disable transition for DOM manipulation
        slider.prepend(slider.lastElementChild!); // Move the last slide to the front
        slider.style.transform = "translateX(-20%)"; // Set position for smooth animation

        // Enable transition and reset position
        setTimeout(() => {
          slider.style.transition = "transform 0.5s ease-in-out";
          slider.style.transform = "translateX(0)";
        }, 0); // Apply transition immediately
      }
    }
  };

  useEffect(() => {
    // Ensure the slider is in the correct position initially
    const slider = sliderRef.current;
    if (slider) {
      slider.style.transform = "translateX(0)";
    }
  }, []);

  return (
    <div className="container w-[80%] mx-auto my-5 h-[300px] overflow-hidden">
      {/* Carousel Wrapper */}
      <div
        ref={carouselRef}
        className="relative carousel w-full h-full border border-black flex justify-start"
      >
        {/* Slider */}
        <div
          ref={sliderRef}
          className="slider flex h-full w-[500%] flex-shrink-0 transition-transform duration-500 ease-linear"
        >
          {/* Slides */}
          {[...Array(5)].map((_, index) => (
            <section
              key={index}
              className="basis-[20%] w-[20%] flex-shrink-0 flex-1 flex items-center justify-center bg-gray-200 text-black"
            >
              Section {index + 1}
            </section>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <button
            className="bg-gray-800 text-white p-2 rounded hover:bg-gray-600"
            onClick={() => moveSlide("prev")}
          >
            Prev
          </button>
          <button
            className="bg-gray-800 text-white p-2 rounded hover:bg-gray-600"
            onClick={() => moveSlide("next")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default IMGCar3;
