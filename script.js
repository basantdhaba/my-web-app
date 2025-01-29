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
