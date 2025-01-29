async function login() {
    let username = document.getElementById("username").value;
    if (!username) return alert("Enter a username");

    let res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
    });

    let data = await res.json();
    document.getElementById("wallet").innerText = `Wallet Balance: ₹${data.wallet}`;
}
