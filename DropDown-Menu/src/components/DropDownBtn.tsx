import { forwardRef } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropDownBtn = forwardRef((props : any, ref: any)=>{
    const {children, open, toggle} = props;
        return (
          <button ref={ref} onClick={toggle} className={` w-fit flex items-center gap-1 px-2 py-2.5 rounded-lg shadow-lg shadow-gray-500/50 cursor-pointer bg-zinc-100 ${open ? "border-[1px] border-blue-600" : "border-none"} `}>
              {children} 
              <span>
                  {open ? (
                      <><FaChevronUp/></>
                  ) : (
                      <><FaChevronDown/></>
                  )}
              </span>
          </button>
        )
})

export default DropDownBtn