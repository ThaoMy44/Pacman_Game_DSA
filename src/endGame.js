//Doan Vo Thao My _ ITDSIU22138
//This script manages the end-of-game screen by displaying the game result (win or lose),
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const result = params.get('result');
    const level = params.get('level'); // Get level from URL parameter
    const gameResultElement = document.getElementById('game-result');
    const restartButton = document.getElementById('restart-button');
    const homeButton = document.getElementById('home-button');

    if (result === 'win') {
        gameResultElement.textContent = 'YOU WIN!';
    } else {
        gameResultElement.textContent = 'GAME OVER';
    }

    restartButton.addEventListener('click', function() {
        if (level) {
            // Redirect to game page with level parameter
            window.location.href = `menu.html?level=${level}`;
        } else {
            // Default to medium level if no level parameter is found
            window.location.href = `menu.html?level=medium`;
        }
    });

    homeButton.addEventListener('click', function() {
        window.location.href = 'menu.html'; // Replace with your game's main page
    });
}); 