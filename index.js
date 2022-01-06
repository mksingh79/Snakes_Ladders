const grid = document.querySelector('.grid')
const rollDice = document.getElementById("rollDice")

const number = document.getElementById("number")
const gameEnd = document.getElementById("gameover")
const width = 40  //40*10 matrix
let squares = []
let evenSquares = []
let oddSquares = []

let snakes = [[13,7],[38,17],[51,27],[55,36],[91,65],[98,76]]
let snake_head = []
let snake_tail = []
let ladder = [[34,3],[41,19],[48,30],[60,33],[72,69],[93,63]]
let ladder_head = []
let ladder_tail = []
let currentSquare = 0 //initial position of every player corresponds to squares[0]
let oddInit = 100
let evenInit = 81
let diceNum = 0
let start = true

function createGrid(){
    for ( let j= 1; j <= 10; j++){
        if ( j % 2 == 0){
            // even sequence 
            // start from 81 go to 90
            let counter = evenInit

            for (let i=counter; i<= counter+9; i++){
                const square = document.createElement("div")
                square.classList.add("square")
                grid.appendChild(square)  
                square.textContent = i    
                evenSquares.push(square) 
            }
            evenInit = evenInit - 20
            squares = squares.concat(evenSquares.reverse())
            evenSquares = []
        } else {
            // odd sequence
            // start from 100 go to 91
            let counter = oddInit

            for ( let i=counter; i>= counter-9; i--){
                const square = document.createElement("div")
                square.classList.add("square")
                grid.appendChild(square)    
                square.textContent = i    
                oddSquares.push(square)  
                
            } 
            oddInit = oddInit - 20
            squares = squares.concat(oddSquares)
            oddSquares = []
        }
        
    }
    
}
createGrid()
squares = squares.reverse() //reverse 
squares[currentSquare].classList.add("currentPos_1")

function createSnakes(){
    for (let i = 0; i < snakes.length; i++){
        snake_head.push(snakes[i][0])
        snake_tail.push(snakes[i][1])  
        squares[snakes[i][0]].classList.add("snakeHead")
        squares[snakes[i][1]].classList.add("snakeTail")
    }
    console.log(snake_head, snake_tail)
}
createSnakes()

function createLadder(){
    for (let i = 0; i<ladder.length; i++){
        ladder_head.push(ladder[i][0])
        ladder_tail.push(ladder[i][1])
        squares[ladder[i][0]].classList.add("ladderHead")
        squares[ladder[i][1]].classList.add("ladderTail")
    }
    console.log(ladder_head, ladder_tail)
}
createLadder()

function diceRoll(){
    if (start === true){
        diceNum = Math.floor(Math.random()*6 + 1)
        number.innerText = diceNum
        move()
    } else {
        gameEnd.textContent = "Please refresh the page to restart the game."
    }
    
}

function move(){
    if (start === true){
        if (currentSquare+diceNum < 99){
            if (snake_head.includes(currentSquare+diceNum)){
                console.log("Snake Head reached")
                let k = snake_head.indexOf(currentSquare+diceNum) // capture the index of the element in array
                squares[currentSquare].classList.remove("currentPos_1")
                currentSquare = snake_tail[k]
                squares[currentSquare].classList.add("currentPos_1")
                
            } else {
                if (ladder_tail.includes(currentSquare+diceNum)){
                    console.log("ladder reached")
                    let k = ladder_tail.indexOf(currentSquare+diceNum) 
                    squares[currentSquare].classList.remove("currentPos_1")
                    currentSquare = ladder_head[k]
                    squares[currentSquare].classList.add("currentPos_1")
                }
                squares[currentSquare].classList.remove("currentPos_1")
                squares[currentSquare + diceNum].classList.add("currentPos_1")
                currentSquare = currentSquare + diceNum
                console.log(currentSquare)
            }
            
        } else {
            if (currentSquare+diceNum === 99){
                squares[currentSquare].classList.remove("currentPos_1")
                squares[99].classList.add("currentPos_1")
                gameEnd.textContent = "Congratulations you have Won!"
                start = false
            }
        }
    }
    
    
}

rollDice.addEventListener("click", diceRoll)