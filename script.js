let selectedNumbers = [];
let username = "";

async function login() {
    username = document.getElementById("username").value;
    if (!username) return alert("Enter a username");

    let res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
    });

    let data = await res.json();
    document.getElementById("wallet").innerText = `Wallet Balance: ₹${data.wallet}`;
}

function selectNumber(num) {
    if (!selectedNumbers.includes(num)) {
        selectedNumbers.push(num);
        document.getElementById("selectedNumbers").innerText = selectedNumbers.join(", ");
    }
}

async function placeBet() {
    let betAmount = parseInt(document.getElementById("betAmount").value);
    if (!betAmount || betAmount < 10) {
        return alert("Minimum bet amount is ₹10");
    }
    if (selectedNumbers.length === 0) {
        return alert("Select at least one number");
    }

    let res = await fetch("/bet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, selectedNumbers, betAmount }),
    });

    let data = await res.json();
    alert(data.message);
    document.getElementById("wallet").innerText = `Wallet Balance: ₹${data.wallet}`;
    selectedNumbers = [];
    document.getElementById("selectedNumbers").innerText = "";
}
async function getLatestResult() {
    let res = await fetch("/latest-result");
    let data = await res.json();
    document.getElementById("latestResult").innerText = `Latest Result: ${data.threeDigit} (Single: ${data.singleDigit})`;
}

setInterval(getLatestResult, 5000); // Update every 5 seconds
async function fetchWalletBalance() {
    let res = await fetch("/wallet");
    let data = await res.json();
    document.getElementById("walletBalance").innerText = data.balance;
}
