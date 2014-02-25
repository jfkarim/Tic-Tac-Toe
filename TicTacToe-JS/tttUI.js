var game = new TTT.Game();

$(document).ready( function() {

  console.log("Hi, Tic Tac Toers");
  var xWins = 0;
  var oWins = 0;

  var $cells = $('div.cell');
  var $status = $('#status > span');

  // Called by the "New Game button"
  var clearBoard = function() {
    $cells.removeClass('O');
    $cells.removeClass('X');
    $cells.html('');
    $status.html('');
  }

  var clickHandler = function() {
    var $cell = $(this);
    var pos = $cell.attr('id');
    pos = pos.split(",");
    if (game.move(pos)) {
      player = game.player;
      $cell.addClass(player);
      $cell.html(player);
      console.log(player + " moves to " + $cell.attr('id'));
      if (game.winner()) {
        console.log("Player " + player + " wins");
        $status.html("Player " + player + " WINS!");
		if (game.winner() === "X"){
			xWins += 1;
			$("#x-wins").html(xWins.toString());
		} else {
			oWins += 1;
			$("#o-wins").html(oWins.toString());
		}
		console.log("WINNER: " + game.winner());
        $cells.unbind('click');
      }
	  game.switchPlayer();
    } else {
      console.log("invalid move");
    }
  }

  game.run();

  $('button').click(function() {
    game = new TTT.Game();
    game.run();
    clearBoard();
    $cells.unbind('click');
    $cells.click(clickHandler);
    console.log("Game reset");
  });

  $cells.click(clickHandler);

});
