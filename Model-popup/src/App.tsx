import Model from "./components/Model"

const App = () => {
  
  return (
    <section className=" relative p-1 flex items-center justify-center flex-col h-screen">
      <Model
       title={"Open Me!"}
       content={"This is the content of the model"}
      />
    </section>
  )
}

export default App