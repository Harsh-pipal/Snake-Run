//constants and variables
let inputDir = {x:0,y:0}             //direction of my snake
let speed =10;
let lastPaintTime = 0;
let snakeArray = [{x:5,y:10}];
let score = 0;
const bgmusic = new Audio("Monkeys-Spinning-Monkeys.mp3");
const gameover = new Audio("gameover.wav");
food = {x:13,y:5};

//functions

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){          //adjusting FPS...speed=2 thus 0.5FPS
        return
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArray){
    //bites itself
    for(let i=1;i<snakeArray.length;i++){
        if(snakeArray[0].x===snakeArray[i].x && snakeArray[0].y===snakeArray[i].y){
            return true;
        }
    }
    //collide with wall
    if(snakeArray[0].x>=18 || snakeArray[0].x<=0 || snakeArray[0].y>=18 || snakeArray[0].y<=0){
        return true;
    }
    return false;
}

function gameEngine(){
    //part1 is to update snake size, food and direction

    if(isCollide(snakeArray)){
        gameover.play();
        inputDir = {x:0,y:0};
        bgmusic.pause();
        alert("Game Over, Press any key to play again");
        snakeArray = [{x:5,y:10}];
        // bgmusic.play();
        score = 0;
    }

    //snake successfully eats the food
    if(snakeArray[0].x==food.x && snakeArray[0].y==food.y){
        snakeArray.unshift({x:snakeArray[0].x + inputDir.x,y:snakeArray[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        score++;
        scoreboard.innerHTML = "Score: " + score;
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        
    }

    //moving the snake
    for(let i=snakeArray.length-2;i>=0;i--){
        snakeArray[i+1] = {...snakeArray[i]};
    }    

    snakeArray[0].x+=inputDir.x;
    snakeArray[0].y+=inputDir.y;

    //part2 is to Display snake and food

    board.innerHTML = "";
    snakeArray.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        
        board.appendChild(snakeElement);
    })

    //displaying food now
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



//main logic
window.requestAnimationFrame(main);
bgmusic.play();
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:0};
    switch (e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});