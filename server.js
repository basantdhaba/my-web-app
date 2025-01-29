const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let users = JSON.parse(fs.readFileSync("database.json", "utf-8"));
let bettingHistory = JSON.parse(fs.readFileSync("bets.json", "utf-8"));

const adminUsername = "admin";
const adminPassword = "admin123";

// **Admin Authentication**
function authenticateAdmin(req, res, next) {
    let { username, password } = req.body;
    if (username === adminUsername && password === adminPassword) {
        return next();
    } else {
        res.status(403).json({ message: "Invalid admin credentials!" });
    }
}

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

// **Fetch All Bets for Admin (Requires Authentication)**
app.post("/all-bets", authenticateAdmin, (req, res) => {
    res.json({ bets: bettingHistory });
});

// **Admin Updates Result**
app.post("/update-result", authenticateAdmin, (req, res) => {
    let { threeDigitNumber } = req.body;
    if (!/^\d{3}$/.test(threeDigitNumber)) return res.json({ message: "Invalid 3-digit number!" });

    // **Calculate single-digit result**
    let digits = threeDigitNumber.split("").map(Number);
    let singleDigitResult = (digits[0] + digits[1] + digits[2]) % 10;

    // **Update bets & distribute winnings**
    bettingHistory.forEach(bet => {
        if (!bet.result) {
            bet.result = singleDigitResult;
            
            if (bet.type === "single" && bet.number == singleDigitResult) {
                users[bet.username].wallet += bet.amount * 9;
            } else if (bet.type === "patti" && bet.number == threeDigitNumber) {
                users[bet.username].wallet += bet.amount * 130;
            }
        }
    });

    // **Save data**
    fs.writeFileSync("bets.json", JSON.stringify(bettingHistory, null, 2));
    fs.writeFileSync("database.json", JSON.stringify(users, null, 2));

    res.json({ message: "Result updated successfully!" });
});

// **Fetch Betting History**
app.get("/betting-history", (req, res) => {
    let { username } = req.query;
    let userBets = bettingHistory.filter(bet => bet.username === username);
    res.json({ history: userBets });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
