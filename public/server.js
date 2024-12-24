const express = require('express');
const path = require('path');
<<<<<<< HEAD
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();

app.use(bodyParser.json());

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'noticesDB';
let db;

MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);

    app.listen(3000, function() {
        console.log('Server is running on http://localhost:3000');
    });
});

app.use(express.static(path.join(__dirname, 'public')));
=======
const app = express();

// 서버와 브라우저가 연결될 때까지 기다리는 것
app.listen(3000, function() {
    console.log('listening on 3000');
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname)));
>>>>>>> parent of 93cdc8c (connect 3000)

// 루트 경로에서 index.html 파일 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
<<<<<<< HEAD
});

app.get('/notices', async (req, res) => {
    if (!db) {
        return res.status(500).send('Database not connected');
    }
    const notices = await db.collection('notices').find().toArray();
    res.json(notices);
});

app.post('/notices', async (req, res) => {
    if (!db) {
        return res.status(500).send('Database not connected');
    }
    const notice = req.body;
    await db.collection('notices').insertOne(notice);
    res.status(201).json(notice);
=======
>>>>>>> parent of 93cdc8c (connect 3000)
});