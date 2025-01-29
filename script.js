let selectedNumbers = []; // Store selected numbers
let betAmount = 0; // Store the bet amount
let currentResult = null; // Store current result (admin input)

function selectNumber(number) {
    // Toggle selection of number
    if (selectedNumbers.includes(number)) {
        selectedNumbers = selectedNumbers.filter(num => num !== number);
    } else {
        selectedNumbers.push(number);
    }

    // Update the displayed selected numbers
    document.getElementById("selectedNumbersBox").textContent = selectedNumbers.join(", ");
}

function placeSingleBet() {
    // Get the bet amount from input field
    betAmount = parseInt(document.getElementById("betAmount").value);

    if (isNaN(betAmount) || betAmount < 10) {
        alert("Please enter a valid bet amount of ₹10 or greater.");
        return;
    }

    // Check if there are selected numbers
    if (selectedNumbers.length === 0) {
        alert("Please select at least one number.");
        return;
    }

    // Check if there's a result
    if (currentResult === null) {
        alert("Admin has not published the result yet.");
        return;
    }

    // Get the single digit result (sum of digits of the 3-digit result)
    let singleDigitResult = getSingleDigitResult(currentResult);

    // Check if any selected number matches the result
    let matchedNumbers = selectedNumbers.filter(num => num === singleDigitResult);

    if (matchedNumbers.length > 0) {
        let totalWinnings = matchedNumbers.length * 90; // ₹90 for each matched number
        document.getElementById("result").textContent = `You win ₹${totalWinnings}! The result is ${currentResult}.`;
    } else {
        document.getElementById("result").textContent = `You lose. The result is ${currentResult}.`;
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
