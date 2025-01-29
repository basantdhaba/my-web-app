async function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    let data = await res.json();
    document.getElementById("loginMessage").innerText = data.message;

    if (data.success) {
        localStorage.setItem("username", username);
        fetchWalletBalance();
    }
}

async function register() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    let data = await res.json();
    document.getElementById("loginMessage").innerText = data.message;
}

async function fetchWalletBalance() {
    let username = localStorage.getItem("username");
    if (!username) return;

    let res = await fetch(`/wallet?username=${username}`);
    let data = await res.json();
    document.getElementById("walletBalance").innerText = data.balance;
}


async function placeBet(type, number, amount) {
    let username = localStorage.getItem("username");
    if (!username) return alert("Please log in to place a bet!");

    let res = await fetch("/place-bet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, type, number, amount })
    });

    let data = await res.json();
    alert(data.message);
    fetchBettingHistory();
    fetchWalletBalance();
}

async function fetchBettingHistory() {
    let username = localStorage.getItem("username");
    if (!username) return;

    let res = await fetch(`/betting-history?username=${username}`);
    let data = await res.json();

    let tableBody = document.querySelector("#bettingHistoryTable tbody");
    tableBody.innerHTML = "";
    
    data.history.forEach(bet => {
        let row = `<tr>
            <td>${bet.round}</td>
            <td>${bet.type}</td>
            <td>${bet.number}</td>
            <td>₹${bet.amount}</td>
            <td>${bet.result ? bet.result : "Pending"}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}
