//Factory function that returns two players each with a marker
function player() {
    const allPlayers = [];

    function createPlayer(playerName, marker) {
        const myPlayer = { playerName, marker } //crea el objeto "jugador"
        allPlayers.push(myPlayer); //Agrega el objeto creado al arreglo
    }

    return { allPlayers, createPlayer };
}

//Factory function that returns the gameboard
function gameBoard() {
    const grid = [];
    const columns = 3;
    const rows = 3;
    const gameBoard = document.querySelector(".game-board");


    function printGrid() {
        for (let i = 0; i < columns; i++) {
            grid[i] = []; //crea las 3 columnas

            for (let j = 0; j < rows; j++) { //crea las 3 filas
                grid[i][j] = "";

                const myCell = document.createElement("div");
                myCell.classList.add("grid-cell");
                myCell.setAttribute("data-col", j);
                myCell.setAttribute("data-row", i);
                gameBoard.appendChild(myCell);
            }
        }
    }

    return {printGrid}
}


function playGame() {
    const btStart = document.querySelector("button");
    const gamePlayer = player();
    const playerOne = gamePlayer.createPlayer("Bocho", "O");
    const playerTwo = gamePlayer.createPlayer("Setenegrusni", "X");
    const activePlayer = gamePlayer.allPlayers[0];

    console.log(activePlayer);

    gameBoard().printGrid();

    btStart.addEventListener("click", () => {
        if (btStart.classList.contains("start")) {

        }
    })

    const myCells = document.querySelectorAll(".game-board > .grid-cell");

    myCells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            
        });
    });
}

playGame();