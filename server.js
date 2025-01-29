const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let users = JSON.parse(fs.readFileSync("database.json", "utf-8"));
let results = JSON.parse(fs.readFileSync("results.json", "utf-8") || "{}");

app.post("/publish-result", (req, res) => {
    let { gameRound, threeDigitResult } = req.body;

    if (!isValidPatti(threeDigitResult)) {
        return res.json({ message: "Invalid Patti (must be in ascending order)" });
    }

    let sum = threeDigitResult.split("").reduce((acc, num) => acc + parseInt(num), 0);
    let singleDigitResult = sum % 10; // Last digit of sum

    results[gameRound] = { threeDigit: threeDigitResult, singleDigit: singleDigitResult };
    fs.writeFileSync("results.json", JSON.stringify(results, null, 2));

    // Check winners and update wallets
    for (let user in users) {
        let userData = users[user];
        if (userData.bets) {
            let winAmount = 0;

            userData.bets.forEach(bet => {
                if (bet.numbers.includes(singleDigitResult)) {
                    winAmount += bet.amount * 9; // Single Digit Winning
                }
                if (bet.numbers.includes(parseInt(threeDigitResult))) {
                    winAmount += bet.amount * 130; // Patti Winning
                }
            });

            users[user].wallet += winAmount;
            users[user].bets = [];
        }
    }

    fs.writeFileSync("database.json", JSON.stringify(users, null, 2));

    res.json({ message: "Result published successfully!" });
});

app.get("/latest-result", (req, res) => {
    let lastGame = Object.keys(results).pop();
    res.json(results[lastGame] || {});
});

function isValidPatti(num) {
    let sorted = num.split("").sort().join("");
    return num === sorted;
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
