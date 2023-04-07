const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

require('dotenv').config();

app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('assets'));
app.use(express.static('js'));
app.use(express.static('exercise'));
//app.set('view engine', 'ejs');

//app.engine('html', require('html').renderFile);
app.engine('html', function (path, options, callback) {
  fs.readFile(path, 'utf-8', (err, file) => {
    if (err) return callback(err);
    return callback(null, file);
  });
});
app.set('view engine', 'html');


/*
app.listen(8080, ()=>{
	console.log('server on');
})
*/
/*
app.get('/', (req, res)=>{
    res.render('index.ejs');
})
*/
app.use('/member', require('./routes/member.js'));

//const MongoClient = require('mongodb').MongoClient;
const mongoose=require('mongoose');
//const db_url = 'mongodb+srv://minji:dbminji98@cluster0.7aje40r.mongodb.net/?retryWrites=true&w=majority';
const db_id = process.env.DB_ID;
const db_pw = process.env.DB_PW;
const db_cluster = process.env.DB_CLUSTER;
const server_port = process.env.SERVER_PORT;
const db_url = 'mongodb+srv://' + db_id + ':' + db_pw + '@' + db_cluster + '.7aje40r.mongodb.net/?retryWrites=true&w=majority';
let db;


const { User } = require('./models/User'); // 지난 번 만들어 두었던 User.js(스키마) 임포트
const { Post } = require('./models/Post');

app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencode

app.use(express.json()); // application/json

app.get('/', (req, res) => {
  res.render('index1.html');
})
app.get('/exercise', (req, res) => {
  res.render('posenet.html');
})
app.get('/register', (req, res) => {
  res.render('register.html');
})
app.get('/login', (req, res) => {
  res.render('login.html');
})
app.get('/alert', (req, res) => {
  res.render('alert.html');
})
app.get('/boardwrite', (req, res) => {
  res.render('boardWriteForm.html');
})
app.get('/boardlist', (req, res) => {
  res.render('boardList.html');
})

app.use(express.static('/js'));
app.use(express.static('/public'));

//  register api
app.post('/register', (req, res) => {  // saveData로 바꾸면 안됨
  const { emailLocal, emailDomain } = req.body;
  const email = emailLocal + '@' + emailDomain;  
  const id = req.body.id;
  const pw = req.body.pw;
  const name = req.body.name;
  const { year, month, day } = req.body;
  const birth = year + month + day;
  //const user = new User(req.body); // 상단에서 require로 가져온 User 스키마에 req.body를 담아 user라는 인스턴스로 만든다.
  const user = new User({ id, pw, name, email, birth });  
  
  user.save((err, userInfo)=>{
    if (err) {
      return res.redirect('/register?error=true');
    }
    return res.redirect('/alert');
  })
});


//login api
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { id, pw } = req.body;
  // id를 사용하여 MongoDB에서 사용자를 검색
  User.findOne({ id: id }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else if (!user) {
      //res.status(404).send('User Not Found');
      const html = `
            <script>alert('아이디가 틀렸습니다.')</script>
            <meta http-equiv="refresh" content="0; url=/login">
          `;
          res.send(html);
    } else {
      // 비밀번호가 일치하는지 확인
      bcrypt.compare(pw, user.pw, (err, result) => {
        if (result === true) {
          const html = `             
            <script>alert('로그인되었습니다.')</script>
            <meta http-equiv="refresh" content="0; url=/">    
          `;    //로그인 되었을 때 'login'버튼 사라지게 해야됨
          res.send(html);
        } else {
          //res.status(401).send('Incorrect Password');
          const html = `
            <script>alert('비밀번호가 틀렸습니다.')</script>
            <meta http-equiv="refresh" content="0; url=/login">
          `;
          res.send(html);
        }
      });
    }
  });
});


//write api
app.post('/write',(req, res) => {
  const title = req.body.title;
  req.body.author = req.user._id;
  const content = req.body.content;
  const post = new Board({ title, content });
      
  post.save((err, posting)=>{
    if (err) {
      return res.redirect('/write?error=true');
      }
      return res.redirect('/write');
  })
});





app.listen(server_port, () => console.log(`${server_port}포트입니다.`));

mongoose
  .connect(
    db_url,
    {
      // useNewUrlPaser: true,
      // useUnifiedTofology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({extended: true}));
