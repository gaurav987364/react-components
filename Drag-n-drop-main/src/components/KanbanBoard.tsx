import { useState } from "react"
import { CARD_DATA } from "../data"
import Column from "../KanbanBoardParts/Column";

const KanbanBoard = () => {
    const [cards, setCards] = useState(CARD_DATA);
  return (
    <div className=" h-full w-full overflow-scroll p-10 flex">
        <Column
         title="Tasks"
         column="backlog"
         headingColor=" text-pink-500"
         cards={cards}
         setCards={setCards}
        />
        <Column
         title="TODO"
         column="todo"
         headingColor=" text-green-500"
         cards={cards}
         setCards={setCards}
        />
        <Column
         title="In Progress"
         column="doing"
         headingColor=" text-purple-500"
         cards={cards}
         setCards={setCards}
        />
        <Column
         title="Completed"
         column="done"
         headingColor=" text-orange-500"
         cards={cards}
         setCards={setCards}
        />
    </div>
  )
}

export default KanbanBoard