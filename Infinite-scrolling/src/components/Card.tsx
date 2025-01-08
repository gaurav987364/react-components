

interface Props {
    data: { id: number, title: string, body: string } | null;  // Assuming data is an object with userId, title, and body properties. Replace with actual data type if needed.  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}
const Card = ({data}: Props) => {
    
  return (
    <div className="card">
       <div className=" cardbody">
        <span className=" id">{data?.id}</span>
        <span className="title">{data?.title.slice(0,10)}</span>
       </div>

       <p className="para">{data?.body.slice(0,100)}</p>
    </div>
  )
}

export default Card;