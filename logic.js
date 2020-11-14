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

class Winner {
    static get PLAYER() {
        return 1;
    }

    static get COMPUTER() {
        return 0;
    }

    static get TIE() {
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


function CheckWinner(playerSelection, computerSelection) {
    if (playerSelection && computerSelection) {
        if ((playerSelection === Moves.ROCK) && (computerSelection === Moves.PAPER)) {
            return { string: "You Lose! Paper beats Rock", winner: Winner.COMPUTER };
        } else if ((playerSelection === Moves.ROCK) && (computerSelection === Moves.SCISSORS)) {
            return { string: "You Win! Rock beats Scissors", winner: Winner.PLAYER };
        } else if ((playerSelection === Moves.ROCK) && (computerSelection === Moves.ROCK)) {
            return { string: "It's a tie! Rock vs Rock", winner: Winner.TIE };
        } else if ((playerSelection === Moves.PAPER) && (computerSelection === Moves.ROCK)) {
            return { string: "You Win! Paper beats Rock", winner: Winner.PLAYER };
        } else if ((playerSelection === Moves.PAPER) && (computerSelection === Moves.PAPER)) {
            return { string: "it's a tie! Paper vs Paper", winner: Winner.TIE };
        } else if ((playerSelection === Moves.PAPER) && (computerSelection === Moves.SCISSORS)) {
            return { string: "You Lose! Scissors beats Paper", winner: Winner.COMPUTER };
        } else if ((playerSelection === Moves.SCISSORS) && (computerSelection === Moves.ROCK)) {
            return { string: "You Lose! Rock beats Scissors", winner: Winner.COMPUTER };
        } else if ((playerSelection === Moves.SCISSORS) && (computerSelection === Moves.PAPER)) {
            return { string: "You Win! Scissors beats Paper", winner: Winner.PLAYER };
        } else if ((playerSelection === Moves.SCISSORS) && (computerSelection === Moves.SCISSORS)) {
            return { string: "It's a tie! Scissors vs Scissors", winner: Winner.TIE };
        }
    }

}

function Game() {
    const TotalRounds = 5;
    let computerMoves = []; //at the start of our program computer has moves for the whole round
    let round = 0;
    let wins = 0;
    let loses = 0;
    let ties = 0;
    GenerateComputerMoves();
    GenerateRoundResultsDisplay();

    function GenerateComputerMoves() {
        for (let i = 0; i < TotalRounds; i++) {
            computerMoves[i] = ComputerPlay();
        }
    };

    function GenerateRoundResultsDisplay() {
        if (round === 0) {
            const mainElement = document.getElementsByTagName('MAIN')[0];
            const newDivRoundResultContainer = document.createElement('div');
            newDivRoundResultContainer.style.cssText = "display:flex; justify-content: space-evenly; width: 40%; padding-bottom: 5rem;";
            newDivRoundResultContainer.setAttribute('id', 'round-result-container');
            for (let i = 0; i < TotalRounds; i++) {
                const newDivRoundResultElement = document.createElement('div');
                newDivRoundResultElement.setAttribute("data-entry", `${i}`);
                newDivRoundResultElement.style.width = "20px";
                newDivRoundResultElement.style.height = "20px";
                newDivRoundResultElement.style.borderRadius = "100px";
                newDivRoundResultElement.style.backgroundColor = "#f7e1aa";
                newDivRoundResultContainer.appendChild(newDivRoundResultElement);
            }
            mainElement.insertBefore(newDivRoundResultContainer, mainElement.firstElementChild);
        }
    }

    function RoundResult(result) {
        document.querySelector('#round-result-container').childNodes.forEach(div => {
            if (div.dataset.entry == round) {
                switch (result) {
                    case 'win':
                        div.style.backgroundColor = "#41cac8"; //green
                        break;
                    case 'lose':
                        div.style.backgroundColor = "#e596bc"; //pink
                        break;
                    case 'tie':
                        div.style.backgroundColor = "#7fcaf0";
                        break;
                }
            }

        })

    }

    function reset() {
        round = 0;
        firstTimeInitRound = 0;
        wins = 0;
        loses = 0;
        ties = 0;
        document.querySelector('#round-result-container').childNodes.forEach(div => {
            div.style.backgroundColor = "#f7e1aa";
        })

        GenerateComputerMoves();
        resetDisplay();

    }

    function resetDisplay() {
        const roundDisplays = document.getElementsByClassName('round-display');
        Array.from(roundDisplays).forEach(roundDisplay => {
            roundDisplay.lastElementChild.remove();
        })

    }

    return {

        GameRound: function gameRound(playerMove) {
            const playerRoundElement = document.getElementById("player-round");
            const computerRoundElement = document.getElementById("computer-round");
            if (round === 0) {
                playerRoundElement.textContent = "Player 1"
                playerRoundElement.style.width = "auto";
                playerRoundElement.textAlign = "initial";
                playerRoundElement.parentElement.style.width = "initial";
                computerRoundElement.style.display = "initial";
            }
            console.log(round);
            const result = CheckWinner(playerMove, computerMoves[round]);
            switch (result.winner) {
                case Winner.PLAYER:
                    wins++;
                    RoundResult('win');
                    break;
                case Winner.COMPUTER:
                    loses++;
                    RoundResult('lose');
                    break;
                case Winner.TIE:
                    ties++;
                    RoundResult('tie');
                    break;
            }
            round++;
            if (round === TotalRounds) {
                let displayMessage = '';
                if (wins > loses) {
                    displayMessage = "You won the game! Congratulations!";
                } else if (wins < loses) {
                    displayMessage = "You lost the game! Try next time!";
                } else {
                    displayMessage = "It's a tie! Try again";
                }

                playerRoundElement.textContent = displayMessage;
                playerRoundElement.style.width = "100%";
                playerRoundElement.style.textAlign = "center";
                playerRoundElement.parentElement.style.width = "100%";
                computerRoundElement.style.display = 'none';
                reset();

            }
        },

        RoundDisplay: function roundDisplay() {

            function playerRoundDisplay(buttonPressed) {
                const roundDisplay = document.getElementById('round-container').firstElementChild;
                const buttonPressedChildElement = buttonPressed.childNodes[0];
                const newButtonElement = document.createElement('button');
                newButtonElement.classList.add('round-display-buttons');
                newButtonElement.disabled = true;
                const newButtonIcon = document.createElement('I');
                newButtonIcon.setAttribute('class', buttonPressedChildElement.getAttribute('class'));
                newButtonElement.appendChild(newButtonIcon);
                roundDisplay.appendChild(newButtonElement);
                return newButtonElement;
            }

            function computerRoundDisplay() {
                const rockIconFAString = "far fa-hand-rock";
                const paperIconFAString = "far fa-hand-paper";
                const scissorsIconFAString = "far fa-hand-scissors";
                const roundDisplay = document.getElementById('round-container').lastElementChild;
                const newButtonElement = document.createElement('button');
                newButtonElement.classList.add('round-display-buttons');
                newButtonElement.disabled = true;
                const newButtonIcon = document.createElement('I');

                switch (computerMoves[round]) {
                    case Moves.ROCK:
                        newButtonIcon.setAttribute('class', rockIconFAString);
                        break;
                    case Moves.PAPER:
                        newButtonIcon.setAttribute('class', paperIconFAString);
                        break;
                    case Moves.SCISSORS:
                        newButtonIcon.setAttribute('class', scissorsIconFAString);
                        break;
                }

                newButtonElement.appendChild(newButtonIcon);
                roundDisplay.appendChild(newButtonElement);


            }


            if (round > 0) {
                resetDisplay();
            }
            playerRoundDisplay(this);
            computerRoundDisplay();


        }
    };
};

const GameFunctions = Game();


document.getElementById("rock-btn").addEventListener("click", GameFunctions.RoundDisplay);
document.getElementById("paper-btn").addEventListener("click", GameFunctions.RoundDisplay);
document.getElementById("scissors-btn").addEventListener("click", GameFunctions.RoundDisplay);

document.getElementById("rock-btn").addEventListener("click", () => {
    GameFunctions.GameRound(Moves.ROCK);
});
document.getElementById("paper-btn").addEventListener("click", () => {
    GameFunctions.GameRound(Moves.PAPER);

});
document.getElementById("scissors-btn").addEventListener("click", () => {
    GameFunctions.GameRound(Moves.SCISSORS);

});




