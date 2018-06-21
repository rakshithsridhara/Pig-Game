/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//variables to store currrent round score, game score, active player, and status of game.
var scores,roundScore,activePlayer,gamePlaying;
//function to initialize game
function gameInit(){
    //Initializing scores to 0, setting active player to player-1 and state variable 'game playing' to true
    scores=[0,0];
    roundScore=0;
    activePlayer=0;
    gamePlaying=true;

    //Hide dice when the game is first initailized
    document.querySelector(".dice").style.display="none";
    //Display score as 0 of both players
    document.getElementById("score-0").textContent="0";
    document.getElementById("score-1").textContent="0";
    document.getElementById("current-0").textContent="0";
    document.getElementById("current-1").textContent="0";
    //Resetting the names to original names, if the game is played for a second time
    document.getElementById("name-0").textContent="Player 1";
    document.getElementById("name-1").textContent="Player 2";
    //Reset the active player settings and winner settings
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("winner");
}

//Call to function to initialize game
gameInit();

//Event handler to perform a function when the roll dice button is clicked
document.querySelector(".btn-roll").addEventListener("click",function(){
    //Check if state variable is true
    if(gamePlaying){
        //Get a random number to simulate rolling of dice
        var dice= Math.floor(Math.random()*6)+1;
        var diceDOM=document.querySelector(".dice");
        //display the dice
        diceDOM.style.display="block";
        //display dice based on number being generated
        diceDOM.src = "dice-"+dice+".png";
        //if dice value greater than 1, add score to round score, and display
        //if dice value is 1 change player
        if(dice>1){
            roundScore+=dice;
            document.querySelector("#current-" + activePlayer).textContent=roundScore;
        }else{
            //call to function to change player
            changeActivePlayer();
        }
    }
});

//Event handler to perform a function when the hold button is clicked
document.querySelector(".btn-hold").addEventListener("click", function(){
    // check if state variable is true
    if(gamePlaying){
        //set game score
        scores[activePlayer]+=roundScore;
        //reset round score and display
        roundScore=0;
        document.getElementById("score-"+activePlayer).textContent=scores[activePlayer];
        //If the game score is 100 or more, then declare as winner, and set state variable to false, hide the dice, and display winner
        //else change player
        if(scores[activePlayer]>=10){
            document.querySelector("#name-"+activePlayer).textContent="WINNER!";
            document.querySelector(".dice").style.display="none";
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
            gamePlaying=false;
        }else{
            changeActivePlayer();
        }
    }
});

//function to change player
function changeActivePlayer(){
    //change player variable
    activePlayer===0?activePlayer=1:activePlayer=0;
    //reset round score and display scores
    roundScore=0;
    document.getElementById("current-0").textContent="0";
    document.getElementById("current-1").textContent="0";
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");        
}

//new game button even handler to initialize game
document.querySelector(".btn-new").addEventListener("click",gameInit);