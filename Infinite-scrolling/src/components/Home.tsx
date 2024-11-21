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
    }

    useEffect(()=>{
        window.addEventListener("scroll", handelInfiniteScroll)

        return ()=>{
            window.removeEventListener("scroll", handelInfiniteScroll)
        }
    },[])
  return (
    <div className="home">
        {data?.map((item,i)=>(
          <Card data={item} key={i}/>
        ))}
    </div>
  )
}

export default Home