(function () {
// Used anonymous closure to hide variables from the parent (global) namespace
	
	document.addEventListener("DOMContentLoaded", startGame);

	let str;
	let posStr;
	let gameLevel;

	let hasFlippedCard = false;
	let lockBoard = false;
	let firstCard, secondCard;
	let gameTime = 0;
	let usedTime;
	let trial = 0;
	let cardPair = 0;

	let numberImg;
	let numImgAvailable = 60;

	let numEasyGameImg = 4;
	let numStandardGameImg = 6;
	let numHardGameImg = 8;
	let numExpertGameImg = 20;

						
	function flipCard() {
	  if (lockBoard) return;
	  if (this === firstCard) return;

	  this.classList.add('flip'); // rotate card 180 degre

	  if (!hasFlippedCard) {
		// first click
		hasFlippedCard = true;
		firstCard = this;

		return;
	  }

	  // second click
	  secondCard = this;

	  checkForMatch();
	}

	function checkForMatch() {
	  let isMatch = firstCard.dataset.storage === secondCard.dataset.storage;

	  isMatch ? disableCards() : unflipCards();
	}

	function disableCards() {
	  firstCard.removeEventListener('click', flipCard);
	  secondCard.removeEventListener('click', flipCard);
	  
	  trial += 1;
	  document.getElementById('trialView').innerHTML = trial;
	  
	  cardPair += 1;
	  document.getElementById('pointView').innerHTML = cardPair;
	  
	  if (cardPair == numberImg) {
		clearInterval(usedTime);  
	  }

	  resetBoard();
	}

	function unflipCards() {
	  lockBoard = true; // Prevent that something happened if you click a card while two cards are flipping back

	  setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
	  }, 1600); // flip cards back after 1.6 sec.
	  
	  trial += 1;
	  document.getElementById('trialView').innerHTML = trial;
	}

	function resetBoard() {
	  hasFlippedCard = false;
	  lockBoard = false;
	  firstCard = null;
	  secondCard = null;
	}

	function timer(duration, display) {
		let varDuration = duration / 1000;
		varDuration += 1;
		let varTimer = varDuration, minutes, seconds;

		usedTime = setInterval(function () {
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

	function getGameLevel() {
		// get url parameter
		str =  window.location.search;
		posStr = str.search("=");
		gameLevel = window.location.search.substr(posStr + 1);	
	}
		
	function insertImages() {
		// adjust image container height
		if (gameLevel === "expertGame") {
		  numberImg = numExpertGameImg;
		  document.getElementById("memoryGame").style.width = '1600px';
		}
		else if (gameLevel === "hardGame") numberImg = numHardGameImg;
		else if (gameLevel === "standardGame") {
		  numberImg = numStandardGameImg;
		  document.getElementById("memoryGame").style.height = '480px';
		}
		else if (gameLevel === "easyGame") {
		  numberImg = numEasyGameImg;
		  document.getElementById("memoryGame").style.height = '320px';
		}
		else numberImg = numEasyGameImg;

		
		const arrImgAvailable = [];
		for (let y = 0; y < numImgAvailable; y++) {
			arrImgAvailable[y] = y;
		}
		arrImgAvailable.sort(() => Math.random() - 0.5);
		
		str = "";
		for (let x = 0; x < numberImg; x++) {
			str += '<div class="memoryCard" data-storage="image' + arrImgAvailable[x] + '"><img class="frontFace" src="./img/image' + arrImgAvailable[x] + '.png" alt=""><img class="backFace" src="./img/backFace.png" alt=""></div> \
			<div class="memoryCard" data-storage="image' + arrImgAvailable[x] + '"><img class="frontFace" src="./img/image' + arrImgAvailable[x] + '.png" alt=""><img class="backFace" src="./img/backFace.png" alt=""></div>';						
		} 
		memoryGame.innerHTML = str;
	}

	function shuffleCards() {
		const cards = document.querySelectorAll('.memoryCard');
		// shuffle the cards and add event listener
		cards.forEach(card => {
			let randomPos = Math.floor(Math.random() * numberImg); // generate a number between 0 - numberImg
			card.style.order = randomPos;
		});
		cards.forEach(card => card.addEventListener('click', flipCard));
	}

	function addEvents() {
		document.getElementById("btnEndGame").addEventListener("click", function(){
			let minutes, seconds;
			
			clearInterval(usedTime);
			
			if (document.getElementById("timeView").textContent.substr(0, 1) == "0") 
			  minutes = document.getElementById("timeView").textContent.substr(1, 1);
			else minutes = document.getElementById("timeView").textContent.substr(0, 2);

			if (document.getElementById("timeView").textContent.substr(3, 1) == "0") 
			  seconds = document.getElementById("timeView").textContent.substr(4, 1);
			else seconds = document.getElementById("timeView").textContent.substr(3, 2);
			
			document.getElementById("gameModes").innerHTML = '<section id="endGame"><h1>Spillet er ovre. Du brugte ' + trial + ' forsøg på ' + minutes + ' minutter og ' + seconds + ' sekunder.</br> Flot gjort!</h1></section>';
		});
		
		document.getElementById("btnRestartGame").addEventListener("click", function(){
			location.href = "./index.html";
		});	
	}

	function startGame() {
		
		getGameLevel();	
		insertImages();
		shuffleCards();
		addEvents();				
		timer(gameTime, 'timeView'); // start timer and display elapsed time
		
	}
	
}());



