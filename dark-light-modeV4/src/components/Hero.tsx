import React, { useState } from 'react'

const Hero = () => {
    const [cards,setCards] = useState([]);
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [badge,setBadge] = useState("");

    const addCard = ()=>{
        const newCard = {title, desc, badge};
        setCards(prev => [...prev, newCard])
        setTitle("")
        setDesc("")
        setBadge("")
    };

    const deleteCard = (index)=>{
        const filterCards = cards?.filter((cards,id)=> id !== index );
        setCards(filterCards)
    }
  return (
    <div>
        <div className=' text-center'>Card App.</div>
        <div className=' mt-2 flex items-center justify-center gap-x-2 it'>
        <label htmlFor="Title">
            Title
        </label>
         <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter Name' className=' border rounded ml-2'/>
        <label htmlFor="Title">
            Description
        </label>
         <input value={desc} onChange={(e)=>setDesc(e.target.value)} type="text" placeholder='Enter Description' className=' border rounded ml-2'/>
        <label htmlFor="Title">
            Badge
        </label>
         <input value={badge} onChange={(e)=>setBadge(e.target.value)} type="text" placeholder='Enter Badge' className=' border rounded ml-2'/>
        </div>
        <button className='' onClick={addCard}>Add Card</button>

        <div className=' w-full h-full flex items-center gap-2 flex-wrap'>
            {cards?.map((card, idx)=>(
               <div className=' h-full flex items-center gap-2'>
                 <div key={idx} className=' w-60 h-30 border bg-gray-200 rounded px-2 relative'>
                    <h1 className=' text-xl font-semibold'>Title: {card.title}</h1>
                    <p className=' text-md text-gray-700 mt-3'>Description: {card.desc}</p>
                    <span className=''>Badge: {card.badge}</span>
                    <button onClick={()=>deleteCard(idx)} className=' absolute right-1 bottom-1 px-2 py-0.5 bg-red-400 rounded-lg text-white'>Delete</button>
                </div>
               </div>
            ))}
        </div>
    </div>
  )
}

export default Hero