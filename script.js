let betHistory = []; // Store bet history for display
let currentResult = null; // Store current result (admin input)

function placeSingleBet() {
    // Get the bet number from the input field
    let betNumber = parseInt(document.getElementById("betNumber").value);
    if (isNaN(betNumber) || betNumber < 0 || betNumber > 9) {
        alert("Please enter a valid single number (0-9).");
        return;
    }

    // Check if there's a result
    if (currentResult === null) {
        alert("Admin has not published the result yet.");
        return;
    }

    // Get the single digit result (sum of digits of the 3-digit result)
    let singleDigitResult = getSingleDigitResult(currentResult);

    // Payout for single number bet
    if (betNumber === singleDigitResult) {
        document.getElementById("result").textContent = `You win! The result is ${currentResult}. You win ₹90.`;
    } else {
        document.getElementById("result").textContent = `You lose. The result is ${currentResult}.`;
    }

    // Add result to history
    betHistory.push(currentResult);
    updateHistory();
}

function placePattiBet() {
    // Get the patti bet (3-digit number)
    let pattiNumber = document.getElementById("pattiNumber").value;
    if (isNaN(pattiNumber) || pattiNumber.length !== 3 || pattiNumber < 100 || pattiNumber > 999) {
        alert("Please enter a valid 3-digit Patti number.");
        return;
    }

    // Check if the Patti number is in ascending order
    let sortedPatti = pattiNumber.split('').sort().join('');
    if (sortedPatti !== pattiNumber) {
        alert("Patti must be in ascending order (e.g., 123, 234).");
        return;
    }

    // Check if there's a result
    if (currentResult === null) {
        alert("Admin has not published the result yet.");
        return;
    }

    // Payout for Patti bet
    if (sortedPatti === currentResult) {
        document.getElementById("result").textContent = `You win! The Patti is ${currentResult}. You win ₹1300.`;
    } else {
        document.getElementById("result").textContent = `You lose. The Patti is ${currentResult}.`;
    }

    // Add result to history
    betHistory.push(currentResult);
    updateHistory();
}

function publishResult() {
    // Get the 3-digit result from admin input
    let result = document.getElementById("adminResult").value;
    if (isNaN(result) || result.length !== 3 || result < 100 || result > 999) {
        alert("Please enter a valid 3-digit result.");
        return;
    }

    // Check if the result is in ascending order
    let sortedResult = result.split('').sort().join('');
    if (sortedResult !== result) {
        alert("The result must be in ascending order.");
        return;
    }

    // Set the result and display it
    currentResult = result;
    document.getElementById("result").textContent = `The result is ${result}.`;
}

function getSingleDigitResult(result) {
    // Calculate the sum of the digits and then reduce to a single digit
    let sum = result.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    return sum % 10; // Get the last digit of the sum
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
