import { useState } from "react"
import Comments from "./Comentgpt";
interface Comments {
    id: number;
    text: string;
    replies: Comments[];
}

const NestedComm = () => {
    const [comments, setComments] = useState<Comments[]>([
        {
            id:1,
            text:"This is a comment 1",
            replies:[
                {
                    id:2,
                    text:"Reply 1",
                    replies:[]
                }
            ]
        }
    ]);
    const [input, setInput] =  useState<string>("");
    const [addReplyID, setAddReplyID] = useState<number | null>(null);
    const [editId, setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>("");

    //? setter, caller, worker
    //add comment and reply to
    const handelAddComments = ()=>{
        if(!input.trim()) return;

        const newCommentObject : Comments = {
            id:Date.now(),
            text:input,
            replies:[]
        }
        //? this is we do only for one comment;
        // const updatedComments: Comments[] = [...comments, newCommentObject];

        //? we do for add reply also;
        let updatedComments: Comments[];

        if(addReplyID){
            updatedComments = handleAddReply(comments, addReplyID, newCommentObject)
        } else {
            updatedComments = [...comments, newCommentObject];
        }
        setComments(updatedComments);
        setInput("");
        setAddReplyID(null);
    };

    const handleAddReply = (
        commentList : Comments[],
        parentId : number,
        reply : Comments
    ) : Comments[]=>{
        return commentList?.map((comment)=> {
            if(comment.id === parentId){
                return {...comment, replies: [...comment.replies, reply]}
            }
            return {...comment, replies:handleAddReply(comment.replies, parentId, reply)}
        })
    };
    
    //delete
    const handleDelete = (id: number) => {
        const updatedComments = deleteComment(comments, id);
        setComments(updatedComments);
    };

    const deleteComment = (
        commentList : Comments[],
        id: number
    ):Comments[]=>{
        return commentList?.filter((comment)=> comment.id !== id)
        .map((comment)=>(
            {...comment, replies: deleteComment(comment.replies, id)}
        ))
    };

    //edit
    const handelEdit = (id:number, text:string)=>{
        setEditId(id);
        setEditText(text);
    };

    const handelSaveEdit = ()=>{
        if(!editText.trim()) return;

        const updatedComment = editComment(comments, editId, editText);
        setComments(updatedComment);
        setEditId(null);
        setEditText("");
    };

    const editComment = (
        commentList : Comments[],
        id: number | null,
        text: string
    ): Comments[]=>{
        return commentList?.map((comment)=>{
            if(comment.id === id){
                return {...comment, text:text}
            }
            return {...comment, replies: editComment(comment.replies, id, text)}
        })
    };

    const renderComments = (commentList : Comments[])=>{
        return commentList?.map((comment)=>(
            <div key={comment.id} className="ml-4 my-2 pl-2 border-l-[2px] border-red-500">
                {editId === comment.id ? (
                    <div>
                        <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full border rounded p-2"
                        />
                        <button
                        onClick={handelSaveEdit}
                        className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                        >
                        Save
                        </button>
                    </div>
                ) : (
                 <div>
                    <span className=" text-lg line-clamp-1 font-mono">{comment?.text}</span>
                    <div className=" mt-5 flex max-sm:flex-wrap max-sm:py-1 max-sm:gap-y-2">
                        <button onClick={()=>handelEdit(comment.id, comment.text)} className=" px-3 py-0.5 bg-yellow-500 rounded-lg ml-1 cursor-pointer font-semibold">
                            Edit
                        </button>

                        <button onClick={()=>setAddReplyID(comment.id)} className=" px-3 py-0.5 bg-green-500 rounded-lg ml-1 cursor-pointer font-semibold">
                            Reply
                        </button>

                        <button onClick={()=>handleDelete(comment.id)} className=" px-3 py-0.5 bg-red-500 rounded-lg ml-1 cursor-pointer font-semibold">
                            Delete
                        </button>
                    </div>
                    {addReplyID === comment.id && (
                         <div className=" mt-2 ml-1 flex items-center gap-1">
                         <textarea 
                             value={input}
                             onChange={(e)=>setInput(e.target.value)}
                             className=" w-1/2 rounded-lg p-2 mb-2" 
                             placeholder= "Add Reply..."
                         />
                         <button 
                             onClick={handelAddComments} 
                             className=" px-4 py-1.5 bg-blue-400 rounded-lg cursor-pointer"
                         >
                         Reply
                         </button>
                     </div>   
                    )}
                </div>
                )} 
               
                <div>{renderComments(comment?.replies)}</div>
            </div>
        ))
    };
  return (
    <div className=" p-4 w-full h-full bg-purple-300">
        <h1 className=" text-2xl font-semibold">Nested Comments.</h1>
        <div>
            <textarea 
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                className=" w-full rounded-lg p-2 mb-2" 
                placeholder= "write a new comment..."
            />
            <button 
                onClick={handelAddComments} 
                className=" px-4 py-1.5 bg-blue-400 rounded-lg cursor-pointer"
            >
            New Comment
            </button>
        </div>    
        <div className=" mt-2">{renderComments(comments)}</div>
    </div>
  )
}

export default NestedComm