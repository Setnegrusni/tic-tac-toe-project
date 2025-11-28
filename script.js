//Variables globales
const btStart = document.querySelector("button");

//Botones
btStart.addEventListener("click", () => {
    if (btStart.classList.contains("reset")) {
        btStart.classList.replace("reset", "start");
        btStart.textContent = "START GAME";
        resetGame();
    } else {
        btStart.classList.replace("start", "reset");
        btStart.textContent = "RESET GAME";
        playGame();
    }
});

//Funciones
function resetGame() {
    const gamePad = gameBoard();

    //Limpia el arreglo
    gamePad.grid = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    //Limpia el board
    const myCells = document.querySelectorAll(".grid-cell");
    myCells.forEach(cell => {
        cell.remove();
    });

    //Texto del juego se reinicia
    const gameInfo = document.querySelector(".game-info > p");
    gameInfo.textContent = "START GAME!";
}

function playGame() {
    const gamePlayer = player();
    gamePlayer.createPlayer("Bocho", "O"); //crea jugador 1
    gamePlayer.createPlayer("Setnegrusni", "X"); //crea jugador 2
    const myPlayers = gamePlayer.allPlayers;

    const gamePad = gameBoard();
    const gameFlow = gameController();

    gamePad.printGrid(); //Imprime el gato
    gameFlow.fullGame(myPlayers[0], myPlayers[1]);
}

//Factory function that returns two players, each with a marker
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
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    const columns = 3;
    const rows = 3;
    const gameBoard = document.querySelector(".game-board");

    function printGrid() {
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                const myCell = document.createElement("div");
                myCell.classList.add("grid-cell");
                myCell.setAttribute("data-col", j);
                myCell.setAttribute("data-row", i);
                gameBoard.appendChild(myCell);
            }
        }
    }

    return { printGrid, grid }
}

//Function that disables the gameboard
function gameEnded() {
    document.querySelectorAll(".grid-cell").forEach(cell => {
        cell.style.pointerEvents = "none"; //Deshabilita los clicks en las celdas
        cell.style.opacity = "0.5"; //Añade opacidad para dar a entender el final del juego
    });
}

//Factory that returns game movements
function gameController() {
    function fullGame(playerOne, playerTwo) {
        const myCells = document.querySelectorAll(".grid-cell");
        const gameInfo = document.querySelector(".game-info > p");
        const myGrid = gameBoard();
        let activePlayer = playerOne; //Controla al jugador activo
        let auxPlayer = playerTwo; //Controla el texto de jugador en turno
        let gameFinished = false; //Controla si el juego ha terminado

        //Texto de turno inicial
        gameInfo.textContent = "Turno de " + activePlayer.playerName + ": selecciona una casilla";

        myCells.forEach(cell => {
            cell.addEventListener("click", (e) => {
                //Texto de turno siguiente

                gameInfo.textContent = "Turno de " + auxPlayer.playerName + ": selecciona una casilla";

                //Fila y columna de la celda seleccionada
                const cellRow = e.target.dataset.row;
                const cellCol = e.target.dataset.col;
                //Pone marca del jugador que seleccionó la casilla y la agrega al arreglo
                cell.textContent = activePlayer.marker;
                myGrid.grid[cellRow][cellCol] = activePlayer.marker;

                //Condiciones de gane aquí
                const winPlayer = winPatterns(activePlayer.marker)
                const winnerMarker = winPlayer.myWinner;
                const winFlag = winPlayer.winnerFlag;
                let isFilled = myGrid.grid.flat().every(cell => cell !== ""); //Verifica si el arreglo está lleno
                
                //En caso de empate
                if (isFilled) {
                    gameInfo.textContent = "¡JUEGO EMPATADO!";
                    gameFinished = true;
                }
                //En caso de que gane alguno de los dos jugadores
                if (winFlag) {
                    if (winnerMarker === "O") {
                        gameInfo.textContent = "¡" + playerOne.playerName + " GANA!";
                        gameFinished = true;
                    } else if (winnerMarker === "X") {
                        gameInfo.textContent = "¡" + playerTwo.playerName + " GANA!";
                        gameFinished = true;
                    }
                }
                //En caso de que el juego termine
                if (gameFinished) {
                    gameEnded(); //Deshabilita el tablero ya terminado el juego
                }

                //Control de cambio de jugador y texto de turno
                if (activePlayer === playerOne) {
                    activePlayer = playerTwo;
                    auxPlayer = playerOne;
                } else {
                    activePlayer = playerOne;
                    auxPlayer = playerTwo;
                }
            });
        });

        function winPatterns(marker) {
            let winnerFlag = false;
            let myWinner = "";

            //Patrones de gane horizontales
            if (myGrid.grid[0][0] === marker && myGrid.grid[0][1] === marker && myGrid.grid[0][2] === marker) {
                winnerFlag = true
                myWinner = marker
            } else if (myGrid.grid[1][0] === marker && myGrid.grid[1][1] === marker && myGrid.grid[1][2] === marker) {
                winnerFlag = true
                myWinner = myGrid.grid[1][0];
            } else if (myGrid.grid[2][0] === marker && myGrid.grid[2][1] === marker && myGrid.grid[2][2] === marker) {
                winnerFlag = true
                myWinner = myGrid.grid[2][0];
            }

            //Patrones de gane verticales
            if (myGrid.grid[0][0] === marker && myGrid.grid[1][0] === marker && myGrid.grid[2][0] === marker) {
                winnerFlag = true
                myWinner = myGrid.grid[0][0];
            } else if (myGrid.grid[0][1] === marker && myGrid.grid[1][1] === marker && myGrid.grid[2][1] === marker) {
                winnerFlag = true
                myWinner = myGrid.grid[0][1];
            } else if (myGrid.grid[0][2] === marker && myGrid.grid[1][2] === marker && myGrid.grid[2][2] === marker) {
                winnerFlag = true
                myWinner = myGrid.grid[0][2];
            }

            //Patrones de gane diagonales
            if (myGrid.grid[0][0] === marker && myGrid.grid[1][1] === marker && myGrid.grid[2][2] === marker) {
                winnerFlag = true
                myWinner = myGrid.grid[0][0];
            } else if (myGrid.grid[0][2] === marker && myGrid.grid[1][1] === marker && myGrid.grid[2][0] === marker) {
                winnerFlag = true
                myWinner = myGrid.grid[0][2];
            }

            return { winnerFlag, myWinner }
        }
    }

    return { fullGame }
}