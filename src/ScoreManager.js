// ScoreManager.js

export default class ScoreManager {
    constructor() {
        this.scores = {}; // Using an object to store scores by player or game level
    }

    // Method to add score for a player or a specific game level
    addScore(player, points) {
        if (!this.scores[player]) {
            this.scores[player] = 0;
        }
        this.scores[player] += points;
    }

    // Method to get score for a player or a specific game level
    getScore(player) {
        return this.scores[player] || 0;
    }

    // Method to reset score for a player or a specific game level
    resetScore(player) {
        this.scores[player] = 0;
    }

    // Example method to display scores for all players or game levels
    displayScores() {
        console.log("Scores:");
        for (let player in this.scores) {
            console.log(`${player}: ${this.scores[player]}`);
        }
    }
}
