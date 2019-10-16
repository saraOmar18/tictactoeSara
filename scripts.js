const gameFinishedButton = document.createElement('div')

// set and get the scores of the player
function Player(name, scoreEl) {
	let score = 0;

	let getScore = () => {
		return score; }

	let addScore = () => {
		score++;}

	let getName = () => {
		return name; }

	let setScore = () => {
		scoreEl.textContent = getScore(); }
	return {
		addScore,
		getName,
		setScore
	}
}

function Piece(piece) {
	let setAnswer = answer => {
		if(!getAnswer()) {
			piece.textContent = answer;
			return true; 	}
		   return false;    }

	let getAnswer = () => {
		return piece.textContent;
	}

	let reset = () => {
		piece.textContent = "";
	}

	return {
		setAnswer, getAnswer, reset
	} } 


	
    (function() {
	let gameboard = [];
	let player1Turn = true;
	let pieces = document.querySelectorAll(".piece");
	let msgContainer = document.querySelector(".messageContainer");
	let msgHeader = document.querySelector(".messageHeader");
	let msgText = document.querySelector(".messageText");
	let playAgain = document.querySelector(".play-again");
	let container = document.querySelector(".mycontainer");
     //  sending the current score 
	let player1 = Player("Player 1", document.querySelector(".player-1 .score"));
	let player2 = Player("Player 2", document.querySelector(".player-2 .score"));
    playAgain.addEventListener("click", function() {
		reset(); 
	});

	    function reset() {
			gameFinishedButton.innerHTML = ''
		container.classList.remove("blur");
		msgContainer.classList.add("hidden");
		gameboard.forEach(function(piece) { 
			piece.reset();  });
		start();
	}

	function boardIsFull() {
		for(let i=0; i < gameboard.length; i++) {
			if(!gameboard[i].getAnswer()) {
				return false; }}
		        return true; }

	function gameOver() {
		let one = gameboard[0].getAnswer();
		let two = gameboard[1].getAnswer();
		let three = gameboard[2].getAnswer();
		let four = gameboard[3].getAnswer();
		let five = gameboard[4].getAnswer();
		let six = gameboard[5].getAnswer();
		let seven = gameboard[6].getAnswer();
		let eight = gameboard[7].getAnswer();
		let nine = gameboard[8].getAnswer();

		// calculating the answers horizontally 
		if((one && (one == two && two == three)) || (four && (four == five && five == six)) || (seven && (seven == eight && eight == nine))) {
			return true; }

		// calculating the answers vertically 
		else if((one && (one == four && four == seven)) || (two && (two == five && five == eight)) || (three && (three == six && six == nine))) {
			return true; }

		// calculating the answers diagonally 
		else if((one && (one == five && five == nine)) || (three && (three == five && five == seven))) {
			return true;}
		    return false;
	}

	    function showMessage(header, text) {
		msgHeader.textContent = header;
		msgText.textContent = text;
		msgContainer.classList.remove("hidden");
		container.classList.add("blur");
	
		msgContainer.appendChild(gameFinishedButton)
        gameFinishedButton.setAttribute('id','gameFinishedButton')
    if (header == "Cat's Game") {
		gameFinishedButton.innerHTML = '<div><img style="height:300px;" src="https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif"></div>'
		
    } else {
        gameFinishedButton.innerHTML = '<div><img  style="height:300px;" src="https://media.giphy.com/media/TztOD2c0znrtm/giphy.gif"></div>'
    }
	}

	function start() {
		for(let i=0; i < pieces.length; i++) {
			let piece = pieces[i];
            piece.addEventListener("click", function() {
                   let success = false;
				if(!gameOver()) {
					success = gameboard[i].setAnswer(player1Turn ? "X" : "O"); }
                
				if(success) {
					if(gameOver()) {
						let winner = "";
						if(player1Turn) {
							winner = player1.getName();
							player1.addScore();
							player1.setScore();} 
							else {
							winner = player2.getName();
							player2.addScore();
							player2.setScore();}

						showMessage(winner, "Won the Game!");	} 
						else if(boardIsFull()) {
						showMessage("Cat's Game", "It's a tie!"); }
						 else {
						player1Turn = player1Turn ? false : true;
					}
				}
			});

			gameboard.push(Piece(piece));
		}
	}

	             start();
})(); 