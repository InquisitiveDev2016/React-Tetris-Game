import {useState, useEffect, useCallback} from 'react';

export const useGameStatus = rowsCleared => {
   
    const   [score, setScore] = useState(0);
    const   [rows, setRows] = useState(0);
    const   [level, setLevel] = useState(0);

    //These represent the scores from the original tetris game
    const   linePoints = [40, 100, 300, 1200];
    const calcScore = useCallback(() => {
        //Check if we have score
        //if we clear any rows on the render:
        if(rowsCleared > 0){
            //The calculation of the original tetris score
            setScore(prev => prev + linePoints[rowsCleared -1] * (level + 1));
            setRows(prev => prev + rowsCleared)
        }
    }, [level, linePoints, rowsCleared])

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score])

    return [score, setScore, rows, setRows, level, setLevel];

}