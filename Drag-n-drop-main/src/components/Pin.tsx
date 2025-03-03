import { useState } from "react";
import { TiPin } from "react-icons/ti";
//? some baat related to sort method suppose we have array of 5 [1,2,3,4,5].sort((a,b)=> console.log(a,b));
//? hame a me 2,3,4,5 milta hai and b me 1,2,3,4 only ok yaad rkhan ye baaat a dont take first value, while b dont take last value of array and they return the combination ok like [(2,1),(3,2),(4,3),(5,4)];
// so on doing b-a we get -1 only which clears that -1 is for descending and left 1 is for ascending

//? one more exciting thing if we call Number(false) we get 0 and for true we get 1 of nnumbers ok always remember this thing 
interface Pin {
    id: number;
    name: string;
    // originalIndex: number; 
    pinOrder: number | null; 
    isPinned: boolean;
};
const Pin = () => {
    const [pins, setPins] = useState<Pin[]>([
        // {id: 1, text: "Pin 1", isPinned: false, originalIndex: 0},
        // {id: 2, text: "Pin 2", isPinned: false, originalIndex: 1},
        // {id: 3, text: "Pin 3", isPinned: false, originalIndex: 2},
        // {id: 4, text: "Pin 4", isPinned: false, originalIndex: 3},
        // {id: 5, text: "Pin 5", isPinned: false, originalIndex: 4},

        //? new pins with pinOrder
        { id: 1, name: "Item 1", isPinned: false, pinOrder: null },
        { id: 2, name: "Item 2", isPinned: false, pinOrder: null },
        { id: 3, name: "Item 3", isPinned: false, pinOrder: null },
        { id: 4, name: "Item 4", isPinned: false, pinOrder: null },
        { id: 5, name: "Item 5", isPinned: false, pinOrder: null },
    ]);
    const [pinCounter, setPinCounter] = useState(0); // Tracks the recency of pinning

    //! there is one gap with this functionality like when we do pins it come on top but when we do pin again like the greater than older pin which comes on second but by default it comes on top so that we dont achieve that by this function or usestate()
    // const togglePin = (id: number) => {
    //     if(!id) return;
    //     const updatedPins =  pins.map((pin)=> pin.id === id ? {...pin, isPinned: !pin.isPinned} : pin);

    //     updatedPins.sort((a, b) =>{
    //         console.log(a,b)
    //         //?  thsi avobe condtion for store the original posi of pin so that when we do item unpin it goes to there prevois location in array
    //         console.log(a.originalIndex - b.originalIndex)
    //         if(a.isPinned === b.isPinned){
    //             return a.originalIndex - b.originalIndex;
    //         }
    //         return a.isPinned? -1 : 1; 
    //     });
    //     setPins(updatedPins);
    // };
  
     // Toggle pinning and manage the pin order
  const togglePin = (id: number) => {
    setPins((prevItems) => {
      let newCounter = pinCounter;
      const updatedItems = prevItems.map((item) => {
        if (item.id === id) {
          if (!item.isPinned) {
            // Pin the item and assign the latest pin order
            newCounter += 1;
            return { ...item, isPinned: true, pinOrder: newCounter };
          } else {
            // Unpin the item and reset its pinOrder
            return { ...item, isPinned: false, pinOrder: null };
          }
        }
        return item;
      });

      // Update the counter only if an item was pinned
      setPinCounter(newCounter);

      // Sort items: Pinned items by `pinOrder` (descending), unpinned maintain original order
      return updatedItems.sort((a, b) => {
        if (a.isPinned && b.isPinned) {
          return (b.pinOrder || 0) - (a.pinOrder || 0); // Sort pinned items by pinOrder
        }
        if (a.isPinned !== b.isPinned) {
          return a.isPinned ? -1 : 1; // Pinned items come first
        }
        return a.id - b.id; // Keep unpinned items in their original order
      });
    });
  };
  
    return (
    <div className=" p-4">
        <h1 className="text-2xl font-bold mb-4">Pin Functionality</h1>
        <ul className=" mt-2">
            {pins?.map((pin)=>(
                <li
                key={pin.id}
                className="flex mt-1 justify-between items-center bg-gray-600 p-2 rounded-md shadow-sm"
              >
                <span className=" text-black flex  items-center gap-2">
                    {pin.name} 
                </span>
                <button
                  onClick={()=>togglePin(pin.id)}
                  className={`px-2 py-1.5 text-sm font-semibold rounded`}
                > 
                {pin.isPinned ? <TiPin size={25} fill="salmon"/> : <TiPin size={25} />}
                </button>
              </li>
            ))}
        </ul>
    </div>
  )
}

export default Pin