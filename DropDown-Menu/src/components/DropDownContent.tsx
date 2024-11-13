import { forwardRef } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropDownContent = forwardRef((props:any, ref:any,)=>{
    const {children, open, top} = props;
        return (
          <div ref={ref}  className={` max-sm:w-full no-scrollbar shadow-lg shadow-gray-300/40 h-[30vh] overflow-y-scroll mt-1 rounded-md cursor-pointer bg-zinc-100 text-center overflow-x-auto transition-opacity duration-150 ease-in-out ${
              open ? "opacity-100 translate-y-0 pointer-events-all" : "opacity-0 -translate-y-1 pointer-events-none"
          }`}
          style={{top : top ? `${top}px` : "100%"}}
          >
              {children}
          </div>
        )
})

export default DropDownContent