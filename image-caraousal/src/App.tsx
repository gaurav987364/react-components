// import IMGCAR from "./components/IMGCAR"
// import IMGCar3 from "./components/IMGCar3"
// import Carousel from "./components/ImgCar2"

import Carousel from "./components/Carousel";

// const IMG_Data = [
//   {
//     src: "https://images.pexels.com/photos/888616/pexels-photo-888616.jpeg?auto=compress&cs=tinysrgb&w=600",
//     alt:"image/jpeg...",
//   },
//   {
//     src: "https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg?auto=compress&cs=tinysrgb&w=600",
//     alt:"image/jpeg...",
//   },
//   {
//     src: "https://images.pexels.com/photos/30160126/pexels-photo-30160126/free-photo-of-stunning-view-of-maltese-church-towers-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600",
//     alt:"image/jpeg...",
//   },
// ]
const App = () => {
  return (
    <div className=" w-full h-screen p-5 flex flex-col items-center justify-center bg-gray-800 text-neutral-50">
      <Carousel>
        <div>section-1</div>
        <div>section-2</div>
        <div>section-3</div>
        <div>section-4</div>
        <div>section-5</div>
      </Carousel>
    </div>
  )
}

export default App;