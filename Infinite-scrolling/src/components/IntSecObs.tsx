import { useEffect, useRef } from "react"

const IntSecObs = () => {
    const nameRef = useRef<HTMLHeadingElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(()=>{
        const observer = new IntersectionObserver(([entries])=>{
            console.log(entries);
            if(entries.isIntersecting){
                entries.target.classList.add("color");
                observer.unobserve(entries.target); // Stop observing after first intersection
                observer.disconnect(); // Stop observing after first intersection
            }
            else{
                entries.target.classList.remove("color");
            }
        },{
            threshold:0.7, // 70% of the element should be visible
            rootMargin: "-150px"
        });

        if(nameRef.current){
            observer.observe(nameRef.current);
        }
        if(imgRef.current){
            observer.observe(imgRef.current);
        }

        return ()=>{
            if(nameRef.current){
                observer.unobserve(nameRef.current);
            }
            if(imgRef.current){
                observer.unobserve(imgRef.current);
            }
        }
    },[]);
  return (
    <div>
        <h1 ref={nameRef}>Gaurav</h1>
        <img ref={imgRef} width={200} height={300} src="https://images.pexels.com/photos/30774440/pexels-photo-30774440/free-photo-of-charming-cobblestone-street-in-tallinn-s-old-town.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="city" />
    </div>
  )
}

export default IntSecObs