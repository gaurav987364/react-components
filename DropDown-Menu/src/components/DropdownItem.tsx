

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownItem = ({children} : any) => {
  return (
    <div className=" p-[0.5rem] m-[0.1rem] w-full border-r-2 cursor-pointer hover:bg-blue-200 transition-shadow ">
      {children}
    </div>
  )
}

export default DropdownItem