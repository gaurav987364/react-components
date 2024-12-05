import { useState } from "react";

interface Comments{
    id:number;
    text:string;
    replies:Comments[]
}
const Practice = () => {
    const [comments, setComments] = useState<Comments[]>([
        {
            id:1,
            text:"this is comment 1",
            replies:[
                {
                    id:2,
                    text:"Reply to this comment",
                    replies:[]
                }
            ]
        }
    ]);
    const [replyId, setReplyId] = useState<number | null>(null);
    const [input, setInput] = useState<string>("");
    const [editId, setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>("");
    const addNewComment = ()=>{
        if(!input.trim()) return;

        const newObj = {
            id:Date.now(),
            text:input,
            replies:[]
        };

        let updatedComments : Comments[];

        if(replyId){
            updatedComments = addReply(comments, replyId, newObj);
        } else {
            updatedComments = [...comments, newObj]
        }
        setComments(updatedComments);
        setInput("");
        setReplyId(null);
    };

    const addReply = (
        commentList:Comments[],
        parentID:number,
        reply:Comments
    ) : Comments[]=>{
        return commentList?.map((comment)=>{
            if(comment.id === parentID){
                return {...comment, replies:[...comment.replies, reply]}
            }
            return {...comment,replies:addReply(comment.replies, parentID, reply)}
        })
    };


    const handeldelete = (id:number)=>{
        const updatedComments = deleteComments(comments, id);
        setComments(updatedComments);
    };
    const deleteComments = (commentList: Comments[], id:number):Comments[]=>{
        return commentList?.filter((comment)=> comment.id !== id)
        .map((comments)=>{
            return {...comments, replies:deleteComments(comments.replies, id)}
        })
    };


    const setEditValues = (id:number, text:string)=>{
        setEditId(id);
        setEditText(text);
    }


    const handelSaveEdit = ()=>{
        if(!editText.trim()) return;

        const updatedComments = editComments(comments, editId, editText);
        setComments(updatedComments);
        setEditId(null);
        setEditText("");
    };

    const editComments = (
        commentList:Comments[],
        id:number | null,
        text:string
    ): Comments[]=>{
        return commentList?.map((comment)=>{
            if(comment.id === id){
                return {...comment, text:text}
            }
             return {...comment, replies:editComments(comment.replies, id, text)}
        })
    }
    const rendorComments = (commentList:Comments[])=>{
        return commentList?.map((comment)=>(
            <div key={comment.id}>
                <span>{comment.text}</span>
                <div className=" ml-2 flex gap-1 cursor-pointer">
                    <button onClick={()=>setEditValues(comment.id, comment.text)}>edit</button>
                    <button onClick={()=>handeldelete(comment.id)}>delete</button>
                    <button onClick={()=>setReplyId(comment.id)}>reply</button>
                </div>
                {editId === comment.id && (
                    <div>
                        <label>Edit Comment</label>
                        <input type="text" value={editText} onChange={(e)=>setEditText(e.target.value)} />
                        <button onClick={handelSaveEdit}>save</button>
                    </div>
                )}
                <div>{rendorComments(comment.replies)}</div>
            </div>
        ))
    }
  return (
    <div>
        <h1>Nested Comments</h1>
        <textarea value={input} onChange={(e)=>setInput(e.target.value)}
            placeholder={replyId ? "reply to" : "add new "}/>
        <button onClick={addNewComment}>
            {replyId? "add reply" : "add comment"}
        </button>
        <div>{rendorComments(comments)}</div>
    </div>
  )
}

export default Practice