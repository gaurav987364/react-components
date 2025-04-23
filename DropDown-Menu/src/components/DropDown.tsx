import { ReactElement, useEffect, useRef, useState } from "react";
import DropDownBtn from "./DropDownBtn";
import DropDownContent from "./DropDownContent";

interface Props {
  content:ReactElement[];
  titleBtn:string;
}
const DropDown = ({content, titleBtn}:Props) => {
  const [open, setOpen] = useState(false);
  const [top, setTop] =  useState(0);
  const dropdownref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const handleClickOutside = (e : Event)=>{
      if(dropdownref.current && !dropdownref.current.contains(e.target as Node)){
        setOpen(false);
      }
    }
    // Add event listener to document for outside click event
    document.addEventListener('click', handleClickOutside);
    return ()=>{
      document.removeEventListener('click', handleClickOutside);
    }
  },[dropdownref]);


  const toggle = ()=>{
    if (!open) {//+
      const btnRect = btnRef.current?.getBoundingClientRect();
      let spaceLeft;      
      if (btnRect) {//+
         spaceLeft = window.innerHeight - btnRect.bottom;
      }

      const contentHeight = contentRef.current?.clientHeight;
      let topPosition;
      if (spaceLeft && contentHeight) {//+
         topPosition = spaceLeft > contentHeight ? null : spaceLeft - contentHeight;
      }
      setTop(topPosition!);
    }
    setOpen((open)=> !open);
  }

  return (
   <div ref={dropdownref}>
      <DropDownBtn ref={btnRef} open={open} toggle={toggle}>{titleBtn}</DropDownBtn>
      <DropDownContent top={top} ref={contentRef} open={open}>{content}</DropDownContent>
   </div>
  )
}

export default DropDown;
