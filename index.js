import express from 'express';
import http from 'http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const SECRET_PASSWORD = "mahd333";

app.use((req, res, next) => {
    if (req.path.startsWith('/uv/')) {
        return next();
    }
    if (req.query.code === SECRET_PASSWORD) {
        return next();
    }
    res.status(403).send('<h1>403 Forbidden</h1><p>Access Denied.</p>');
});

app.use('/uv/', express.static(uvPath));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
