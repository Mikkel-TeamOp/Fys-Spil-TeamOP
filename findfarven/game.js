(function () {
// Used anonymous closure to hide variables from the parent (global) namespace
	document.addEventListener("DOMContentLoaded", startGame);
	
	// initialize game
	let easyGame = 12; // number of colors to choose from
	let standardGame = 18;
	let hardGame = 24;

	let easyGameMinutes = 2;
	let easyGameSeconds = 0;
	let standardGameMinutes = 4;
	let standardGameSeconds = 0;
	let hardGameMinutes = 5;
	let hardGameSeconds = 0;
	
	let trial = 0;
	let point = 0;
		
	let soundFailure = new Audio('./sound/failure.wav');
	let soundPoint = new Audio('./sound/point.wav');
	let soundGameOver = new Audio('./sound/game-over.wav');
	soundFailure.volume = 0.5;
	soundPoint.volume = 1.0;	
	soundGameOver.volume = 0.7;
	
	const colorArr = [];
		
	// end initialize game
	
	let numColor;
	let randomColor;
	let bgColor;
	
	let minutes;
	let seconds;

	let countDownTimer;
	let modeSelected;
	
	
			   
	function getModeSelected() {
		// get url parameter
		let str =  window.location.search;
		let posStr = str.search("=");
		modeSelected = window.location.search.substr(posStr + 1);	
	}
	
	function setGameTime() {	
		let str;
		
		switch (modeSelected) {
			case "easyGame":
				minutes = easyGameMinutes;
				seconds = easyGameSeconds;
				break;
			case "standardGame":
				minutes = standardGameMinutes;
				seconds = standardGameSeconds;
				break;
			case "hardGame":
				minutes = hardGameMinutes;
				seconds = hardGameSeconds;
				break;		
			default:
				minutes = easyGameMinutes;
				seconds = easyGameSeconds;
				break;
		}
		
		if (seconds < 10 ) str = '0' + minutes + ':0' + seconds;
		else str = '0' + minutes + ':' + seconds;
		
		document.getElementById("timeView").innerHTML = str;
		
	}
	
 	// called every second
	function downCount() {		
		let str;
		
        if (seconds > 0) {
            seconds--;			
		} else if (minutes > 0) {
             minutes--;
			 seconds = 59;
        } else {
			clearInterval(countDownTimer); // time is up stop the time
			endGame();
        }

		if (seconds < 10 ) str = '0' + minutes + ':0' + seconds;
		else str = '0' + minutes + ':' + seconds;
		
		document.getElementById("timeView").innerHTML = str;
	
	}

	function insertColor() {
		let strInner = "";
		let strColor = "";
		
		// adjust number of random colors according to mode selected
		switch (modeSelected) {
			case "easyGame":
				numColor = easyGame;
				break;
			case "standardGame":
				numColor = standardGame;
				break;
			case "hardGame":
				numColor = hardGame;
				break;		
			default:
				numColor = standardGame;
				break;
		}				

		// insert numColor HTML elements in <div id="flex-container" class="flex-container"></div>
		for (let x = 0; x < numColor; x++) {			            
			strInner += '<div id="color' + x + '" class="colorChoice"></div>';
		} 
		document.getElementById("flex-container").innerHTML = strInner;

		// give the HTML elements above a random color
		
		genColorArr(numColor);
		
		for (let y = 0; y < numColor; y++) {
			let len = colorArr.length;
			randomColor = Math.floor(Math.random() * len); // pick a random color from array
			document.getElementById("color" + y).style.backgroundColor = "#" + colorArr[randomColor];
		}
	
		// select a random HTML element from above and its color. Set the round dot to the same color 
		randomColor = Math.floor(Math.random() * numColor);
		str = "color" + randomColor;
		bgColor = document.getElementById(str).style.backgroundColor;
		document.getElementById("color-dot").style.backgroundColor = bgColor;
	}

	function genColorArr(numColor) {
		let stepColor;
		let red;
		let green;
		let blue;
		
		colorArr.length = 0; // reset color array
		
		switch (numColor) {
			case easyGame:
				stepColor = 5;  // 256/64 + 1. creates 5 * 5 * 5 = 125 different colors
				break;
			case standardGame:
				stepColor = 9;  // 256/32 + 1. creates 9 * 9 * 9 = 729 different colors
				break;
			case hardGame:
				stepColor = 17; // 256/32 + 1. creates 17 * 17 * 17 = 4913 different colors
				break;		
			default:
				stepColor = 9;
				break;
		}

		for (let x = 0; x < stepColor; x++) {
			if (x > 0) red = x * 256/(stepColor - 1) - 1;	
			else red = 0;
			red = red.toString(16);
			if (red.length == 1) red = "0" + red;
			
			for (let y = 0; y < stepColor; y++) {
				if (y > 0) green = y * 256/(stepColor - 1) - 1 ;	
				else green = 0;
				green = green.toString(16);
				if (green.length == 1) green = "0" + green;
			
				for (let z = 0; z < stepColor; z++) {
					if (z > 0) blue = z * 256/(stepColor - 1) - 1;	
					else blue = 0;
					blue = blue.toString(16);
					if (blue.length == 1) blue = "0" + blue;
					
					colorArr.push(red + green + blue);				
				}
				blue = 0;				
			}
			green = 0;
		}
							
	}
	
	function startTimer() {
		countDownTimer = setInterval(downCount, 1000);
	}

	function endGame() {
		clearInterval(countDownTimer);
		document.getElementById("gameModes").innerHTML = '<section id="endGame"><h1>Spillet er ovre. Du fik ' + point + ' point og brugte ' + trial + ' forsøg.</br> Flot gjort!</h1></section>';
		soundGameOver.play();
	}
	
	function addEvents() {
		const colors = document.querySelectorAll('.colorChoice');		
		colors.forEach(color => color.addEventListener('click', clickImg));

		document.getElementById("btnEndGame").addEventListener("click", endGame);
			
		document.getElementById("btnRestartGame").addEventListener("click", function(){
			location.href = "./index.html";
		});	
	}

	function insertColorEvent() {
		insertColor(); // insert new colors
		addEvents();	  
	}
	
	function addOneTrial() {
		trial += 1;
		document.getElementById('trialView').innerHTML = trial;
		insertColorEvent();	  
	}
	
	function addOnePoint() {
		point += 1;
		document.getElementById('pointView').innerHTML = point;
		insertColorEvent();
	}
	
	function clickImg() {
		let tempStr1;
		let tempStr2;
		
		tempStr1 = document.getElementById(this.id).style.backgroundColor;
		tempStr2 = document.getElementById("color-dot").style.backgroundColor;
		
		if (tempStr1 === tempStr2) {
			addOnePoint(); 
			addOneTrial();
			soundPoint.play(); 
		}
		else {
			addOneTrial();
		    soundFailure.play();
		}
    }
	
	function startGame() {
		getModeSelected();
		setGameTime();
		insertColor();
		addEvents();
		startTimer(); // start count down timer
	}
	
}());



