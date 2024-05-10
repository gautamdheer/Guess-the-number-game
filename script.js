let randomNumber = null;
let optionContainer = document.getElementById('option-container');
const colorContainer = document.getElementById('color-code');
const scoreContainer = document.getElementById('score');
let score = 0;

function generateRandomNumbersBetween(myMin, myMax){
    return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
}

function generateRandomRGB(){
    const red = generateRandomNumbersBetween(1,255);
    const green = generateRandomNumbersBetween(1,255);
    const blue = generateRandomNumbersBetween(1,255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function increaseScore(){
    score += 1;
    scoreContainer.innerText = score;
}
function validateResult(el){
    const selectedColor = el.target.style.backgroundColor;
    if(selectedColor == randomNumber){
        increaseScore();
    }
    else{
        score = 0;
    }
    window.localStorage.setItem('score',score);
    startGame();
}

function startGame(){
    score = Number(window.localStorage.getItem('score')) ?? 0;  
    scoreContainer.innerText = score;
    optionContainer.innerHTML = null;
    randomNumber = generateRandomRGB();
    colorContainer.innerText = randomNumber;
    const ansIndex = generateRandomNumbersBetween(0,5)
    
    for (let index = 0; index < 6; index++) {
        const div = document.createElement('div');
        div.addEventListener('click', validateResult)
        div.style.backgroundColor = index === ansIndex ? randomNumber : generateRandomRGB();
        optionContainer.append(div);
    }
}


window.addEventListener('load',() => startGame());