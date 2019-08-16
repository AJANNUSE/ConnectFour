/*
   version 0.1
   All source under GPL version 3 or latter
   (GNU General Public License - http://www.gnu.org/)
   contact martin@linux.com for more information about this code
 */

class Board {
	constructor(rows, cols, piece_size) {
		this.rows = rows;
		this.cols = cols;
		this.piece_size = piece_size;
		this.board = [];
		this.whoToMove = "red";
		this.isGameOver = false;
		this.winner = "nobody";

		for (let i = 0; i<this.rows * this.cols; i++) { this.board.push("empty") }
	}

	show() {
		background(0,0,255); 
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				let piece = this.board[row*board_cols + col];
				let xpos = this.piece_size*(0.5 + col);
				let ypos = this.piece_size*(0.5 + row);
				if (piece == "empty") fill(255);
				if (piece == "red" || piece == "winner_red") fill(255,0,0);
				if (piece == "yellow" || piece == "winner_yellow") fill(255,255,0);
				stroke(0);
				strokeWeight(3);
				ellipse(xpos, ypos, piece_size*0.9); 
				if (piece == "winner_red" || piece == "winner_yellow" ) {
					fill(255);
					strokeWeight(1);
					ellipse(xpos, ypos, piece_size*0.2);
				}
			}
		}
	}

	put(col) {
		if (this.isGameOver == true) return;

		for (var row = this.rows-1; row >=0 && this.board[col + row*this.cols] != "empty" ; row--) { ; } 
		if (row >= 0) {
			this.board[col + row*this.cols] = this.whoToMove;
			checkForWin(col, row);
			if (this.isGameOver != true) {
				// switch player
				this.whoToMove = (this.whoToMove == "red"?"yellow":"red");
			}
		}
	}

	get(row, col) { return this.board[col + row*this.cols]; }
	
	checkForWin(col, row) {
		if (this.isGameOver == true) return;
		// check for winning move
		let winner = (this.whoToMove == "red")?"winner_red":"winner_yellow";
		if (row <= 2 && 
				this.whoToMove == this.board[col + (row+1)*this.cols] &&
				this.whoToMove == this.board[col + (row+2)*this.cols] &&
				this.whoToMove == this.board[col + (row+3)*this.cols]) 
		{
			this.winner = this.whoToMove;
			this.isGameOver = true;
			this.board[col + (row+0)*this.cols] = winner;
			this.board[col + (row+1)*this.cols] = winner;
			this.board[col + (row+2)*this.cols] = winner;
			this.board[col + (row+3)*this.cols] = winner;
			return;
		}
		let matches = 0;
		for (let i = 0; i < this.cols; i++) {
			if (this.whoToMove == this.board[i + row*this.cols]) {
				matches++;
				if (matches == 4) {
					this.winner = this.whoToMove;
					this.isGameOver = true;
					this.board[(i-0) + row*this.cols] = winner;
					this.board[(i-1) + row*this.cols] = winner;
					this.board[(i-2) + row*this.cols] = winner;
					this.board[(i-3) + row*this.cols] = winner;
					return;
				}
			} else { matches = 0 }
		}
		for (let start_col = 0; start_col + 3 < this.cols; start_col++) {  // NW -> SE
			for (let start_row = 0; start_row + 3 < this.rows; start_row++) {
				matches = 0;
				for (let i = 0; i < 4; i++) {
					if (this.whoToMove == this.board[(start_col+i) + (start_row+i)*this.cols]) { matches++; }
					if (matches == 4) {
						this.winner = this.whoToMove;
						this.isGameOver = true;
						this.board[(start_col+0) + (start_row+0)*this.cols] = winner;
						this.board[(start_col+1) + (start_row+1)*this.cols] = winner;
						this.board[(start_col+2) + (start_row+2)*this.cols] = winner;
						this.board[(start_col+3) + (start_row+3)*this.cols] = winner;
						return;
					}
				}
			}
		}
		for (let start_col = 3; start_col + 3 < this.cols; start_col++) {  // NE -> SW
			for (let start_row = 0; start_row + 3 < this.rows; start_row++) {
				matches = 0;
				for (let i = 0; i < 4; i++) {
					if (this.whoToMove == this.board[(start_col-i) + (start_row+i)*this.cols]) { matches++; }
					if (matches == 4) {
						this.winner = this.whoToMove;
						this.isGameOver = true;
						this.board[(start_col-0) + (start_row+0)*this.cols] = winner;
						this.board[(start_col-1) + (start_row+1)*this.cols] = winner;
						this.board[(start_col-2) + (start_row+2)*this.cols] = winner;
						this.board[(start_col-3) + (start_row+3)*this.cols] = winner;
						return;
					}
				}
			}
		}
	} // checkForWin

}
