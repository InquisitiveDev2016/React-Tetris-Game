import React, {useState} from "react";

import {createStage, checkCollision} from "../gameHelpers";

//Styled Components
import {StyledTetrisWrapper, StyledTetris} from './styles/StyledTetris';


//Custom Hooks
import { useInterval } from '../hooks/useInterval';
import {usePlayer} from '../hooks/usePlayer';
import {useStage} from '../hooks/useStage';
import {useGameStatus } from '../hooks/useGameStatus';

//Components

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { reset } from "ansi-colors";

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
    
    

    console.log('re-render');


    const movePlayer = dir => {
        if(!checkCollision(player, stage, { x: dir, y: 0})) {
            updatePlayerPos({x: dir, y: 0})
        }
    }

    const startGame = () => {
        //Reset everything
        //1000 equals to 1 second
        setDropTime(1000);
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        // Increase level when player has cleared 10 rows
        if(rows > (level + 1) * 10){
            setLevel(prev => prev + 1);
            //Also need to increase speed
            setDropTime(1000 / (level + 1) + 200);
        }
        if(!checkCollision(player, stage, { x: 0, y: 1})){
            //y is 1 because we are dropping the tetromino
            updatePlayerPos({x: 0, y: 1, collided: false});
        }
        else{
            //Create something when the game is over
            //When y < 1 we know that we are colliding at the top of the stage
            if(player.pos.y < 1){
                console.log("GAME OVER");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true})
        }
        
        
    }

    const keyUp = ({ keyCode }) => {
        if(!gameOver){
            //if the down key is pressed then the interval(the fact that the tetromino automatically drops)
            //turns on
            if(keyCode === 40){
                console.log("interval on");
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        console.log("interval off");
        setDropTime(null);
        drop();

    }

    const move = ({ keyCode }) => {
        if(!gameOver){
            //37 and 39 is the keycode for the left  and right arrow of the keyboard
            //Since we are moving to the left we put movePlayer to -1
            if(keyCode === 37){
                movePlayer(-1);
            } else if(keyCode === 39){
                movePlayer(1);
            } else if(keyCode === 40){
                dropPlayer();
            } else if(keyCode === 38){
                //Rotating it clockwise
                playerRotate(stage, 1);
            }
        }
    }

    useInterval(()=>{
        drop();
    }, dropTime)

    return (
        //StyledTetrisWrapper allows us to register clicks on any part of the website, and not just the stage
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyledTetris>
            <Stage stage={stage}/>
            {/* The side bar */}
            <aside>
                {gameOver ? (
                    <Display gameOver={gameOver} text="Game Over" />
                ) : (
                <div>
                    <Display text={`Score: ${score}`} />
                    <Display text={`Rows: ${rows}`} />
                    <Display text={`Level: ${level}`} />
                </div>

                )}

                <StartButton callback={startGame}/>
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};


export default Tetris;