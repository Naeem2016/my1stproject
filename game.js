// Player database
const players = [
    { id: 1, name: "Lionel Messi", position: "Forward", rating: 93 },
    { id: 2, name: "Cristiano Ronaldo", position: "Forward", rating: 92 },
    { id: 3, name: "Kevin De Bruyne", position: "Midfielder", rating: 91 },
    { id: 4, name: "Virgil van Dijk", position: "Defender", rating: 89 },
    { id: 5, name: "Manuel Neuer", position: "Goalkeeper", rating: 88 },
    { id: 6, name: "Kylian Mbappé", position: "Forward", rating: 91 },
    { id: 7, name: "Erling Haaland", position: "Forward", rating: 90 },
    { id: 8, name: "Luka Modrić", position: "Midfielder", rating: 88 },
    { id: 9, name: "Sergio Ramos", position: "Defender", rating: 87 },
    { id: 10, name: "Alisson Becker", position: "Goalkeeper", rating: 89 },
    // Add more players as needed
];

class FootballGame {
    constructor() {
        this.teamA = [];
        this.teamB = [];
        this.selectedPlayers = new Set();
    }

    // Display available players
    displayAvailablePlayers() {
        console.log("=== AVAILABLE PLAYERS ===");
        players.forEach(player => {
            if (!this.selectedPlayers.has(player.id)) {
                console.log(`${player.id}. ${player.name} - ${player.position} (Rating: ${player.rating})`);
            }
        });
    }

    // Select player for a team
    selectPlayer(team, playerId) {
        const player = players.find(p => p.id === playerId);
        
        if (!player) {
            return "Player not found!";
        }
        
        if (this.selectedPlayers.has(playerId)) {
            return "Player already selected!";
        }

        if (team === 'A' && this.teamA.length < 5) {
            this.teamA.push(player);
            this.selectedPlayers.add(playerId);
            return `${player.name} added to Team A!`;
        } else if (team === 'B' && this.teamB.length < 5) {
            this.teamB.push(player);
            this.selectedPlayers.add(playerId);
            return `${player.name} added to Team B!`;
        } else {
            return "Team is full!";
        }
    }

    // Display team compositions
    displayTeams() {
        console.log("\n=== TEAM A ===");
        this.teamA.forEach((player, index) => {
            console.log(`${index + 1}. ${player.name} - ${player.position} (${player.rating})`);
        });

        console.log("\n=== TEAM B ===");
        this.teamB.forEach((player, index) => {
            console.log(`${index + 1}. ${player.name} - ${player.position} (${player.rating})`);
        });
    }

    // Calculate team average rating
    calculateTeamRating(team) {
        const total = team.reduce((sum, player) => sum + player.rating, 0);
        return (total / team.length).toFixed(1);
    }

    // Start the game
    startGame() {
        if (this.teamA.length !== 5 || this.teamB.length !== 5) {
            return "Both teams need exactly 5 players to start!";
        }

        console.log("\n🎯 MATCH STARTING! 🎯");
        console.log(`Team A (Avg: ${this.calculateTeamRating(this.teamA)}) vs Team B (Avg: ${this.calculateTeamRating(this.teamB)})`);
        
        // Simulate match outcome based on ratings
        const teamARating = this.calculateTeamRating(this.teamA);
        const teamBRating = this.calculateTeamRating(this.teamB);
        
        this.simulateMatch(teamARating, teamBRating);
    }

    // Simulate match result
    simulateMatch(teamARating, teamBRating) {
        const aScore = Math.floor((parseFloat(teamARating) / 100) * 5);
        const bScore = Math.floor((parseFloat(teamBRating) / 100) * 5);
        
        // Add some randomness
        const finalAScore = Math.max(0, aScore + Math.floor(Math.random() * 3) - 1);
        const finalBScore = Math.max(0, bScore + Math.floor(Math.random() * 3) - 1);
        
        console.log(`\n🏆 FINAL SCORE: Team A ${finalAScore} - ${finalBScore} Team B`);
        
        if (finalAScore > finalBScore) {
            console.log("🎉 Team A Wins!");
        } else if (finalBScore > finalAScore) {
            console.log("🎉 Team B Wins!");
        } else {
            console.log("🤝 It's a Draw!");
        }
    }
}

// Interactive prompt function
function startPlayerSelection() {
    const game = new FootballGame();
    
    console.log("Welcome to 5 vs 5 Football Game!");
    console.log("Select 5 players for each team.\n");
    
    // Simple command line interface simulation
    let selectingTeamA = true;
    
    while (game.teamA.length < 5 || game.teamB.length < 5) {
        const currentTeam = selectingTeamA ? 'A' : 'B';
        const teamSize = selectingTeamA ? game.teamA.length : game.teamB.length;
        
        console.log(`\nSelecting for Team ${currentTeam} (${teamSize}/5 players)`);
        game.displayAvailablePlayers();
        
        // In a real app, you would get user input here
        // For demo, we'll auto-select
        const availablePlayers = players.filter(p => !game.selectedPlayers.has(p.id));
        if (availablePlayers.length > 0) {
            const randomPlayer = availablePlayers[0];
            const result = game.selectPlayer(currentTeam, randomPlayer.id);
            console.log(result);
            
            if ((selectingTeamA && game.teamA.length === 5) || 
                (!selectingTeamA && game.teamB.length === 5)) {
                selectingTeamA = !selectingTeamA;
            }
        }
        
        // Break if no more players available
        if (availablePlayers.length === 0) break;
    }
    
    // Display final teams and start game
    game.displayTeams();
    game.startGame();
}

// Start the game
startPlayerSelection();