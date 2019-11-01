import React from "react";
import { StyledStage } from './styles/StyledStage';
import Cell from "./Cell";



//Create a stage, map through it, and when you map through the stage array, you get a row
//And each row has an array that holds the cells
//For each cell, render out the Cell component
//The type will be the first value of the cell array, which for now is '0' meaning no tetromino present
//However, it will change depending on the shape of the tetromino
const Stage = ({ stage }) => (
    <StyledStage width={ stage[0].length} height={stage.length}>
        
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    
    </StyledStage>
)

export default Stage;