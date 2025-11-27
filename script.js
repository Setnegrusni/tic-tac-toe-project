//Variables globales
const btStart = document.querySelector("button");

//Botones
btStart.addEventListener("click", () => {
    if (btStart.classList.contains("reset")) {
        btStart.classList.replace("reset", "start");
        btStart.textContent = "START GAME";
        //resetGame();
    } else {
        btStart.classList.replace("start", "reset");
        btStart.textContent = "RESET GAME";
        playGame();
    }
});

//Funciones
function playGame() {
    const gamePlayer = player(); //Factory para crear y almacenar jugadores
    gamePlayer.createPlayer("Bocho", "O"); //jugador 1
    gamePlayer.createPlayer("Setnegrusni", "X"); //jugador 2
    const myPlayers = gamePlayer.allPlayers;

    const gamePad = gameBoard();
    const gameFlow = gameController();

    gamePad.printGrid(); //Imprime el gato
    gameFlow.fullGame(myPlayers[0], myPlayers[1]);
}

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
    const grid = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    const columns = 3;
    const rows = 3;
    const gameBoard = document.querySelector(".game-board");

    function printGrid() {
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) { 
                const myCell = document.createElement("div");
                //const myCellText = document.createElement("p")
                myCell.classList.add("grid-cell");
                myCell.setAttribute("data-col", j);
                myCell.setAttribute("data-row", i);
                gameBoard.appendChild(myCell);
                //myCell.appendChild(myCellText);
            }
        }
    }

    return { printGrid, grid }
}

//Factory that returns game movements
function gameController() {
    function fullGame(playerOne, playerTwo) {
        const myCells = document.querySelectorAll(".grid-cell");
        const gameInfo = document.querySelector(".game-info > p");
        const myGrid = gameBoard();
        let activePlayer = playerOne; //Controla al jugador activo
        let auxPlayer = playerTwo; //Controla el texto de jugador en turno
        //console.log("player 1: " + playerOne.playerName + " - marker: " + playerOne.marker);
        //console.log("player 2: " + playerTwo.playerName + " - marker: " + playerTwo.marker);

        gameInfo.textContent = "Turno de " + activePlayer.playerName + ": selecciona una casilla";

        myCells.forEach(cell => {
            cell.addEventListener("click", (e) => {
                gameInfo.textContent = "Turno de " + auxPlayer.playerName + ": selecciona una casilla";

                const cellRow = e.target.dataset.row;
                const cellCol = e.target.dataset.col;

                //console.log("Celda: " + "[" + cellCol + ", " + cellRow + "]");
                cell.textContent = activePlayer.marker;
                myGrid.grid[cellRow][cellCol] = activePlayer.marker;

                //Poner condiciones de gane aquí


                console.log(myGrid.grid);
                if (activePlayer === playerOne) {
                    activePlayer = playerTwo;
                    auxPlayer = playerOne;
                } else {
                    activePlayer = playerOne;
                    auxPlayer = playerTwo;
                }
            });
        });
    }

    return {fullGame}
}