document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu');
    const gameContainer = document.getElementById('gameContainer');
    const gameCanvas = document.getElementById('gameCanvas');
    const buttons = document.querySelectorAll('.level-button');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const level = event.target.getAttribute('data-level');
            startGame(level);
        });
    });

    function startGame(level) {
        console.log(`Starting game at ${level} level`);
        menu.style.display = 'none';
        gameContainer.style.display = 'block';

        // Initialize and start the game with the selected difficulty level
        import('./Game1.js').then(module => {
            const Game = module.default;
            const game = new Game(gameCanvas, level);
            game.start();
        });
    }
});