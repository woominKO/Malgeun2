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
  serverApi: ServerApiVersion.v1,
  serverSelectionTimeoutMS: 5000, // 연결 제한 5초
  socketTimeoutMS: 45000 // 소켓 제한 45초
});

let quotesCollection;
let index;

async function run() {
  try {
    await client.connect();
    const db = client.db('게시글');
    quotesCollection = db.collection('quotes');
    // index = db.collection('quotes').createIndex({ title: 1, detail: 1 }, { unique: true });
    console.log("Connected to Database");

    const PORT = process.env.PORT || 3000; // 기본 포트를 3000으로 설정
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    if (!PORT) {
      throw new Error('PORT environment variable is not defined');
    }

    app.use(express.static(path.join(__dirname, 'public')));

    // body-parser
    app.use(bodyParser.urlencoded({ extended: true }));

    // sendFile method를 통해 index.html파일로 연결하자
    app.route('/')
    .get((req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err) {
          res.status(500).send('Error loading index.html');
        }
      });
    })
    .post((req, res) => {
      res.status(405).send('POST method is not allowed on this route.');
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
          res.redirect('/notice');
        })
        .catch(error => console.error(error));
    });

    const { ObjectId } = require('mongodb');

    app.get('/writing/:id', async (req, res) => {
      try {
        const id = req.params.id; // URL에서 ID 추출
        
        // ObjectId 유효성 검사
        if (!ObjectId.isValid(id)) {
          return res.status(400).send('잘못된 ID 형식입니다.');
        }
    
        // MongoDB에서 데이터 조회
        const result = await quotesCollection.findOne({ _id: new ObjectId(id) });
    
        if (result) {
          // EJS에 데이터 전달 및 렌더링
          res.render('writing.ejs', { title: result.title, detail: result.detail });
        } else {
          res.status(404).send('게시글을 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('서버 오류 발생');
      }
    });
    


  

  } catch (e) {
    console.error(e);
  }
}

run().catch(console.dir);