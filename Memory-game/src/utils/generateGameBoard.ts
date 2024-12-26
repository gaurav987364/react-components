export type GameType =  "4x4" | "6x6";
type RandomSpots = {
    [randomSpots:string]:{x:number, y:number};
}
export const generateGameboard = (type:GameType): Array<Array<number>> => {
    let ROWS : number;
    let COLUMNS : number;

    if(type === "4x4"){
        ROWS = 4;
        COLUMNS = 4;
    }else {
        ROWS = 6;
        COLUMNS = 6;
    }

    const board:Array<Array<number>> = [];
    for(let i=0; i<ROWS; i++) {
        board.push([]);  //? board becomes [[],[],[],[]]; 4x4 array
        for(let j=0; j<COLUMNS; j++) {
            board[i].push(0); //? board becomes [[0],[0],[0],[0]];
        }
    }
    return insertRandomNumberToBoard(board);
};


export const insertRandomNumberToBoard = (board:Array<Array<number>>)=>{
    const computedBoard = board;
    console.log(computedBoard);
    let NUM_OF_SPOTS: number;
    let MAX_NUMBERS: number;

    if(computedBoard.length === 4){
        NUM_OF_SPOTS = 16;
        MAX_NUMBERS = 4;
    } else{
        NUM_OF_SPOTS = 36;
        MAX_NUMBERS = 6;
    };

    const randomSpots:RandomSpots = {};

    while(true){
        if(Object.keys(randomSpots).length === NUM_OF_SPOTS){
            break;
        }
        const x = Math.floor(Math.random() * MAX_NUMBERS); //value
        const y = Math.floor(Math.random() * MAX_NUMBERS); //value
        const randomSpotKey = Math.random(); //key

        if(!Object.values(randomSpots).find((val)=> val.x === x && val.y === y)){
            randomSpots[randomSpotKey] = {x, y};
        }
    };

    console.log(randomSpots);

    let counter = 2;
    let currentNumber = 1;

    Object.values(randomSpots).forEach((spot)=>{
        computedBoard[spot.x][spot.y] = currentNumber;
        counter--;
        if(counter === 0){
            counter = 2;
            currentNumber++;
        }
    });
    return computedBoard;
};