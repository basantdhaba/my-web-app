const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let users = JSON.parse(fs.readFileSync("database.json", "utf-8"));
let bettingHistory = JSON.parse(fs.readFileSync("bets.json", "utf-8"));

// **User Registration**
app.post("/register", (req, res) => {
    let { username, password } = req.body;
    if (users[username]) return res.json({ message: "Username already exists!" });

    users[username] = { password, wallet: 0 };
    fs.writeFileSync("database.json", JSON.stringify(users, null, 2));

    res.json({ message: "Registration successful! Please login." });
});

// **User Login**
app.post("/login", (req, res) => {
    let { username, password } = req.body;
    if (!users[username] || users[username].password !== password) {
        return res.json({ message: "Invalid username or password!", success: false });
    }

    res.json({ message: "Login successful!", success: true });
});

// **Fetch Wallet Balance**
app.get("/wallet", (req, res) => {
    let { username } = req.query;
    if (!users[username]) return res.json({ balance: 0 });

    res.json({ balance: users[username].wallet });
});

// **Admin Approves Payment**
app.post("/approve-payment", (req, res) => {
    let { username, amount } = req.body;

    if (!users[username]) return res.json({ message: "User not found" });

    users[username].wallet += amount;
    fs.writeFileSync("database.json", JSON.stringify(users, null, 2));

    res.json({ message: `Wallet updated for ${username}!` });
});

// **User Places a Bet**
app.post("/place-bet", (req, res) => {
    let { username, type, number, amount } = req.body;
    if (!users[username]) return res.json({ message: "User not found" });

    if (users[username].wallet < amount) {
        return res.json({ message: "Insufficient balance!" });
    }

    users[username].wallet -= amount;
    fs.writeFileSync("database.json", JSON.stringify(users, null, 2));

    let round = "Game " + (bettingHistory.length + 1);
    bettingHistory.push({ username, round, type, number, amount, result: null });
    fs.writeFileSync("bets.json", JSON.stringify(bettingHistory, null, 2));

    res.json({ message: "Bet placed successfully!" });
});

// **Fetch Betting History**
app.get("/betting-history", (req, res) => {
    let { username } = req.query;
    let userBets = bettingHistory.filter(bet => bet.username === username);
    res.json({ history: userBets });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
