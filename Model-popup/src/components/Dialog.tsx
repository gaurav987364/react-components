// import React, { PropsWithChildren } from 'react'
// import { MdClose } from 'react-icons/md';

// interface DialogProps extends PropsWithChildren {
//     children?:React.ReactNode;
//     onClose: () => void;
// }
// const Dialog:React.FC<DialogProps> = ({onClose,children}) => {
//     const contentRef = React.useRef<HTMLDivElement>(null);
//     const overlayRef = React.useRef<HTMLDivElement>(null);

//     //? we have to add the our css animation end class dynamically
//     const handelClose = ()=>{
//         overlayRef.current?.classList.add('fade_out');
//         contentRef.current?.classList.add('fade_out');
       
//         contentRef.current?.addEventListener('animationend',handelAnimationEnd,{once:true}); //! once true taki hame alag se eventListener clear na krana pade like useEffect
//     };
//     function handelAnimationEnd(){
//         onClose();
//     }
//   return (
//     <div className='main fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center'>
//         <div ref={overlayRef} className='outside-click-overlay absolute top-0 left-0 h-full w-full bg-[#00000090] fade_in_overlay'></div>

//         <div ref={contentRef} className='content relative bg-neutral-100 w-[40vw] h-[50vh] rounded shadow-[0_3px_10px_rgb(0,0,0,0.5)] p-2 fade_in_content'>
//             <MdClose 
//                 size={22} 
//                 className='close-btn absolute right-2 top-2 cursor-pointer border border-gray-500 rounded' 
//                 onClick={handelClose}
//             />
//             {children}
//         </div>
//     </div>
//   )
// }

// export default Dialog;



import React, { PropsWithChildren, useEffect } from 'react'
import { MdClose } from 'react-icons/md';

interface DialogProps extends PropsWithChildren {
    children?: React.ReactNode;
    onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ onClose, children }) => {

    //! managing onClose with Esc button keyboardd eevnt
    const handleKeyUp = (e: KeyboardEvent)=>{
        if(e.key === 'Escape'){
            onClose();
        }
    };

    useEffect(()=>{
        document.addEventListener("keyup", handleKeyUp);

        return ()=>{
            document.removeEventListener("keyup", handleKeyUp);
        }
    },[]);
    return (
        <div className='main fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center'>
            <div onClick={onClose}  className='outside-click-overlay absolute top-0 left-0 h-full w-full bg-[#00000090] fade_in_overlay'></div>

            <div  className='content relative bg-neutral-100 w-[40vw] h-[50vh] rounded shadow-[0_3px_10px_rgb(0,0,0,0.5)] p-2 fade_in_content'>
                <MdClose 
                    size={22} 
                    className='close-btn absolute right-2 top-2 cursor-pointer border border-gray-500 rounded' 
                    onClick={onClose}
                />
                {children}
            </div>
        </div>
    );
};

export default Dialog;
