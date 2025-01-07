import IMGCAR from "./components/IMGCAR"

const IMG_Data = [
  {
    title: "Title 1",
    image: "https://images.pexels.com/photos/30037821/pexels-photo-30037821/free-photo-of-peaceful-walkway-in-verdant-garden-with-spirals.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    description: "Description 1",
  },
  {
    title: "Title 2",
    image: "https://images.pexels.com/photos/30097303/pexels-photo-30097303/free-photo-of-neuschwanstein-castle-in-lush-bavarian-forest.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    description: "Description 2",
  },
  {
    title: "Title 3",
    image: "https://images.pexels.com/photos/29874794/pexels-photo-29874794/free-photo-of-magpie-perched-on-a-birch-branch-in-autumn-forest.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    description: "Description 3",
  },
]
const App = () => {
  return (
    <div className=" w-full h-screen p-5 flex justify-center bg-gray-800 text-neutral-50">
      <IMGCAR>
        {IMG_Data.map((img)=>(
          <img className=" w-full h-full object-cover" src={img.image} alt={img.title}/>
        ))}
      </IMGCAR>
    </div>
  )
}

export default App