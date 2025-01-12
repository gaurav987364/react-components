// import IMGCAR from "./components/IMGCAR"

import IMGCar3 from "./components/IMGCar3"

// import Carousel from "./components/ImgCar2"

const IMG_Data = [
  {
    src: "https://images.pexels.com/photos/888616/pexels-photo-888616.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt:"image/jpeg...",
  },
  {
    src: "https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt:"image/jpeg...",
  },
  {
    src: "https://images.pexels.com/photos/30160126/pexels-photo-30160126/free-photo-of-stunning-view-of-maltese-church-towers-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt:"image/jpeg...",
  },
]
const App = () => {
  return (
    <div className=" w-full h-screen p-5 flex flex-col items-center justify-center bg-gray-800 text-neutral-50">
      {/* <Carousel 
      images={IMG_Data} 
      autoplay={false}
      interval={8000}
      /> */}

      <IMGCar3>
      <img
        src="https://images.pexels.com/photos/30159434/pexels-photo-30159434/free-photo-of-intricate-floral-patterns-at-sheikh-zayed-mosque.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
        alt="Slide 1"
      />
      <img
        src="https://images.pexels.com/photos/30167059/pexels-photo-30167059/free-photo-of-organized-workspace-with-planner-and-smartphone.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
        alt="Slide 2"
      />
      <img
        src="https://images.pexels.com/photos/30159495/pexels-photo-30159495/free-photo-of-black-and-white-corgi-in-snowy-forest-landscape.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
        alt="Slide 3"
      />
      <img
        src="https://images.pexels.com/photos/29702314/pexels-photo-29702314/free-photo-of-woman-in-polka-dot-dress-with-cat-in-lush-green-field.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
        alt="Slide 4"
      />
      </IMGCar3>
    </div>
  )
}

export default App;