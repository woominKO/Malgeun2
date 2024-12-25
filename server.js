const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');
const app = express();

// view engine 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const uri = process.env.MONGODB_URI || "mongodb+srv://woomin422:b9SdJwPrQCvPUX2c@cluster0.nwxfl.mongodb.net/";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let quotesCollection;

async function run() {
  try {
    await client.connect();
    const db = client.db('게시글');
    quotesCollection = db.collection('quotes');
    console.log("Connected to Database");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, function() {
      console.log(`listening on ${PORT}`);
    });

    app.use(express.static(path.join(__dirname, 'public')));

    // body-parser
    app.use(bodyParser.urlencoded({ extended: true }));

    // sendFile method를 통해 index.html파일로 연결하자
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });

    // 공지사항.html 경로에 대한 GET 요청 처리
    app.get('/notice', (req, res) => {
      quotesCollection.find().toArray()
        .then(results => {
          res.render('notice.ejs', { quotes: results });
        })
        .catch(error => console.error(error));
    });

    app.post('/quotes', (req, res) => {
      const quote = {
        title: req.body.title,
        detail: req.body.detail,
        date: new Date()
      };
      quotesCollection.insertOne(quote)
        .then(result => {
          res.redirect('/notice.html');
        })
        .catch(error => console.error(error));
    });

  } catch (e) {
    console.error(e);
  }
}

run().catch(console.dir);