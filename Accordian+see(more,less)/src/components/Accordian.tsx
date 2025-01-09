import { useState } from "react"
import Content from "./Content";

const Accordian = () => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen((open)=> !open);
    }
  return (
    <div style={{height:"50%", backgroundColor:"gray", display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px'}}>
        <h2>Tite</h2>
        <span onClick={toggleOpen} className="span">➕</span>

        {open && (
            <div className="content">
                <Content/>
            </div>
        )}
    </div>
  )
}

export default Accordian;