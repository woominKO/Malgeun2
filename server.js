const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const path = require('path');
const multer = require('multer'); // multer 추가

const app = express();

// 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 정적 파일 제공
app.use('/uploads', express.static('public/uploads'));

// MongoDB 설정
const uri = process.env.MONGODB_URI || "mongodb+srv://woomin422:b9SdJwPrQCvPUX2c@cluster0.nwxfl.mongodb.net/";
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
});

let quotesCollection;

// multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // 이미지 저장 경로
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // 고유 파일명
  }
});
const upload = multer({ storage: storage }); // 업로드 설정

async function run() {
  try {
    await client.connect();
    const db = client.db('게시글');
    quotesCollection = db.collection('quotes');
    console.log("Connected to Database");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    // body-parser 설정
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded({ extended: true }));

    // 메인 페이지
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

    // 공지사항 페이지
    app.get('/notice', (req, res) => {
      quotesCollection.find().toArray()
        .then(results => {
          res.render('notice.ejs', { quotes: results });
        })
        .catch(error => console.error(error));
    });

    // 글쓰기 처리 (이미지 포함)
    app.post('/quotes', upload.single('image'), (req, res) => {
      const imagePath = req.file ? '/uploads/' + req.file.filename : ''; // 이미지 경로 설정

      const quote = {
        title: req.body.title,
        detail: req.body.detail,
        image: imagePath,
        date: new Date()
      };

      quotesCollection.insertOne(quote)
        .then(result => {
          res.redirect('/notice');
        })
        .catch(error => console.error(error));
    });

    // 게시글 상세 보기
    app.get('/writing/:id', async (req, res) => {
      try {
        const id = req.params.id;

        // ID 유효성 검사
        if (!ObjectId.isValid(id)) {
          return res.status(400).send('잘못된 ID 형식입니다.');
        }

        // MongoDB에서 데이터 조회
        const result = await quotesCollection.findOne({ _id: new ObjectId(id) });

        if (result) {
          res.render('writing.ejs', {
            title: result.title,
            detail: result.detail,
            image: result.image || '' // 이미지 없을 때 빈 문자열 처리
          });
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
