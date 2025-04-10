import React, { useState } from 'react';

interface NestcheckBoxProps {
    id:string;
    label:string;
    checked:boolean;
    children?:NestcheckBoxProps[]
}

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
              { id: '2.2', label: 'Broccoli', checked: false }
            ]
          }
    ]);

    //downward propagation (parent to child)
    const updateDownwardChilds = (node:NestcheckBoxProps,newChecked:boolean)=>{
        const updatedNode = { ...node, checked: newChecked }; //copy node

        if (node.children) {
            updatedNode.children = node.children.map(child=> updateDownwardChilds(child,newChecked))
        }
        return updatedNode;
    };

    //upward propagaton (child to parent)
    const updateParentsUpward = (tree:NestcheckBoxProps[]) :NestcheckBoxProps[]=> {
        return tree.map(node => {
          if (node.children && node.children.length) {
            // First, update all children nodes recursively
            const updatedChildren = updateParentsUpward(node.children);
            
            // Determine if all children are checked
            const allChildrenChecked = updatedChildren.every(child => child.checked);
      
            // Optionally: You can also handle an "indeterminate" state if only some children are checked.
            // For now, we simply set parent's checked to true only if every child is checked.
            return { ...node, checked: allChildrenChecked, children: updatedChildren };
          }
          return node;
        });
      }

    //update tree function;
    const updateTreeWithNewNode = (tree:NestcheckBoxProps[], targetId: string, newChecked: boolean): NestcheckBoxProps[] => {
        return tree.map(item => {
            if(item.id === targetId){
                return updateDownwardChilds(item, newChecked)
            } else if(item.children){
                return {...item, children:updateTreeWithNewNode(item.children,targetId,newChecked)}
            }
            return item;
        });
    };

    
    // handle update function for state update;
    const handleToggle = (id:string,isChecked:boolean)=>{
        let updatedTree = updateTreeWithNewNode(tree,id,isChecked);
        
        updatedTree = updateParentsUpward(updatedTree)

        setTree(updatedTree)
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
            <h1 className=' font-semibold text-lg text-pink-600'>Nested CheckBox Problem</h1>
        </div>
        <div className=' mt-4 bg-slate-700 rounded-md p-3 shadow-md overflow-auto h-full'>
            {renderCheckBox(tree)}
        </div>
    </div>
  )
}

export default NestedCheckBox