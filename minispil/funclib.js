let pointCounter = 0
let lastPosition = ""
let countDown = 0
let endGameTimer = 0
let modeSelected = "" 
let gridenvironment = 'mainFrame'
let gameTime = 0
let mistakeMode = true
let mistakeCounter = 0
let displayTimeLeft = 0
let timeKeeper = 0


document.body.addEventListener('click', function(btn){
        if (btn.originalTarget.id === "easyGame" || btn.originalTarget.id === "standardGame" || btn.originalTarget.id === "hardGame" ) {
           
            modeSelected = btn.originalTarget.id
            timeKeeper = 0
            timeGame()
            startTheGame()
            if (mistakeMode) {
                lives()
            }
            timer(gameTime, 'timeView')
        }
        else if(btn.target.className == "randomObj"){
            mistakePoint()
            if (mistakeMode) {
                lives()
            }
        }   
        else if (btn.target.id !== modeSelected && btn.target.className === modeSelected && modeSelected !== "" ) {        
            pointCounter++
            let countChecker = pointCounter +" "
            if( pointCounter < 10){
                countChecker = "00" + countChecker
            }
            if(pointCounter >= 10){
                countChecker = "0"+ countChecker
            }
            document.getElementById('pointView').innerHTML = `${countChecker}`
            if (mistakeMode) {
                lives()
            }
            timeGame()
        }
        else if(btn.target.id === "btnRestartGame"){
            clearInterval(countDown)
            clearTimeout(endGameTimer)
            document.getElementById(gridenvironment).innerHTML = `   
                                                                    <button id="lifeGame">livs spil tilstand</button>
                                                                        <div class="game-modes">
                                                                            <h2 class="modeSelection" >Vælg sværhedsgrad.....</h2>
                                                                            <div class="game-Selectors">
                                                                                <button id="easyGame" class="easyGame modeSelection">Let</button>
                                                                                <button id="standardGame" class="standardGame modeSelection">Middel</button>
                                                                                <button id="hardGame" class="hardGame modeSelection" >Svær</button>
                                                                            </div>
                                                                        </div>`
            gameTime = 0
            mistakeMode = true
            mistakeCounter = 0
            removeGrid()  
            pointCounter = 0
            modeSelected = ""
            document.getElementById('pointView').innerHTML = `000`
            clearTimeout(displayTimeLeft)
            document.getElementById('timeView').innerHTML = "00:00"
            if (mistakeMode) {
                lives()
            }
        }
        else if(btn.target.id === "btnEndGame" && modeSelected !== ""){
            endGame()
        }
    }
)



function insertGrid(){
    let gridEle = document.getElementById(gridenvironment)
    gridEle.classList.remove('mainGrid-flex')
    gridEle.classList.add('mainGrid-Grid')

}

function removeGrid(){
    let gridEle = document.getElementById(gridenvironment)
    gridEle.classList.remove('mainGrid-Grid')
    gridEle.classList.add('mainGrid-flex')
}

function resetGame(){
    clearInterval(countDown)
    clearTimeout(endGameTimer)
    gameTime = 0
    mistakeMode = true
    mistakeCounter = 0
    pointCounter = 0
    document.getElementById('pointView').innerHTML = `000`
    clearTimeout(displayTimeLeft)
    document.getElementById('timeView').innerHTML = "00:00"
    if (mistakeMode) {
        lives()
    }
    timeKeeper = 0
    timer(gameTime, 'timeView')
}


function startTheGame(){
    
    insertGrid()
    let newPosition = (Math.floor(Math.random()*101) + "/" + Math.floor(Math.random()*101))

    while (newPosition == lastPosition) {
        newPosition = (Math.floor(Math.random()*101) + "/" + Math.floor(Math.random()*101))
    }
    document.getElementById(gridenvironment).innerHTML = `<button class="${modeSelected}" style="grid-area: ${lastPosition = newPosition}"></button>`
    

    randomAnnoy()
    randomAnnoy()
}

function randomAnnoy(){

    if (Math.floor(Math.random()*101) <= 90) {
        let randomPosition = (Math.floor(Math.random()*101) + "/" + Math.floor(Math.random()*101))
        while (randomPosition == lastPosition) {
            randomPosition = (Math.floor(Math.random()*101) + "/" + Math.floor(Math.random()*101))
        }
    
    let objSize = (Math.floor(Math.random()*450) + 80)
    let objColor = (Math.floor(Math.random()*16777215).toString(16))
    
    switch (modeSelected) {
        case "easyGame":
            while ((242, 196, 0) == objColor) {
                objColor = (Math.floor(Math.random()*16777215).toString(16))
            }
            break;
        case "standardGame":
            while ((70, 110, 180) == objColor) {
                objColor = (Math.floor(Math.random()*16777215).toString(16)) 
            }
            break;
        case "hardGame":
            while ((05, 23, 25) == objColor) {
                objColor = (Math.floor(Math.random()*16777215).toString(16))                    
            }
            break;
    
        default:
            break;
    }
    
    let node = `<button class="randomObj" style="grid-area:${randomPosition}; width:${objSize}px; height:${objSize}px; background-color: #${objColor};"></button>`
    let element = document.getElementById(gridenvironment)
    
    element.insertAdjacentHTML("beforeend" , node)
    }
}

function timeGame(){    
    
    switch (modeSelected) {
        case "easyGame":
            clearInterval(countDown)
            startTheGame()
            countDown = setInterval(function(){startTheGame()}, 6000)
            /*console.log("Easy Game: " + countDown)*/
            break;
        case "standardGame":
            clearInterval(countDown)
            startTheGame()
            countDown = setInterval(function(){startTheGame()}, 6000)
            break;
        case "hardGame":
            clearInterval(countDown)
            startTheGame()
            countDown = setInterval(function(){startTheGame()}, 3000)
            break;
        default:
            break;
    }

}


function endGame(){

    clearInterval(countDown)
    clearTimeout(displayTimeLeft)
    removeGrid()

    document.getElementById('timeView').innerHTML = "00:00"
    let perSek = pointCounter / timeKeeper
    perSek = parseFloat(perSek.toFixed(2))
    document.getElementById(gridenvironment).innerHTML = `<section id="endGame"><h1>Spillet er ovre du fik ${pointCounter} point på ${timeKeeper} sekunder</br> flot gjort!</h1></section>`
}

function gameOver(){
    
    clearInterval(displayTimeLeft)
    removeGrid() 
    document.getElementById('timeView').innerHTML = "00:00"
    document.getElementById(gridenvironment).innerHTML = `<section id="gameOver">&#9760;</section>` 
}

function completeClear(interargg, timearrg){

    clearInterval(interargg)
    clearTimeout(timearrg)
    gameOver()
}

function mistakePoint(){

    mistakeCounter++

    if (mistakeMode && mistakeCounter == 4) {
       completeClear(countDown, endGameTimer)   
    }
    else {
        timeGame()
    }
}

function lives(){
    let element = document.getElementById("livesView")
    let node = `<img src="./img/hjerte.png" class="livesImg">`
    
    
    switch (mistakeCounter) {
        case 0:
            element.innerHTML = `${node}${node}${node}`
            break;
        case 1:
            element.innerHTML = `${node}${node}`
            break;
        case 2:
            element.innerHTML = `${node}`
            break;
        case 3:
            element.innerHTML = ``
            break;
        default:
            break;
    }
}


function timer(duration, display){
    let varDuration = duration / 1000
    varDuration = varDuration + 1
    let varTimer = varDuration, minutes, seconds;

    displayTimeLeft = setInterval(function () {
        minutes = parseInt(varTimer / 60, 10);
        seconds = parseInt(varTimer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById(display).innerHTML = minutes + ":" + seconds;

        
        timeKeeper = varTimer
        if (++varTimer < 0) {
            varTimer = varDuration;
        }
    }, 1000);

}
