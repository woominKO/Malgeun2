const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let notices = [];

app.listen(3000, function() {
    console.log('listening on 3000');
});

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notices', (req, res) => {
    res.json(notices);
});

app.post('/notices', (req, res) => {
    const notice = req.body;
    notices.push(notice);
    res.status(201).json(notice);
});