interface Props {
    content: string;
}
const Box = ({content} : Props) => {
  return (
    <div className="flex justify-center items-center h-[30rem] w-[50rem] rounded-md bg-zinc-300 max-sm:w-[25rem] max-sm:h-[18rem]">
        {content}
    </div>
  )
}

export default Box;