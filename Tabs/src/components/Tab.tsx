import React, { FC, useRef, useState } from 'react';

interface TabType {
    label: string;
    id: number;
    Component: FC;
};

interface Props {
    tablist: TabType[];
    defaultTab?: number;
};

const Tab: React.FC<Props> = ({
    tablist = [],
    defaultTab = 1
}) => {
    const [activeTab, setActiveTab] = useState<number>(defaultTab);
    const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

    // const Component = tablist[activeTab - 1]?.Component;

    const handleTabChange = (index: number) => {
        setActiveTab(index + 1);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        const lastIndex = tablist.length - 1; //3

        if (event.key === "ArrowRight") {
            event.preventDefault();
            //when current index === end index
            const nextIndex = index === lastIndex ? 0 : index + 1;
            setActiveTab(nextIndex + 1);
            buttonRefs.current[nextIndex]?.focus();
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            //when current index === first index
            const prevIndex = index === 0 ? lastIndex : index - 1;
            setActiveTab(prevIndex + 1);
            buttonRefs.current[prevIndex]?.focus();
        }

        //? we dont need two handle space & enter key manually because react automatically use them for selection; so no need;
    };

    return (
        <div className='w-96 h-10 rounded-xl bg-slate-200 dark:bg-slate-700'>
            <div role='tablist' className='w-full h-full flex items-center justify-evenly'>
                {tablist?.map((tabItem: TabType, index: number) => {
                    const isActive = tabItem?.id === activeTab;
                    return (
                        <button
                            key={tabItem?.id}
                            role='tab'
                            aria-selected={isActive}
                            data-selected={isActive}
                            onClick={() => handleTabChange(index)}
                            onKeyDown={(e) => handleKeyPress(e, index)}
                            ref={(el) => {
                                buttonRefs.current[index] = el;
                            }}
                            autoFocus={isActive}
                            className={`w-full h-full px-4 py-1 rounded-xl cursor-pointer capitalize transition-all duration-300 ${
                                isActive 
                                    ? "bg-gray-300 dark:bg-slate-800 font-semibold text-gray-900 dark:text-gray-50" 
                                    : "font-thin dark:text-gray-50"
                            }`}
                        >
                            {tabItem?.label}
                        </button>
                    );
                })}
            </div>
           {
            tablist?.map((tabItem)=>(
                <div 
                    key={tabItem?.id}
                    role='tabpanel' 
                    id={`tabpanel-${tabItem?.id}`}
                    aria-labelledby={`tab-${tabItem?.id}`}
                    hidden={tabItem?.id !== activeTab} //key-thing to remeber
                    className='p-4 w-full h-full mx-auto'
                >
                  <tabItem.Component/>
                </div>
            ))
           }
        </div>
    );
};

export default Tab;