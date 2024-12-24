const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/notice-board', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Notice schema and model
const noticeSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: String
});

const Notice = mongoose.model('Notice', noticeSchema);

// Routes
app.get('/notices', async (req, res) => {
    const notices = await Notice.find();
    res.json(notices);
});

app.post('/notices', async (req, res) => {
    const notice = new Notice(req.body);
    await notice.save();
    res.json(notice);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});