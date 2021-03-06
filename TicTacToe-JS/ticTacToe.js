// NB: This doesn't include any AI.

(function (root) {

  var TTT = root.TTT = (root.TTT || {});


  var Game = TTT.Game = function TTT() {
    this.player = Game.marks[0];
    this.board = this.makeBoard();
  }

  Game.marks = ["X", "O"];

  Game.prototype.diagonalWinner = function () {
    var game = this;

    var diagonalPositions1 = [[0, 0], [1, 1], [2, 2]];
    var diagonalPositions2 = [[2, 0], [1, 1], [0, 2]];

    var winner = null;
    _(Game.marks).each(function (mark) {
      function didWinDiagonal (diagonalPositions) {
        return _.every(diagonalPositions, function (pos) {
          return game.board[pos[0]][pos[1]] === mark;
        });
      }

      var won = _.any(
        [diagonalPositions1, diagonalPositions2],
        didWinDiagonal
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.isEmptyPos = function (pos) {
    return (this.board[pos[0]][pos[1]] === null);
  };

  Game.prototype.horizontalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (i) {
        return _(indices).every(function (j) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.makeBoard = function () {
    return _.times(3, function (i) {
      return _.times(3, function (j) {
        return null;
      });
    });
  };

  Game.prototype.move = function (pos) {
    if (!this.isEmptyPos(pos)) {
      return false;
    }
		console.log("Player that just moved: " + this.player);
    this.placeMark(pos);
    return true;
  };

  Game.prototype.placeMark = function (pos) {
		console.log("Mark to be placed: " + this.player);
    this.board[pos[0]][pos[1]] = this.player;
  };

  Game.prototype.switchPlayer = function () {
    if (this.player === Game.marks[0]) {
      this.player = Game.marks[1];
    } else {
      this.player = Game.marks[0];
    }
  };

  Game.prototype.valid = function (pos) {

    function isInRange (pos) {
      return (0 <= pos) && (pos < 3);
    }

    return _(pos).all(isInRange) && _.isNull(this.board[pos[0]][pos[1]]);
  };

  Game.prototype.verticalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (j) {
        return _(indices).every(function (i) {
					// console.log("[" + i + ", " + j + "] is: " + game.board[i][j]); WRONG MARK BEING PLACED
          return game.board[i][j] === mark;
        });
      });

      if (won) {
				// console.log("MARK in test: " + mark);
        winner = mark;
				// console.log("Winner: " + winner)
      }
    });

    return winner;
  };

  Game.prototype.winner = function () {
		console.log("game.winner test: " + (this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()));
    return (
      this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
    );
  };

  Game.prototype.printBoard = function () {
    var game = this;

    game.board.forEach(function(row){
      var first = row[0] == null ? " " : row[0];
      var second = row[1] == null ? " " : row[1];
      var third = row[2] == null ? " " : row[2];

      console.log(first + " | " + second + " | " + third);
    })
  }

  Game.prototype.run = function () {
    var game = this;

    game.turn(function(){
			winner = game.winner();
      if (winner) {
        console.log("Someone won!");
      } else {
        game.printBoard();
        game.run();
      }
    });
  }

  Game.prototype.turn = function (callback) {
    var game = this;
  }

})(this);
