//Player x
let playerx = 'x';
let playerxcount = 0;

//Player o
let playero = 'o';
let playerocount = 0;

//The turn and board
let turn = 0;
let board = 0;

//the 3x3 grid and each possible winning combination
let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const combination = [
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 4, 8],
	[2, 4, 6],
];

let isBoardSaved = false;
let savedGameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

//Takes in
function populate(i) {
	let moveturn = document.createElement('div');
	moveturn.className =
		'border-2 border-black cursor-pointer flex items-center justify-center h-full w-full text-5xl moveturn-class';
	moveturn.addEventListener(
		'click',
		(event) => {
			const { target } = event;
			target.textContent = turn;

			gameBoard[i] = turn;
			localStorage.setItem('savedBoard', JSON.stringify(gameBoard));

			point();

			if (turn === playero) {
				turn = playerx;
			} else {
				turn = playero;
			}
			localStorage.setItem('savedTurn', turn);
		},
		{ once: true }
	);
	return moveturn;
}

function point() {
	for (let combo of combination) {
		if (
			(gameBoard[combo[0]] === gameBoard[combo[1]] &&
				gameBoard[combo[1]] === gameBoard[combo[2]] &&
				gameBoard[combo[0]] !== 0) ||
			(savedGameBoard[combo[0]] === savedGameBoard[combo[1]] &&
				savedGameBoard[combo[1]] === savedGameBoard[combo[2]] &&
				savedGameBoard[combo[0]] !== 0)
		) {
			console.log('this was called');
			document.getElementById('hid').innerHTML = `Player ${turn} won the game`;
			if (turn === 'o') {
				playerocount += 1;
				localStorage.setItem('savedPlayerO', playerocount);
				document.getElementById('play1').innerHTML = `${playerocount}`;
				// set a 1 second timeout to reset the game
				setTimeout(() => {
					console.log('reseting game');
					resetGame();
				}, 500);
			} else if (turn === 'x') {
				playerxcount += 1;
				localStorage.setItem('savedPlayerX', playerxcount);
				document.getElementById('play2').innerHTML = `${playerxcount}`;
				resetGame();
				setTimeout(() => {
					console.log('reseting game');
					resetGame();
				}, 500);
			}
		}
	}
}

function start() {
	turn = playero;
	board = document.getElementById('boardid');

	console.log('savedGameBoard', savedGameBoard);

	document.getElementById('play1').innerHTML = `${localStorage.getItem(
		'savedPlayerO'
	)}`;
	if (document.getElementById('play1').innerHTML === 'null') {
		document.getElementById('play1').innerHTML = '0';
	}

	if (localStorage.getItem('savedPlayerX') === 'null') {
		document.getElementById('play2').innerHTML = '0';
	}
	document.getElementById('play2').innerHTML = `${localStorage.getItem(
		'savedPlayerX'
	)}`;

	if (localStorage.getItem('savedBoard')) {
		// populate the board with the saved board
		savedGameBoard = JSON.parse(localStorage.getItem('savedBoard'));
		gameBoard = savedGameBoard;
		console.log('gameBoard', gameBoard);
		turn = localStorage.getItem('savedTurn');

		for (let i = 0; i < savedGameBoard.length; i++) {
			if (savedGameBoard[i] !== 0) {
				const div = document.createElement('div');
				div.className =
					'border-2 border-black cursor-pointer flex items-center justify-center h-full w-full text-5xl moveturn-class';
				div.textContent = savedGameBoard[i];
				board.appendChild(div);
				// check if someone won
				point();
			} else {
				board.appendChild(populate(i));
			}
		}
	} else {
		for (let i = 0; i < 9; i++) {
			board.appendChild(populate(i));
		}
	}
	document.body.appendChild(board);
}

function resetGame() {
	console.log('reseting game');
	localStorage.removeItem('savedBoard');
	localStorage.removeItem('savedTurn');
	gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	savedGameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	board = document.getElementById('boardid');
	board.innerHTML = '';
	document.getElementById('hid').innerHTML = '';
	document.getElementById('play1').innerHTML = `${playerocount}`;
	document.getElementById('play2').innerHTML = `${playerxcount}`;
	start();
}

let button = document.getElementById('resetButton');
button.addEventListener('click', resetGame);
start();
