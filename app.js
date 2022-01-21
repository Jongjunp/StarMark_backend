const express = require("express"); 
const app = express(); // express app 생성

const router = require("./routes/index"); // 위에서 작성한 /routes/index.js 의 모듈인 router 를 임포트 한다.
app.use('/',router); // express app 을 라우팅 하는 모듈로 넘겨준다.

module.exports = app; // 앱을 다시 모듈로 내보낸다.