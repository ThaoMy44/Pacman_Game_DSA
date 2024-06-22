//Doan Vo Thao My _ ITDSIU22138
//This script handles the menu interactions in a game, pausing background audio and initializing the game at a selected difficulty level when a level button is clicked.

document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu');
    const gameContainer = document.getElementById('gameContainer');
    const gameCanvas = document.getElementById('gameCanvas');
    const buttons = document.querySelectorAll('.level-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const backgroundAudio = document.getElementById('backgroundAudio');
            backgroundAudio.pause();
            backgroundAudio.currentTime = 0; // Reset audio to beginning
        });
    });
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const level = event.target.getAttribute('data-level');
            startGame(level);
        });
    });

    function startGame(level) {
        console.log(`Starting game at ${level} level`);
        menu.style.display = 'none';
        gameContainer.style.display = 'flex'; 

        // Initialize and start the game with the selected difficulty level
        import('./Game1.js').then(module => {
            const Game = module.default;
            const game = new Game(gameCanvas, level);
            game.start();
        }).catch(error => {
            console.error('Error loading the game module:', error);
        });
    }
});
