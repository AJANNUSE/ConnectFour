/*
   version 0.1
   All source under GPL version 3 or latter
   (GNU General Public License - http://www.gnu.org/)
   contact martin@linux.com for more information about this code
*/

function Board(rows, cols, piece_size) {
	this.rows = rows;
	this.cols = cols;
	this.piece_size = piece_size;
	this.board = [];
	this.whoToMove = "red";
	this.isGameOver = false;
	this.winner = "nobody";

	for (let i = 0; i<this.rows * this.cols; i++) {
		this.board.push("empty")
	}
}

Board.prototype.show = function() {
	background(0,0,255); 
	for (let row = 0; row < this.rows; row++) {
		for (let col = 0; col < this.cols; col++) {
			let piece = this.board[row*board_cols + col];
			let xpos = this.piece_size*(0.5 + col);
			let ypos = this.piece_size*(0.5 + row);
			if (piece == "empty") fill(255);
			if (piece == "red") fill(255,0,0);
			if (piece == "yellow") fill(255,255,0);
			stroke(0);
			strokeWeight(3);
			ellipse(xpos,ypos, piece_size*0.9); 
		}
	}
}

Board.prototype.put = function(col) {
	console.log(this.isGameOver);
	if (this.isGameOver == true) {
		return;
	}
	for (row = this.rows-1; row >=0 && this.board[col + row*this.cols] != "empty" ; row--) { ; }
	if (row >= 0) {
		this.board[col + row*this.cols] = this.whoToMove;
		this.whoToMove = (this.whoToMove == "red"?"yellow":"red");
	}
}

Board.prototype.get = function(row, col) {
	return this.board[col + row*this.cols];
}
