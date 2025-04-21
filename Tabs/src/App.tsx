import React from 'react';
import Tab from './components/Tab';

const App:React.FC = () => {
  return (
    <div className=' bg-gray-100 w-full h-screen p-5'>
     <Tab
     defaultTab={1}
      tablist={[
        {
          lable:"Left",
          id:1,
          Component:()=><div>Hi</div>
        },
        {
          lable:"Mid",
          id:2,
          Component:()=><div>Ok</div>
        },
        {
          lable:"Right",
          id:3,
          Component:()=><div>Done</div>
        },
      ]}
     /> 
    </div>
  )
};

export default App;