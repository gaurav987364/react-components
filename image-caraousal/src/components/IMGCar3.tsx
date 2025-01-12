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

//     const controller = (mode:string)=>{
//         if(mode === "Prev"){
//            if(current <= 1){
//             setTranslateX(0);
//             setCurrnet(children?.length);
//            } else {
//             setTranslateX(containerRef.current?.clientWidth* (current-1))
//             setCurrnet(prev => --prev )
//            }
//         } else if(mode === "Next"){
//            if(current >= children?.length){
//             setTranslateX(containerRef.current?.clientWidth * (children?.length + 1))
//             setCurrnet(1);
//            } else {
//             setTranslateX(containerRef.current?.clientWidth* (current+1))
//             setCurrnet(prev => ++prev )
//            }
//         }
//     }


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
//             <button onClick={()=>controller("Prev")}>Prev</button>
//             <button onClick={()=>controller("Next")}>Next</button>
//         </div>
//     </div>
//   )
// }

// export default IMGCar3



import React, { useMemo, useRef, useState, useEffect, useCallback, memo } from 'react';
import { Children } from 'react';

type Props = {
  children: React.ReactNode[];
};

const InfiniteCarousel: React.FC<Props> = ({ children }) => {
    console.log("render")
  // Total number of slides (excluding duplicates)
  const totalSlides = children?.length ?? 0;

  // Create slides with duplicates (prepend last slide, append first slide)
  const slides = useMemo(() => {
    if (totalSlides > 1) {
      const items = Children.map(children, (child, index) => (
        <li
          className="w-full h-full flex-shrink-0 flex items-center justify-center bg-white shadow-md"
          key={index}
        >
          {child}
        </li>
      ));

      return [
        <li
          className="w-full h-full flex-shrink-0 flex items-center justify-center bg-white shadow-md"
          key={totalSlides + 1}
        >
          {children[totalSlides - 1]}
        </li>,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ...items,
        <li
          className="w-full h-full flex-shrink-0 flex items-center justify-center bg-white shadow-md"
          key={totalSlides + 2}
        >
          {children[0]}
        </li>,
      ];
    }

    // If only one child, no need for duplicates
    return [
      <li
        className="w-full h-full flex-shrink-0 flex items-center justify-center bg-white shadow-md"
        key={0}
      >
        {children[0]}
      </li>,
    ];
  }, [children, totalSlides]);

//   console.log(slides)

  const [currentIndex, setCurrentIndex] = useState(1); // Start from the first "real" slide
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  //Handle auto-scroll with a timer
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 8000); // Scroll every 3 seconds
//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

  // Go to the next slide
  const nextSlide = useCallback(()=>{
    if (isAnimating) return; // Prevent overlapping transitions
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  },[isAnimating])

  // Go to the previous slide
  const prevSlide = () => {
    if (isAnimating) return; // Prevent overlapping transitions
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Handle transition end for infinite scrolling
  const handleTransitionEnd = () => {
    setIsAnimating(false);

    // Reset to first "real" slide after the last duplicate
    if (currentIndex === totalSlides + 1) {
      setCurrentIndex(1); // Jump to the first real slide (without animation)
      carouselRef.current?.classList.add('no-transition'); // Temporarily disable transition
    }

    // Reset to last "real" slide after the first duplicate
    if (currentIndex === 0) {
      setCurrentIndex(totalSlides); // Jump to the last real slide (without animation)
      carouselRef.current?.classList.add('no-transition'); // Temporarily disable transition
    }
  };

  // Remove the no-transition class on re-render
  useEffect(() => {
    if (carouselRef.current?.classList.contains('no-transition')) {
      requestAnimationFrame(() => {
        carouselRef.current?.classList.remove('no-transition');
      });
    }
    // Reset transition after re-render
    return () => {
      carouselRef.current?.classList.remove('no-transition');
    };
    // Only re-render when currentIndex changes
  }, [currentIndex]);

  return (
    <div className="relative w-[500px] h-[300px] overflow-hidden bg-gray-200">
      {/* Carousel track */}
      <div
        ref={carouselRef}
        className={`flex transition-transform duration-500 ${
          isAnimating ? '' : 'duration-0'
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides}
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-600"
        onClick={prevSlide}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-600"
        onClick={nextSlide}
      >
        &gt;
      </button>
    </div>
  );
};

export default memo(InfiniteCarousel);



