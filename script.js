let betHistory = []; // Store bet history for display

function placeBet() {
    // Get the bet number from the input field
    let betNumber = document.getElementById("betNumber").value;
    
    // Validate if the bet number is 3 digits
    if (betNumber.length !== 3 || isNaN(betNumber)) {
        alert("Please enter a valid 3-digit number.");
        return;
    }
    
    // Generate the result number (a random 3-digit number for now)
    let result = generateResult();
    
    // Compare the bet number with the result and display the outcome
    if (betNumber === result) {
        document.getElementById("result").textContent = `You win! The result is ${result}.`;
    } else {
        document.getElementById("result").textContent = `You lose. The result is ${result}.`;
    }

    // Add the result to the history
    betHistory.push(result);
    updateHistory();
}

function generateResult() {
    // Generate a random 3-digit result between 000 and 999
    let result = Math.floor(Math.random() * 1000);
    return result.toString().padStart(3, "0"); // Ensure it's a 3-digit number
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
