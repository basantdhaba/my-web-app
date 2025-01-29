const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let users = JSON.parse(fs.readFileSync("database.json", "utf-8"));

app.post("/login", (req, res) => {
    let { username } = req.body;

    if (!users[username]) {
        users[username] = { wallet: 100 }; // New user gets ₹100
    }

    fs.writeFileSync("database.json", JSON.stringify(users, null, 2));
    res.json(users[username]);
});

app.post("/bet", (req, res) => {
    let { username, selectedNumbers, betAmount } = req.body;

    if (!users[username]) {
        return res.json({ message: "User not found" });
    }

    let totalBet = betAmount * selectedNumbers.length;
    if (users[username].wallet < totalBet) {
        return res.json({ message: "Insufficient balance" });
    }

    users[username].wallet -= totalBet;
    fs.writeFileSync("database.json", JSON.stringify(users, null, 2));

    res.json({ message: `Bet Placed: ₹${totalBet} deducted`, wallet: users[username].wallet });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
