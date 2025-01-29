let betHistory = []; // Store bet history for display
let roundResults = []; // Store the round results
let roundCount = 0; // Track rounds

function placeSingleBet() {
    // Get the bet number from the input field
    let betNumber = parseInt(document.getElementById("betNumber").value);
    if (isNaN(betNumber) || betNumber < 1 || betNumber > 9) {
        alert("Please enter a valid single number (1-9).");
        return;
    }

    // Generate the result number (3-digit random for now)
    let result = generateResult();
    
    // Get the single digit result (last digit of the 3-digit number)
    let singleDigitResult = parseInt(result[result.length - 1]);

    // Payout for single number bet
    if (betNumber === singleDigitResult) {
        document.getElementById("result").textContent = `You win! The result is ${result}. You win ₹90.`;
    } else {
        document.getElementById("result").textContent = `You lose. The result is ${result}.`;
    }

    // Add result to history
    betHistory.push(result);
    updateHistory();
}

function placePattiBet() {
    // Get the patti bet (3-digit number)
    let pattiNumber = document.getElementById("pattiNumber").value;
    if (isNaN(pattiNumber) || pattiNumber.length !== 3 || pattiNumber < 100 || pattiNumber > 999) {
        alert("Please enter a valid 3-digit Patti number.");
        return;
    }

    // Generate the result number (3-digit random for now)
    let result = generateResult();
    
    // Sort the result and patti in ascending order
    let sortedResult = result.split('').sort().join('');
    let sortedPatti = pattiNumber.split('').sort().join('');

    // Payout for Patti bet
    if (sortedPatti === sortedResult) {
        document.getElementById("result").textContent = `You win! The Patti is ${result}. You win ₹1300.`;
    } else {
        document.getElementById("result").textContent = `You lose. The Patti is ${result}.`;
    }

    // Add result to history
    betHistory.push(result);
    updateHistory();
}

function placeRoundBet() {
    let roundNumber = parseInt(document.getElementById("roundNumber").value);
    if (isNaN(roundNumber) || roundNumber < 1 || roundNumber > 8) {
        alert("Please enter a valid round number (1-8).");
        return;
    }

    // Check if the round number is correct
    if (roundNumber === roundCount) {
        document.getElementById("result").textContent = `You win! You guessed the round correctly. You win ₹800.`;
    } else {
        document.getElementById("result").textContent = `You lose. The correct round was ${roundCount}.`;
    }

    // Add result to history
    betHistory.push(roundCount);
    updateHistory();
}

function generateResult() {
    // Generate a random 3-digit result between 100 and 999
    let result = Math.floor(Math.random() * 900) + 100;
    return result.toString();
}

function updateHistory() {
    // Update the history section with the latest results
    let historyList = document.getElementById("history");
    historyList.innerHTML = ""; // Clear previous history
    betHistory.slice(-5).forEach(result => {
        let listItem = document.createElement("li");
        listItem.textContent = `Result: ${result}`;
        historyList.appendChild(listItem);
    });
}

// Function to handle round tracking
function nextRound() {
    roundCount++;
    if (roundCount > 8) roundCount = 1; // Reset to round 1 after 8 rounds
    console.log(`Next round is: ${roundCount}`);
}
