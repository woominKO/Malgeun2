const express = require('express');
const path = require('path');
const app = express();

// 서버와 브라우저가 연결될 때까지 기다리는 것
app.listen(3000, function() {
    console.log('listening on 3000');
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname)));

// 루트 경로에서 index.html 파일 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});