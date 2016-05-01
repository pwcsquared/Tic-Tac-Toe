$(document).ready(function(){
  var playerID = "X";
  var computerID = "O";
  var gameRunning = false;
  var acceptInput = false;  
  var availableMoves = [1,2,3,4,5,6,7,8,9];
  var computerMoves = [];
  var playerMoves = [];
  var winConditions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
  ];

  function takeCenter(){
    var center = availableMoves.indexOf(5);
    if (center !== -1){
      return 5;
    } else {
      return false;
    }
  };
  
  function victoryCheck(moves){
    acceptInput = false;
    for (var i = 0; i < winConditions.length; i++){
      var tempArr = winConditions[i].slice();
      var winArr = [];
      for (var j = 2; j > -1; j--){
        if (moves.indexOf(tempArr[j]) !== -1){
          winArr.push(tempArr[j]);
          tempArr.splice(j, 1);
          if (winArr.length === 3){
            //run winner stuff
            gameRunning = false;
            for (var k = 0; k < winArr.length; k++){
              tempID = "#" + winArr[k];
              $(tempID).addClass("winColor");
            }
            if (moves === computerMoves){
              alert("You lose!");
            } else {
              alert("You win!");
            }
            masterReset();
          }
        }
      }
    }
  };
  
  function tieCheck(){
    if (availableMoves.length === 0){
      alert("It's a tie!");
      masterReset();
    }
  };
  
  function masterReset(){
    availableMoves = [1,2,3,4,5,6,7,8,9];
    computerMoves = [];
    playerMoves = [];
    acceptInput = false;
    gameRunning = false;
    setTimeout(function(){
      $(".gameBox").removeClass("X O winColor").text("");
      $(".startGame").removeClass("inProgress").text("start");
    }, 2000);
  };

  function winMove(moves){
    if (moves.length < 2){
      return false;
    } else {
      for (var i = 0; i < winConditions.length; i++){
        var tempArr = winConditions[i].slice();
        for (var j = 2; j > -1; j--){
          if (moves.indexOf(tempArr[j]) !== -1){
            tempArr.splice(j, 1);
          }
          if (tempArr.length === 1){
            if (availableMoves.indexOf(tempArr[0]) !== -1){
              return tempArr[0];
            }
          }
        }
      }
    }
    return false;
  };
  
  function computerPlay(){
    acceptInput = false;
    if (!gameRunning){
      return false;
    }
    var nextMove;
    var center = takeCenter();
    var compWin = winMove(computerMoves); //checks for available winning move
    var block = winMove(playerMoves); //blocks player win on next turn
    if (center){
      nextMove = center;
    } else if (compWin){
      nextMove = compWin;
    } else if (block){
      nextMove = block;
    } else if (availableMoves.indexOf(7) !== -1){
      nextMove = 7;
    } else if (availableMoves.indexOf(8) !== -1){
      nextMove = 8;
    } else {
      nextMove = availableMoves[0];
    }
    computerMoves.push(nextMove);
    availableMoves.splice(availableMoves.indexOf(nextMove),1);
    selectSquare(computerID, "#" + nextMove);
    victoryCheck(computerMoves);
    tieCheck();
    acceptInput = true;
  };
  
  function selectSquare(charID, squareID){
    $(squareID).text(charID);
    $(squareID).addClass(charID);
  };
  
  $(".gameBox").on("click",function(){
    if (!acceptInput || !gameRunning){
      return false;
    }
    if (availableMoves.indexOf(parseInt(this.id)) !== -1){
      acceptInput = false;
      selectSquare(playerID, this);
      playerMoves.push(parseInt(this.id));
      var index = availableMoves.indexOf(parseInt(this.id));
      availableMoves.splice(index,1);
      victoryCheck(playerMoves);
      tieCheck();
      if (gameRunning){
        setTimeout(computerPlay,1000);
      }
    }
  });
  
  $(".xoSlider").on("click",function(){
    if (gameRunning){
      return false;
    }
    $(this).toggleClass("coverClicked");
    $(".choiceBox").toggleClass("blueBackground");
    if (playerID === "X"){
      playerID = "O";
      computerID = "X";
    } else {
      computerID = "O";
      playerID = "X";
    }
  });
  
  $(".startGame").on("click",function(){
    if (gameRunning){
      return false;
    }
    $(".startGame").addClass("inProgress").text(". . .");
    gameRunning = true;
    if (playerID === "X"){
      acceptInput = true;
    } else {
      computerPlay();
    }
  });
  
});