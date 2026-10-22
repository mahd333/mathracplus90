const express = require('express');
const http = require('http');
const { uvPath } = require('@titaniumnetwork-dev/ultraviolet');

const app = express();
const server = http.createServer(app);

// CHANGE THIS TO YOUR SECRET PASSWORD!
const SECRET_PASSWORD = "mahd333";

// The Password Guard
app.use((req, res, next) => {
    // Let internal proxy files load without blocking them
    if (req.path.startsWith('/uv/')) {
        return next();
    }
    
    // Check if you typed the secret code in the URL
    if (req.query.code === SECRET_PASSWORD) {
        return next();
    }
    
    // What random people see if they don't know the password
    res.status(403).send(`
        <html>
        <head><title>403 Forbidden</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding-top: 100px; background: #111; color: #fff;">
            <h1>403 Forbidden</h1>
            <p>Access Denied. Please contact your administrator for school assignment permissions.</p>
        </body>
        </html>
    `);
});

// Serve the Ultraviolet proxy files
app.use('/uv/', express.static(uvPath));

// Serve the clean search box page when unlocked
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Math Homework Helper</title>
            <style>
                body { font-family: sans-serif; background: #222; color: #fff; text-align: center; padding-top: 100px; }
                input { padding: 10px; width: 350px; border-radius: 5px; border: 1px solid #444; background: #333; color: #fff; }
                button { padding: 10px 20px; border-radius: 5px; background: #007bff; color: white; border: none; cursor: pointer; font-weight: bold; }
                button:hover { background: #0056b3; }
            </style>
        </head>
        <body>
            <h2>Enter URL to view math study resource:</h2>
            <form action="/uv/service/" method="GET">
                <input type="text" name="url" placeholder="https://example.com" required>
                <button type="submit">Go</button>
            </form>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
