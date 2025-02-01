// import React, { PropsWithChildren, useEffect } from 'react'
// import ReactDOM from 'react-dom';
// import { MdClose } from 'react-icons/md';

// interface DialogProps extends PropsWithChildren {
//     children?: React.ReactNode;
//     onClose: () => void;
// }

// const Dialog: React.FC<DialogProps> = ({ onClose, children }) => {

//     //! managing onClose with Esc button keyboardd eevnt
//     const handleKeyUp = (e: KeyboardEvent)=>{
//         if(e.key === 'Escape'){
//             onClose();
//         }

//         // focus capturing
//         if(e.key === "Tab"){
//             if(document.activeElement?.classList.contains("btn")){
//                 e.preventDefault();
//                 e.stopPropagation();
//                 const closeBtn = document.getElementsByClassName("close-btn")[0] as HTMLElement;
//                 closeBtn?.focus();
//             }
//         }
//     };

//     const blockOutsideAccess = ()=>{
//         const body = document.getElementsByTagName("body")[0];

//         [...body.children].forEach((child)=>{
//             if(!child.getAttribute("data-dialog")){
//                 child.setAttribute("aria-hidden","true");
//                 child.setAttribute("inert","true"); //each child should not-focusable
//             }
//         })
//     };

//     const unblockOutsideAccess = ()=>{
//         const body = document.getElementsByTagName("body")[0];

//         [...body.children].forEach((child)=>{
//             if(!child.getAttribute("data-dialog")){
//                 child.removeAttribute("aria-hidden");
//                 child.removeAttribute("inert");
//             }
//         })
//     };

//     useEffect(()=>{
//         document.addEventListener("keydown", handleKeyUp);
//         blockOutsideAccess();

//         return ()=>{
//             unblockOutsideAccess();
//             document.removeEventListener("keydown", handleKeyUp);
//         }
//     },[]);
//     return ReactDOM.createPortal(
//         <div data-dialog="true" className='main fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center max-sm:p-2'>
//         <div onClick={onClose}  className='outside-click-overlay absolute top-0 left-0 h-full w-full bg-[#00000090] fade_in_overlay'></div>

//         <div  className='content relative bg-neutral-100 w-[40vw] h-[50vh] max-sm:w-full  rounded shadow-[0_3px_10px_rgb(0,0,0,0.5)] p-2 fade_in_content'>
//             <MdClose 
//                 size={22} 
//                 className='close-btn absolute right-2 top-2 cursor-pointer border border-gray-500 rounded' 
//                 onClick={onClose}
//             />
//             {children}
//         </div>
//     </div>,document.getElementsByTagName("body")[0]
//     )
// };

// export default Dialog;



//? new code from deepseek.
import React, { PropsWithChildren, useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { MdClose } from 'react-icons/md'

interface DialogProps extends PropsWithChildren {
  onClose: () => void
}

const Dialog: React.FC<DialogProps> = ({ onClose, children }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)

  // Improved focus trap logic
  const focusTrap = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    const focusableElements = modalContentRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    if (focusableElements.length === 0) return;

    // Shift+Tab or Tab key navigation (hm har ek element modal ke andar wale par focus kar re hai)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'Tab') focusTrap(e)
  }, [onClose, focusTrap]);


  useEffect(() => {
    // Set initial focus
    closeButtonRef.current?.focus();
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return ReactDOM.createPortal(
    <div 
      role="dialog"
      aria-modal="true"
      aria-label='Dialog-Modal'
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div 
        ref={modalContentRef}
        className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-y-auto"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Close dialog"
        >
          <MdClose size={24} />
        </button>
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Dialog