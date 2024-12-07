import { useState } from "react"
interface Cm {
  id: number;
  text: string;
  replies: Cm[];
}
const Comments = () => {
  const [comments, setComments] = useState<Cm[]>([
    {
      id:1,
      text:"Hey how are you...",
      replies:[
        {
          id:2,
          text:"I'm fine...",
          replies:[]
        }
      ]
    }
  ]);
  const [input, setInput] = useState<string>("");
  const [replyID,setReplyID] = useState<number | null>(null);
  const [editId,setEditId] = useState<number | null>(null);
  const [editText,setEditText] = useState<string>("");

  const addNewComments = ()=>{
    if(!input.trim()) return;

    const newComment :Cm = {
      id:Date.now(),
      text:input,
      replies:[]
    }

    let updatedComments :Cm[];
    if(replyID){
      updatedComments = addReply(comments, replyID,newComment)
    } else{
      updatedComments = [...comments, newComment]
    }
    setComments(updatedComments);
    setInput("");
    setReplyID(null);
  };
  const addReply = (
    commentList:Cm[],
    parentID:number | null,
    reply:Cm
  ) : Cm[]=>{
    return commentList.map((comment)=>{
      if(comment.id === parentID){
        return {...comment,replies : [...comment.replies, reply]}
      }
      return {...comment, replies : addReply(comment.replies,parentID,reply)}
    })
  };

  const handelEdit = (id:number, text:string)=>{
    setEditId(id);
    setEditText(text);
  }
  const saveEditComments = ()=>{
    if(!editText.trim()) return;
    const updatedComments = editComments(comments, editId, editText);
    setComments(updatedComments);
    setEditId(null);
    setEditText("");
  }
  const editComments = (
    commentList:Cm[],
    parentID:number | null,
    text: string
  ) : Cm[]=>{
    return commentList.map((comment)=>{
      if(comment.id === parentID){
        return {...comment, text:text}
      } 
      return {...comment, replies:editComments(comment.replies, parentID, text)}
    })
  };
  const deleteComments = (id:number)=>{
    const updatedComments = deleteComment(comments,id);
    setComments(updatedComments);
  };

  const deleteComment = (commentList:Cm[],id:number) : Cm[]=>{
    return commentList.filter((comment)=> comment.id !== id)
    .map((comment)=>(
      {...comment, replies: deleteComment(comment.replies,id,)}
    ))
  }

  const rendorComments = (cm: Cm[])=>{
    return cm?.map((comment)=>{
     return (
      <>
       <div key={comment.id} className=" text-black ml-4 border-l-[2px] border-black pl-2 my-2">
        <span>{comment.text}</span>
        {editId === comment.id && (
          <div className=" flex w-full items-center">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-1/2 rounded px-2"
            />
            <button onClick={saveEditComments}>Save</button>
          </div>
        )}
        <div className=" flex  ml-2 gap-1">
          <button onClick={()=>handelEdit(comment.id, comment.text)}>Edit</button>
          <button onClick={()=>setReplyID(comment.id)}>Reply</button>
          <button onClick={()=>deleteComments(comment.id)}>Delete</button>
        </div>
        {replyID === comment.id && (
          <div>
             <textarea value={input} onChange={(e)=>setInput(e.target.value)} className=" w-full rounded px-2" placeholder="write your comments..."/>
             <button onClick={addNewComments} className=" text-black px-5 py-1 bg-blue-400 rounded cursor-pointer">Reply Comments</button>
          </div>
        )}
        <div>{rendorComments(comment.replies)}</div>
       </div>
      </>
     )
    })
  };
  return (
    <div className=" w-full h-auto  bg-green-300 px-5">
      <h1 className=" text-black text-xl">Nexted Comments System</h1>
      <div>
        <textarea value={input} onChange={(e)=>setInput(e.target.value)} className=" w-full rounded px-2" placeholder="write your comments..."/>
        <button onClick={addNewComments} className=" text-black px-5 py-1 bg-blue-400 rounded cursor-pointer">Add Comments</button>
      </div>
      <div>{rendorComments(comments)}</div>
    </div>
  )
}

export default Comments