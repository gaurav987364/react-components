import React, { useState } from 'react';

interface NestcheckBoxProps {
    id:string;
    label:string;
    checked:boolean;
    children?:NestcheckBoxProps[];
};

const NestedCheckBox:React.FC = () => {
    const [tree,setTree] = useState<NestcheckBoxProps[]>([
        {
            id: '1',
            label: 'Fruits',
            checked: false,
            children: [
              { id: '1.1', label: 'Apple', checked: false },
              { id: '1.2', label: 'Orange', checked: false },
              {
                id: '1.3',
                label: 'Berries',
                checked: false,
                children: [
                  { id: '1.3.1', label: 'Strawberry', checked: false },
                  { id: '1.3.2', label: 'Blueberry', checked: false }
                ]
              }
            ]
          },
          {
            id: '2',
            label: 'Vegetables',
            checked: false,
            children: [
              { id: '2.1', label: 'Carrot', checked: false },
              { id: '2.2', label: 'Broccoli', checked: false, children:[
                {id:'2.1.1', label:'Ginger', checked:false}
              ]}
            ]
          },
          {
            id:'3',
            label:'Clothes',
            checked:false,
            children:[
              {id:"3.1", label:"T-Shirt",checked:false},
            ]
          }
    ]);


    const updateDownWardNodes = (
      itemNode:NestcheckBoxProps,
      newChecked:boolean
    )=>{
      // we first update that whole node itself
      const updatedNode = {...itemNode, checked:newChecked};
      console.log(updatedNode);

      // now we update their childrens nodes if available
      if(itemNode.children){
        updatedNode.children = itemNode.children.map(child => updateDownWardNodes(child,newChecked))
      }
      return updatedNode;
    };

    const updateParentsNode = (updatedTree:NestcheckBoxProps[]):NestcheckBoxProps[] =>{
      return updatedTree?.map(item => {
        //first we update and check on the childrens
        if(item.children && item.children.length){
          const updatedChildrens = updateParentsNode(item.children);
          
          // check is all childs are true or chekced;
          const AllchildrenChecked = updatedChildrens.every(child => child.checked); // true so all childs are chcked;
          
          //if all checked set krdege
          return {...item, checked:AllchildrenChecked, children:updatedChildrens}
        }
        return item;
      })
    }


    const updateTreeWithNewNode = (
      treeArray:NestcheckBoxProps[],
      targetId:string,
      isChecked:boolean
    ): NestcheckBoxProps[]=>{
      return treeArray?.map(item => {
        if(item.id === targetId){
          // we send that particular node and isChecked:true;
          return updateDownWardNodes(item,isChecked);
        } else if(item.children){ 
          //Agar upar targetid se node match nahi milta to recursive call karta hai children mein.
          return {...item, children:updateTreeWithNewNode(item.children,targetId, isChecked)}
        }
        return item;
      })
    };

    
    // handle update function for state update;
    const handleToggle = (id:string,isChecked:boolean)=>{
        let updatedTree = updateTreeWithNewNode(tree,id,isChecked);
        updatedTree = updateParentsNode(updatedTree);
        setTree(updatedTree);
    };

    // Render Nodes Function;
    const renderCheckBox = (dataArray:NestcheckBoxProps[])=>{
        return (
            <div>
                {dataArray?.map(item => (
                   <React.Fragment key={item.id}>
                    <div  className='ml-4 border-l border-gray-500 p-0.5 space-x-2'>
                        <div className=' flex items-center gap-1'>
                            <input 
                             type="checkbox"
                             aria-label={item.label} 
                             checked={item.checked}
                             onChange={() => handleToggle(item.id, !item.checked)}
                             className='accent-pink-600 h-3 w-3 rounded-sm border-gray-400  transition duration-200 cursor-pointer'
                            />
                            <span>{item.label}</span>
                        </div>
                        {renderCheckBox(item.children!)}
                    </div>
                   </React.Fragment>
                ) )}
            </div>
        )
    };
  return (
    <div className=' w-96 h-auto border rounded'>
        <div>
            <h1 className=' font-semibold text-lg text-pink-600 text-center mt-2'>Nested CheckBox Problem!</h1>
        </div>
        <div className=' mt-4 bg-slate-700 rounded-md p-3 shadow-md overflow-auto h-full'>
            {renderCheckBox(tree)}
        </div>
    </div>
  )
}

export default NestedCheckBox;