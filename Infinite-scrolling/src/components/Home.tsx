/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import Card from "./Card";

type Post = {
    id: number;
    title: string;
    body: string;
};
const Home = () => {
    const [data, setData] =  useState<Post[]>([]);
    const [page, setPage] = useState(1);

    console.log("scroll is firedd") // test throttle time
    const getCardData = async ()=>{
       try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`);

        const d:Post[] = await res.json();

        setData((prev) => [...prev, ...d]);
       } catch (error) {
        console.log(error)
        throw error;
       }
    };

    useEffect(()=>{
        getCardData();
    },[page]);

    const handelInfiniteScroll = async ()=>{
        // console.log("window" + document.documentElement.scrollHeight)
        // console.log("window Inner height" + window.innerHeight)
        // console.log("Scroll Top" + document.documentElement.scrollTop)
        try {
           if( window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
            setPage((prev) => prev + 1)
           }
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const throttle = (func :any, delay: number) => {
        let timer: any;
        let lastRan: number;
      
        return (...args: any) => {
          const context = null;
          if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
          } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
              if (Date.now() - lastRan >= delay) {
                func.apply(context, args);
                lastRan = Date.now();
              }
            }, delay - (Date.now() - lastRan));
          }
        };
      };
      

      useEffect(() => {
        const throttledScroll = throttle(handelInfiniteScroll, 200); // 200ms limit
        window.addEventListener("scroll", throttledScroll);
      
        return () => {
          window.removeEventListener("scroll", throttledScroll);
        };
      }, []);
      
  return (
    <div className="home">
        {data?.map((item,i)=>(
          <Card data={item} key={i}/>
        ))}
    </div>
  )
}

export default Home;