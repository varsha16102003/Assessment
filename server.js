const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


const databasePath = "database.json";

function generateUniqueCode() {
    return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
}


app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    try {
        const data = await fs.readFile(databasePath, "utf-8");
        const users = JSON.parse(data);

        if (users[username]) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const uniqueCode = generateUniqueCode();
        users[username] = { password, uniqueCode };
        await fs.writeFile(databasePath, JSON.stringify(users));

        res.redirect(`/success?code=${uniqueCode}`);
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const data = await fs.readFile(databasePath, "utf-8");
        const users = JSON.parse(data);

        if (!users[username] || users[username].password !== password) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        
        const sessionId = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);

        users[username].sessionId = sessionId;
        await fs.writeFile(databasePath, JSON.stringify(users));

        res.json({ sessionId });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/logout", async (req, res) => {
    
    res.sendStatus(200);
});


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

