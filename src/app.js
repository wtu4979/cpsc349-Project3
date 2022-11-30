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
let gameBoard = [	0, 0, 0, 
					0, 0, 0, 
					0, 0, 0];
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
			point();

			if(turn === playero) {
				turn = playerx;
			}else {
				turn = playero;
			}
		},
		{ once: true }
	);
	return moveturn;
}

function point() {
	for (let combo of combination) {
		if (
			(gameBoard[combo[0]] === gameBoard[combo[1]] && gameBoard[combo[1]] === gameBoard[combo[2]]) && (gameBoard[combo[0]] !== 0)
		) {
			document.getElementById('hid').innerHTML = `Player ${turn} won the game`;
			if(turn === 'o') {
				playerocount += 1;
				document.getElementById('play1').innerHTML = `${playerocount}`;
			}else if (turn === 'x') {
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
		board.appendChild(populate(i));
	}

	gameBoard.fill(0);

	document.body.appendChild(board);

	
}


start();
