const DropIndicator = ({id,column}) => {
  return (
    <div data-before={id || "-1"} data-column={column} className=" my-0.5 h-0.5 bg-violet-500 w-full opacity-0"/>
  )
}

export default DropIndicator