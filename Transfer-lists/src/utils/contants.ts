export const LEFT_LIST = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
];

export const RIGHT_LIST = [
    "Redux",
    "Next.js",
    "Webpack",
    "TypeScript",
    "Babel",
];


export const convertArrayToObject = (array: string[]) => {
    return (
        array.reduce((acc,label)=>{
            acc[label] = false;
            return acc;
        }, {} as Record<string, boolean>)
    )
};