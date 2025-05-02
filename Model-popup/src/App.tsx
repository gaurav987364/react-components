import { useState } from "react";
import Dialog from "./components/Dialog";

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen((isOpen) =>!isOpen);
  };

  const closeModal = () =>{
    setIsOpen(false);
  }
  return (
    <div className=" relative bg-white p-1 w-full h-screen">
      <button type="button" className=" px-4 py-1 bg-blue-700 rounded-lg font-mono text-neutral-50 " onClick={toggleModal}>Open</button>
      {isOpen && (
        <div className=" w-full h-full flex items-center justify-center">
          <Dialog onClose={closeModal}>
            <div>
              <h1>This is Modal.</h1>
              <button className="btn px-4 py-0.5 bg-purple-500 rounded text-neutral-50">Ok</button>
            </div>
          </Dialog>
        </div>
      )}
    </div>
  )
}

export default App;



// App.tsx
// import { useState, useRef } from 'react';
// import { FiPlay, FiPause, FiUpload } from 'react-icons/fi';

// interface VideoEdit {
//   start: number;
//   end: number;
//   label: string;
// }

// const App = () => {
//   // ... [keep all the previous state and logic] ...
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [videoUrl, setVideoUrl] = useState<string>('');
//   const [edits, setEdits] = useState<VideoEdit[]>([]);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setVideoFile(file);
//       setVideoUrl(URL.createObjectURL(file));
//     }
//   };

//   const addEdit = (edit: VideoEdit) => {
//     setEdits([...edits, edit]);
//   };

//   const handleTimeUpdate = () => {
//     if (!videoRef.current) return;
    
//     const current = videoRef.current.currentTime;
//     const relevantEdit = edits.find(edit => current >= edit.start && current < edit.end);
    
//     if (relevantEdit) {
//       videoRef.current.currentTime = relevantEdit.end;
//     }
//     setCurrentTime(videoRef.current.currentTime);
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-5 p-5 min-h-screen bg-gray-100">
//       {/* Video Section */}
//       <div className="flex-1 flex flex-col gap-4">
//         {/* Upload Button */}
//         <label className="w-full max-w-xs mx-auto md:mx-0">
//           <div className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors">
//             <FiUpload />
//             <span>Upload Video</span>
//             <input 
//               type="file" 
//               accept="video/*" 
//               onChange={handleFileUpload}
//               className="hidden"
//             />
//           </div>
//         </label>

//         {/* Video Preview */}
//         {videoUrl && (
//           <div className="flex flex-col gap-4">
//             <video 
//               ref={videoRef}
//               src={videoUrl}
//               onTimeUpdate={handleTimeUpdate}
//               onPlay={() => setIsPlaying(true)}
//               onPause={() => setIsPlaying(false)}
//               className="w-full rounded-xl shadow-lg bg-black aspect-video"
//             />

//             {/* Video Controls */}
//             <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
//               <button 
//                 onClick={() => videoRef.current?.play()}
//                 className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
//               >
//                 <FiPlay className="text-2xl" />
//               </button>
//               <button 
//                 onClick={() => videoRef.current?.pause()}
//                 className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
//               >
//                 <FiPause className="text-2xl" />
//               </button>
//               <span className="text-gray-700 font-medium">
//                 {formatTime(currentTime)} / {formatTime(videoRef.current?.duration || 0)}
//               </span>
//             </div>

//             {/* Timeline */}
//             <div className="h-5 bg-gray-200 rounded-full w-full relative overflow-hidden">
//               <div 
//                 className="h-full bg-blue-500 absolute left-0 top-0 transition-all duration-100 ease-linear"
//                 style={{ width: `${(currentTime / (videoRef.current?.duration || 1)) * 100}%` }}
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Chat & Edits Section */}
//       <div className="md:w-96 w-full flex flex-col gap-5 bg-white p-5 rounded-xl shadow-lg">
//         <div className="flex-1 flex flex-col gap-4">
//           <h3 className="text-xl font-bold text-gray-800">Applied Edits</h3>
          
//           <div className="bg-gray-50 p-4 rounded-lg flex-1 overflow-y-auto">
//             {edits.map((edit, i) => (
//               <div 
//                 key={i}
//                 className="p-3 mb-2 bg-white rounded-lg shadow-sm border border-gray-200"
//               >
//                 <span className="font-medium text-blue-500">
//                   {formatTime(edit.start)} - {formatTime(edit.end)}:
//                 </span>
//                 <span className="ml-2 text-gray-700">{edit.label}</span>
//               </div>
//             ))}
//           </div>

//           {/* Quick Actions */}
//           <div className="grid grid-cols-2 gap-3">
//             <button 
//               onClick={() => addEdit({ start: 0, end: 20, label: 'Skipped Intro' })}
//               className="p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
//             >
//               Skip Intro
//             </button>
//             <button 
//               onClick={() => addEdit({ start: currentTime, end: currentTime + 10, label: 'Skip 10s' })}
//               className="p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
//             >
//               Skip 10s
//             </button>
//             <button 
//               onClick={() => addEdit({ start: currentTime - 5, end: currentTime, label: 'Remove Previous 5s' })}
//               className="p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
//             >
//               Remove 5s Back
//             </button>
//             <button 
//               onClick={() => setEdits([])}
//               className="p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
//             >
//               Clear All
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;