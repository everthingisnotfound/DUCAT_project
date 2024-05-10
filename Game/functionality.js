let playerHealth = 100;
let playerMana = 100;
let opponentHealth = 100;
let opponentMana = 100;
let playerTurn = true;
const battleLog = document.getElementById('battle-log');
const overlay = document.getElementById('overlay');
const resultMessage = document.getElementById('result-message');

// Function to start mana regeneration for player and opponent
function startManaRegeneration() {
    setInterval(regenerateMana, 5000); // Regenerate mana every 5 seconds
}

// Function to regenerate mana for player and opponent
function regenerateMana() {
    if (playerMana < 100) {
        playerMana += 10; // Increase player's mana by 10 (if not already at max)
        if (playerMana > 100) {
            playerMana = 100; // Ensure player's mana does not exceed 100
        }
        document.getElementById('player-mana').textContent = playerMana;
    }
    if (opponentMana < 100) {
        opponentMana += 10; // Increase opponent's mana by 10 (if not already at max)
        if (opponentMana > 100) {
            opponentMana = 100; // Ensure opponent's mana does not exceed 100
        }
        document.getElementById('opponent-mana').textContent = opponentMana;
    }
}

function attack() {
    if (playerTurn && playerHealth > 0 && playerMana > 0) {
        const damage = Math.min(Math.floor(Math.random() * 10) + 10, opponentHealth); // Calculate damage, ensuring it doesn't exceed opponent's health
        const critChance = Math.random();
        if (critChance > 0.8) {
            opponentHealth -= damage * 2;
            playerMana -= 20;
            logMessage(`Player used Power Attack for ${damage * 2} damage!`);
        } else {
            opponentHealth -= damage;
            playerMana -= 10;
            logMessage(`Player attacked for ${damage} damage!`);
        }
        playerTurn = false;
        updateHealth();
        checkGameOver();
        if (opponentHealth > 0) {
            setTimeout(opponentAction, 1000);
        }
    }
}

function defend() {
    if (playerTurn && playerHealth > 0 && playerMana > 0) {
        const defense = Math.floor(Math.random() * 20) + 10;
        playerHealth += defense;
        playerMana -= 15;
        if (playerHealth > 100) {
            playerHealth = 100;
        }
        logMessage(`Player used Defense, gained ${defense} health!`);
        playerTurn = false;
        updateHealth();
        checkGameOver();
        if (opponentHealth > 0) {
            setTimeout(opponentAction, 1000);
        }
    }
}

function opponentAction() {
    if (opponentHealth > 0 && opponentMana > 0) {
        const action = Math.random();
        if (action > 0.5) {
            const damage = Math.min(Math.floor(Math.random() * 10) + 10, playerHealth); // Calculate damage, ensuring it doesn't exceed player's health
            playerHealth -= damage;
            logMessage(`Opponent attacked for ${damage} damage!`);
            opponentMana -= 10;
        } else {
            const defense = Math.floor(Math.random() * 20) + 10;
            opponentHealth += defense;
            if (opponentHealth > 100) {
                opponentHealth = 100;
            }
            logMessage(`Opponent used Defense, gained ${defense} health!`);
            opponentMana -= 15;
        }
        playerTurn = true;
        updateHealth();
        checkGameOver();
    }
}

function updateHealth() {
    document.getElementById('player-health').textContent = playerHealth;
    document.getElementById('player-mana').textContent = playerMana;
    document.getElementById('opponent-health').textContent = opponentHealth;
    document.getElementById('opponent-mana').textContent = opponentMana;
}

function logMessage(message) {
    const listItem = document.createElement('li');
    listItem.textContent = message;
    battleLog.appendChild(listItem);
    battleLog.scrollTop = battleLog.scrollHeight;
}

function checkGameOver() {
    if (playerHealth <= 0) {
        showOverlay('You Lose');
    }
    if (opponentHealth <= 0) {
        showOverlay('You Win');
    }
}

function showOverlay(message) {
    resultMessage.textContent = message;
    overlay.style.display = 'flex';
    if (message === 'You Lose') {
        logMessage('OPPONENT wins');
    } else if (message === 'You Win') {
        logMessage('USER wins');
    }
}

function hideOverlay() {
    overlay.style.display = 'none';
    resetGame(); // Call resetGame function when hiding overlay
}

function resetGame() {
    playerHealth = 100;
    playerMana = 100;
    opponentHealth = 100;
    opponentMana = 100;
    playerTurn = true;
    battleLog.innerHTML = ''; // Clear battle log
    updateHealth();
}

// Start mana regeneration when the game starts
startManaRegeneration();
