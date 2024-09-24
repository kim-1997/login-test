// express: 웹 서버를 만들기 위한 프레임워크입니다.
// mysql: MySQL 데이터베이스와 연결하기 위한 라이브러리입니다.
// cors: 다른 출처의 요청을 허용하기 위한 미들웨어입니다.
// body-parser: 요청의 본문을 JSON 형식으로 파싱하는 미들웨어입니다.
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(
    cors({
        origin: 'http://localhost:3000', // 리액트 앱의 주소
        credentials: true,
    })
);
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // MySQL 사용자 이름
    password: '1234', // MySQL 비밀번호
    database: 'myloginapp',
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected');
});

// 로그인 API
app.post('/api/login', (req, res) => {
    const { userId, password } = req.body;
    db.query('SELECT * FROM users WHERE userId = ? AND password = ?', [userId, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: '서버 오류' }); // 서버 오류 처리
        }
        if (results.length > 0) {
            res.json({ message: '로그인 성공' });
        } else {
            res.status(401).json({ message: '로그인 실패' });
        }
    });
});

// 회원가입 API
app.post('/api/register', (req, res) => {
    const { userId, password } = req.body;

    // 사용자 중복 체크
    db.query('SELECT * FROM users WHERE userId = ?', [userId], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.status(409).json({ message: '이미 존재하는 사용자 ID입니다.' });
        }

        // 새로운 사용자 추가
        db.query('INSERT INTO users (userId, password) VALUES (?, ?)', [userId, password], (err, results) => {
            if (err) throw err;
            res.status(201).json({ message: '회원가입 성공' });
        });
    });
});

app.listen(3001, () => {
    console.log('서버 실행 중: http://localhost:3001');
});
