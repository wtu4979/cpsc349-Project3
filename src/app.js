let playerx = 'x';
let playerxcount = 0;

let playero = 'o';
let playerocount = 0;

let turn = 0;
let board = 0;
let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function fillin(eachmove) {
	let moveturn = document.createElement('div');
	moveturn.className =
		'border-2 border-black cursor-pointer flex items-center justify-center h-full w-full text-5xl moveturn-class';
	moveturn.addEventListener(
		'click',
		(event) => {
			const { target } = event;
			target.textContent = turn;
			gameBoard[eachmove] = turn;
			checkBoard();

			if (turn === playero) {
				turn = playerx;
			} else {
				turn = playero;
			}
		},
		{ once: true }
	);
	return moveturn;
}

function checkBoard() {
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

	for (let combo of combination) {
		let [combo1, combo2, combo3] = combo;
		if (
			gameBoard[combo1] !== '' &&
			gameBoard[combo1] === gameBoard[combo2] &&
			gameBoard[combo1] === gameBoard[combo3]
		) {
			document.getElementById('hid').innerHTML = `Player ${turn} won the game`;
			if (turn === 'o') {
				playerocount += 1;
				document.getElementById('play1').innerHTML = `${playerocount}`;
			} else if (turn === 'x') {
				playerxcount += 1;
				document.getElementById('play2').innerHTML = `${playerxcount}`;
			}
		}
	}
}

function start() {
	turn = playero;
	board = document.getElementById('boardid');

	for (let i = 0; i < 9; i++) {
		board.appendChild(fillin(i));
	}

	gameBoard.fill('');

	document.body.appendChild(board);
}

start();
