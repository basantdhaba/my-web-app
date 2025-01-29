const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let users = JSON.parse(fs.readFileSync("database.json", "utf-8"));

// Fetch Wallet Balance
app.get("/wallet", (req, res) => {
    let userID = "testuser"; // Replace with logged-in user ID
    res.json({ balance: users[userID]?.wallet || 0 });
});

// Admin Approves Payment (Manual)
app.post("/approve-payment", (req, res) => {
    let { userID, amount } = req.body;

    if (!users[userID]) return res.json({ message: "User not found" });

    users[userID].wallet += amount;
    fs.writeFileSync("database.json", JSON.stringify(users, null, 2));

    res.json({ message: "Wallet updated successfully!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
