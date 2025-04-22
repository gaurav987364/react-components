import React from 'react';
import Tab from './components/Tab';
import Form from './components/test-componnets/Form';

const App:React.FC = () => {
  return (
    <div className=' bg-gray-100 w-full h-screen p-5'>
     <Tab
     defaultTab={1}
      tablist={[
        {
          label:"Left",
          id:1,
          Component:()=><Form/>
        },
        {
          label:"Mid",
          id:2,
          Component:()=><div>Ok</div>
        },
        {
          label:"Right",
          id:3,
          Component:()=><div>Done</div>
        },
      ]}
     /> 
    </div>
  )
};

export default App;