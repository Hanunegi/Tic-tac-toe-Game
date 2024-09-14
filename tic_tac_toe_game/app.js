// Selecting all elements with the class 'btn' for Tic Tac Toe buttons
let btns = document.querySelectorAll("#btn");
let rst = document.querySelector("#Reset");
let resultDisplay = document.querySelector("#result");

let turn0 = true; // Variable to keep track of whose turn it is (true for '0', false for 'x')
let gameOver = false; // Variable to check if the game is over

// Winning patterns array, representing index positions on the grid that make up a win
let winpatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left diagonal
    [2, 4, 6]  // Right diagonal
];

// Function to check for a winning combination
function checkWin() {
    // Get the current text (either '0' or 'x') of all buttons
    let values = Array.from(btns).map(btn => btn.innerText);

    // Loop through each win pattern to see if there is a winning combination
    winpatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (values[a] && values[a] === values[b] && values[b] === values[c]) {
            // If all three values in a win pattern are the same and not empty
            
            console.log(`Player ${values[a]} wins!`);

            gameOver = true;
            resultDisplay.innerText = `Check mate dude, Player ${values[a]} wins! try ur bad luck again hahhahaha`;
            disableAllButtons(); // Disable all buttons since the game is over
        }
    });

    // Check for a draw (if no empty spots are left and game is not over)
    if (!gameOver && values.every(value => value !== '')) {
        alert("It's a draw!");
        resultDisplay.innerText = "It's a draw!"; 
        gameOver = true;
    }
}

// Function to disable all buttons when the game is over
function disableAllButtons() {
    btns.forEach(btn => btn.disabled = true);
}

// Event listener for each button
btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (gameOver) return; // Do nothing if the game is over

        console.log("Button was clicked");
        if (turn0) {
            console.log("0 was clicked");
            btn.innerText = "0"; // Set button text to '0'
            btn.style.color = "green";
            turn0 = false; // Change turn to 'x'
        } else {
            console.log("x was clicked");
            btn.innerText = "x"; // Set button text to 'x'
            btn.style.color = "red";
            turn0 = true; // Change turn to '0'
        }
        btn.disabled = true; // Disable the clicked button so it can't be clicked again

        checkWin(); // Check if this click leads to a win or a draw
    });
});

// Event listener for the reset button to restart the game
rst.addEventListener("click", () => {
    // Reset all button texts and enable them for a new game
    btns.forEach(btn => {
        btn.innerText = "";
        btn.disabled = false;
    });
    turn0 = true; // Reset turn to '0'
    gameOver = false; // Reset game over status
    resultDisplay.innerText = ""; // Clear the result display
    console.log("Game has been reset");
});
