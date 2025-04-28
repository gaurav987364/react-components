import React from 'react';
import { convertArrayToObject, LEFT_LIST, RIGHT_LIST } from '../utils/contants';
import ItemsList from './ItemsList';
import Buttons from './Buttons';

const ListUi = () => {
  const [left, setLeft] = React.useState(convertArrayToObject(LEFT_LIST));
  const [right, setRight] = React.useState(convertArrayToObject(RIGHT_LIST));

  return (
    <div className='flex justify-around items-center h-full w-full'>
      <ItemsList 
        className=' font-thin italic border p-5 space-y-1' 
        items={left} 
        setItems={setLeft}
      />

      <Buttons
        leftItems={left}
        rightItems={right}
        setLeftItems={setLeft}
        setRightItems={setRight}
      />

      <ItemsList 
        className=' font-thin italic border p-5 space-y-1' 
        items={right} 
        setItems={setRight}
      />
    </div>
  )
}

export default ListUi;