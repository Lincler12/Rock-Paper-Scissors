class Moves {
    static get ROCK() {
        return "rock";
    }

    static get PAPER() {
        return "paper"
    }

    static get SCISSORS() {
        return "scissors";
    }
}

class Winner{
    static get PLAYER(){
        return 1;
    }

    static get COMPUTER(){
        return 0;
    }

    static get TIE(){
        return 2;
    }
}

function ComputerPlay() {
    let randomNumber = Math.floor(Math.random() * 3); //returns a number from 0 to 2
    switch (randomNumber) {
        case 0:
            return Moves.ROCK;
        case 1:
            return Moves.PAPER;
        case 2:
            return Moves.SCISSORS;
    }
}

function PlayerPlay() {

    let choice = parseInt(prompt("Choose: 0-rock, 1-paper, 2-scissors"));
    switch (choice) {
        case 0:
            return Moves.ROCK;
        case 1:
            return Moves.PAPER;
        case 2:
            return Moves.SCISSORS;
        default:
            console.error("Wrong input");
            break;
    }
}

function GameRound(playerSelection, computerSelection) {
    if (playerSelection && computerSelection) {
        if ((playerSelection === Moves.ROCK) && (computerSelection === Moves.PAPER)) {
            return {string:"You Lose! Paper beats Rock", winner: Winner.COMPUTER};
        } else if ((playerSelection === Moves.ROCK) && (computerSelection === Moves.SCISSORS)) {
            return {string:"You Win! Rock beats Scissors", winner: Winner.PLAYER};
        } else if ((playerSelection === Moves.ROCK) && (computerSelection === Moves.ROCK)) {
            return {string:"It's a tie! Rock vs Rock", winner:Winner.TIE};
        } else if ((playerSelection === Moves.PAPER) && (computerSelection === Moves.ROCK)) {
            return {string:"You Win! Paper beats Rock", winner: Winner.PLAYER};
        } else if ((playerSelection === Moves.PAPER) && (computerSelection === Moves.PAPER)) {
            return {string: "it's a tie! Paper vs Paper", winner: Winner.TIE};
        } else if ((playerSelection === Moves.PAPER) && (computerSelection === Moves.SCISSORS)) {
            return {string:"You Lose! Scissors beats Paper", winner: Winner.COMPUTER};
        } else if ((playerSelection === Moves.SCISSORS) && (computerSelection === Moves.ROCK)) {
            return {string:"You Lose! Rock beats Scissors", winner: Winner.COMPUTER};
        } else if ((playerSelection === Moves.SCISSORS) && (computerSelection === Moves.PAPER)) {
            return {string:"You Win! Scissors beats Paper", winner: Winner.PLAYER};
        } else if ((playerSelection === Moves.SCISSORS) && (computerSelection === Moves.SCISSORS)) {
            return {string:"It's a tie! Scissors vs Scissors",winner: Winner.TIE};
        }
    }

}

function Game(){
    const gameRounds = 5;
    let counter = 0;
    let wins = 0;
    let loses = 0;
    let ties = 0;
    while(counter < 5){
        counter++;
        result = GameRound(PlayerPlay(), ComputerPlay());
        alert(result.string);
        switch(result.winner){
            case Winner.PLAYER:
                wins++;
                break;
            case Winner.COMPUTER:
                loses++;
                break;
            case Winner.TIE:
                ties++;
                break;

        }
    }

    if(wins > loses){
        console.log("You won the game! Congratulations!");
    }else if(wins < loses){
        console.log("You lost the game! Try next time!");
    }else{
        console.log("It's a tie! Try again");
    }
}

Game();