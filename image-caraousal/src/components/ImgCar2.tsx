import React, { useState, useEffect, } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "tailwindcss/tailwind.css";

interface Image {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: Image[];
  autoplay?: boolean;
  interval?: number;
  loop?: boolean;
  showThumbnails?: boolean;
  onImageClick?: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoplay = false,
  interval = 2000,
  loop = true,
  showThumbnails = false,
  onImageClick,
}) => {
    // state management for current index and hover state
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isHovered,setIsHovered] = useState<boolean>(false);

    const handelNext = ()=>{
        setCurrentIndex((prev)=> (prev+1)%images.length);
    };

    const handelPrev = ()=>{
        setCurrentIndex((prev)=> (prev-1+images.length) % images.length);
    }

    
    //? autoplay and pause logic
    useEffect(()=>{
        if(autoplay && !isHovered){
        const timer = setInterval(() => {
                setCurrentIndex((prev)=> (prev+1)%images.length);
            }, interval);
            return ()=> clearInterval(timer);
        }
    },[autoplay,interval,isHovered,currentIndex,images.length]);
  return (
    <>
    <div className=" w-[700px] h-[400px] relative overflow-hidden cursor-pointer"
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
    >
        <div className=" w-full h-full flex items-center transition-transform ease-in-out duration-500" style={{transform:`translateX(-${currentIndex*100}%)`}}>
        {images?.map((img,idx) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className={` min-w-full h-full object-cover object-center inset-0 transition-opacity duration-500 ease-linear ${idx===currentIndex ? "opacity-100 z-10" : " opacity-10 z-0"}`}
            />
        ))}
        </div>
        {/* buttons */}
        <div className=" absolute inset-0 flex items-center justify-between">
            <button onClick={handelPrev}>
                <BiChevronLeft 
                    fill="black" 
                    size={40} 
                    className=" p-2 bg-gray-100/60 rounded-full"
                />
            </button>
            <button onClick={handelNext}>
                <BiChevronRight 
                    fill="black" 
                    size={40} 
                    className=" p-2 bg-gray-100/60 rounded-full"
                />
            </button>
        </div>
    </div>
    {/* indicators */}
    <div className=" flex gap-1 mt-1">
        {images?.map((_,index)=>(
           <button 
           key={index} 
           className={`h-3 w-3 cursor-pointer rounded-md bg-gray-400 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] ${
            index === currentIndex ? " opacity-100" : "opacity-50"
          }`}
           onClick={()=>setCurrentIndex(index)}
           />
        ))}
    </div>
    </>
  );
};

export default Carousel;
