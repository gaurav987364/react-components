import React, { useState } from "react";

interface Comment {
  id: number;
  text: string;
  replies: Comment[];
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      text: "This is the first comment",
      replies: [
        {
          id: 2,
          text: "This is a reply to the first comment",
          replies: [],
        },
      ],
    },
  ]);
  const [newComment, setNewComment] = useState<string>("");
  const [replyToId, setReplyToId] = useState<number | null>(null);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  // Add a new comment or reply
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now(),
      text: newComment,
      replies: [],
    };

    let updatedComments: Comment[];

    if (replyToId) {
      // Add reply to the specific comment
      updatedComments = addReply(comments, replyToId, newCommentObj);
    } else {
      // Add a new root-level comment
      updatedComments = [...comments, newCommentObj];
    }

    setComments(updatedComments);
    setNewComment("");
    setReplyToId(null);
  };

  // Recursive function to add reply
  const addReply = (
    commentsList: Comment[],
    parentId: number,
    reply: Comment
  ): Comment[] => {
    return commentsList.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, reply] };
      }
      return { ...comment, replies: addReply(comment.replies, parentId, reply) };
    });
  };

  // Delete a comment or reply
  const handleDelete = (id: number) => {
    const updatedComments = deleteComment(comments, id);
    setComments(updatedComments);
  };

  const deleteComment = (commentsList: Comment[], id: number): Comment[] => {
    return commentsList
      .filter((comment) => comment.id !== id)
      .map((comment) => ({
        ...comment,
        replies: deleteComment(comment.replies, id),
      }));
  };

  // Edit a comment
  const handleEdit = (id: number, text: string) => {
    setEditCommentId(id);
    setEditText(text);
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) return;

    const updatedComments = editComment(comments, editCommentId, editText);
    setComments(updatedComments);
    setEditCommentId(null);
    setEditText("");
  };

  const editComment = (
    commentsList: Comment[],
    id: number | null,
    newText: string
  ): Comment[] => {
    return commentsList.map((comment) => {
      if (comment.id === id) {
        return { ...comment, text: newText };
      }
      return { ...comment, replies: editComment(comment.replies, id, newText) };
    });
  };

  // Render comments recursively
  const renderComments = (commentsList: Comment[]) => {
    return commentsList.map((comment) => (
      <div key={comment.id} className="ml-4 my-2 border-black  border-l-[5px] pl-2">
        {editCommentId === comment.id ? (
          <div>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full border rounded p-2"
            />
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white px-3 py-1 rounded mt-2"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <span>{comment.text}</span>
            <div>
              <button
                onClick={() => handleEdit(comment.id, comment.text)}
                className="text-blue-500 px-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-red-500 px-2"
              >
                Delete
              </button>
              <button
                onClick={() => setReplyToId(comment.id)}
                className="text-green-500 px-2"
              >
                Reply
              </button>
            </div>
          </div>
         )} 
        {renderComments(comment.replies)}
      </div>
    ));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Nested Comments</h1>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder={
          replyToId ? "Write a reply..." : "Write a new comment..."
        }
        className="w-full border rounded p-2 mb-2"
      />
      <button
        onClick={handleAddComment}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {replyToId ? "Reply" : "Add Comment"}
      </button>
      <div className="mt-4">{renderComments(comments)}</div>
    </div>
  );
};

export default Comments;
