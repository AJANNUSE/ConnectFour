/*
   version 0.1
   All source under GPL version 3 or latter
   (GNU General Public License - http://www.gnu.org/)
   contact martin@linux.com for more information about this code
*/

let board_rows = 6;
let board_cols = 7;
let piece_size = 90;

let total_nn_players = 100;
let generations = 1;
let all_nn_players = [];

let computer_player;

function setup() {
	createCanvas(piece_size*board_cols, piece_size*board_rows);
	board = new Board(board_rows, board_cols, piece_size);

	for (let i = 0; i < total_nn_players; i++) { all_nn_players = new NNPlayer(); }
	computer_player = (random(1) < 0.5)?"yellow":"red";
}

function draw() {
	board.show();
}

function mousePressed() {
	let col = floor(mouseX / piece_size);
	board.put(col);
}

function keyReleased() {
	board.put(keyCode-"0".charCodeAt()-1);
}
