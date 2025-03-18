import React, { memo, useCallback, useState } from 'react'

interface Props {
  rows: number;
  cols: number;
  selectColor: string;
}
const SelectGrid:React.FC<Props> = ({
  rows,
  cols,
  selectColor,
 ...rest
}) => {
  const [isMouseDown, setisMouseDown] = useState<boolean>(false);
  const [selectedBox,setSelectedBox] = useState<number[]>([]);
  //making an array based on this length;
  const arrayLength = rows*cols;

  const handlemouseDown = (boxNumber:number) => {
    setisMouseDown(true);
    setSelectedBox([boxNumber]);
  };

//   const getEvenOdd = () => {
//     if (!Array.isArray(selectedBox)) {
//         console.error('selectedBox is not an array');
//         return;
//     }

//     const nums = [...selectedBox];
//     nums.filter(num => {
//       const isEven = num % 2 === 0;
//       if(isEven){
//        console.log(num)
//       }else{
//         console.log(num)
//       }
//     })
// };
// getEvenOdd()
  const handleMouseEnter = useCallback((boxNumber:number) => {
    if(isMouseDown){
      const startBox = selectedBox[0]; //start jise darg shuru
      const endBox = boxNumber; //end jispe darg finish

      
      //finding these things
      const startRow = Math.floor((startBox - 1)/cols);
      const startCol = (startBox - 1) % cols;
      const endRow = Math.floor((endBox - 1)/cols);
      const endCol = (endBox - 1) % cols;

      const maxRow = Math.max(startRow,endRow);
      const minRow = Math.min(startRow,endRow);
      const maxCol = Math.max(startCol,endCol);
      const minCol = Math.min(startCol,endCol);

      const selected = [];
      for(let row = minRow; row <= maxRow; row++){
        for(let col = minCol; col <= maxCol; col++){
          selected.push(row*cols + col + 1); //!important step;
        }
      }
      setSelectedBox(selected);
    }
  },[isMouseDown]);

  const handleMouseUp = () => {
    setisMouseDown(false);
  };
  return (
    <div 
    onMouseUp={handleMouseUp} 
    className=' w-[50vw] h-[50vh] border grid'  
    style={{
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`
    }}>
      {Array.from({length:arrayLength}, (_,i)=>{
        return (
          <div 
            key={i}
            className={` w-auto h-full italic  flex items-center justify-center transition-transform duration-500 ease-in ${selectedBox.includes(i+1) ? " text-white font-semibold" : ""} `}
            style={
              {backgroundColor : `${selectedBox.includes(i+1) ? `${selectColor}` : ""}` }}
              onMouseDown={()=>handlemouseDown(i+1)}
              onMouseEnter={()=>handleMouseEnter(i+1)}
              {...rest}
            >
            {i+1}
          </div>
        )
      })}
    </div>
  )
}

export default memo(SelectGrid);