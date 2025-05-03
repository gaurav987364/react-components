import { useEffect, useState } from "react";

const API = "https://api.datamuse.com/words?sp=?????&max=1000";
type LetterObjectType = Record<string,number>;


export const useFetchWord = () => {
    const [correctWord,setCorrectWord] = useState<string>("");
    const [correctLetterObj,setCorrectLetterObj] = useState({});
    const [loading, setLoading] = useState<boolean>(true);

    const getWords = async ()=>{
        try {
            const res = await fetch(`${API}`);
            const data = await res.json();
    
            //random index
            const randomIndex = Math.floor(Math.random() * data.length);
    
            //find word based on random index
            const word = data[randomIndex].word;
            console.log(word.toUpperCase());
    
            //create letter object;
            const letterObject:LetterObjectType = {};

            for(const letter of word){
                letterObject[letter.toUpperCase()] = (letterObject[letter.toUpperCase()] || 0) + 1;
            }

            //setting words
            setCorrectWord(word.toUpperCase());
            setCorrectLetterObj(letterObject);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        getWords();
    },[])
    

    return{
        correctWord,
        correctLetterObj,
        loading
    }
}
