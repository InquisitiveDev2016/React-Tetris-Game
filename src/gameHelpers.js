export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

//createStage  => creating a Matrice that will represent the grid
export const createStage = () => 
    Array.from(Array(STAGE_HEIGHT), ()=>

        //For each row, create a new array and then fill it with another array with values 0, and 'clear'
        //The 0 will be replaced with a letter that represents each tetromino 
        //The 'clear' property will be set to 'merge' when we will have a tetromino merge into the stage and not be cleared
        //in the next render
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )

export const checkCollision = (player, stage, {x: moveX, y: moveY}) => {
    for(let y = 0; y < player.tetromino.length; y+= 1){
        for(let x = 0; x < player.tetromino[0].length; x += 1){
            
            //1. Check that we're on an actual tetromino cell
            if(player.tetromino[y][x] !== 0){
                if(
                //2. Check that our movement is inside the game area's height (y)
                //Shouldn't go through the bottom of the play area
                !stage[y + player.pos.y + moveY] || 

                //3.  Check that the tetromino isn't moving outside of the area's width (x)
                !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] || 
                //4. Check if the cell isn't set to clear, if it is set to clear then we aren't colliding with anything
                stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
}