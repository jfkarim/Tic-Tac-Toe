#things to do
#
#- AI (become sentient being)
#- deal with if no one wins

class Player
  attr_accessor :piece, :name

  def initialize(piece, name)
    @piece = piece
    @name = name
  end
end

class HumanPlayer < Player
  def ask
    puts "What row, #{@name}? (1, 2, or 3)"
    row = gets.chomp.to_i - 1

    puts "What column, #{@name}? (1, 2, or 3)"
    col = gets.chomp.to_i - 1

    [row, col]
  end
end

class ComputerPlayer < Player
  def ask
    row = (0..2).to_a.sample
    col = (0..2).to_a.sample

    [row, col]
  end
end

class TicTacToe
  attr_accessor :board, :player1, :player2, :won

  def initialize
    @board = []
    3.times do
      @board << Array.new(3," ")
    end
    @won = false
  end

  def start_game
    puts "How many human players? Enter 0, 1, or 2."
    num_players = gets.chomp.to_i

    if num_players == 2
      self.player1 = HumanPlayer.new("X", "Player 1") #is x, goes first
      self.player2 = HumanPlayer.new("O", "Player 2") #is o, goes second
    elsif num_players == 1
      self.player1 = HumanPlayer.new("X", "Player 1") #is x, goes first
      self.player2 = ComputerPlayer.new("O", "Player 2") #is o, goes second
    else
      self.player1 = ComputerPlayer.new("X", "Player 1") #is x, goes first
      self.player2 = ComputerPlayer.new("O", "Player 2") #is o, goes second
    end

    play
  end

  def move(player)
    moved = false
    until moved
      coords = player.ask
      if is_valid?(coords)
        @board[coords[0]][coords[1]] = player.piece
        moved = true
      end
    end
  end

  def play
    players = [player1, player2]
    until @won
      players.each do |player|
        turn(player) unless @won
      end
    end
  end

  def turn(player)
    show_board
    move(player)
    if win?(player.piece)
      print_winner("#{player.name}")
      @won = true
      show_board
    end
  end

  def print_winner(player)
    puts "The winner is #{player}!!"
  end

  def is_valid?(cords)
    col = cords[0]
    row = cords[1]

    @board[col][row] == " "
  end

  def show_board
    @board.each do |x|
      p x
    end
  end

  def win?(piece)
    count = 0

    #horizontal wins
    for i in 0..2
      @board[i].each do |spot|
        count += 1 if spot == piece
      end
      if count == 3
        return true
      else
        count = 0
      end
    end

    #vertical wins
    for i in 0..2
      for j in 0..2
        count += 1 if board[j][i] == piece
      end
      if count == 3
        return true
      else
        count = 0
      end
    end

    #diagonal wins
    for i in 0..2
      count += 1 if board[i][i] == piece
    end
      if count == 3
        return true
      else
        count = 0
      end

    for i in 0..2
      count += 1 if board[i][2-i] == piece
    end
    if count == 3
      return true
    else
        count = 0
    end

    false
  end
end