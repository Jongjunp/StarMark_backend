var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const http = require("http");
const server = http.createServer(app);

(async function () {
    try {
      // db connection
      await mongoose.connect("mongodb://localhost:27017/board", {  // MONGO_URL 엔 각자 자신의 mongdoDB 를 연결하는 주소를 적으면 된다.
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
  
      console.log("DB CONNECTED");
      server.listen(8000, () => // 서버 실행
        console.log("Server is listening to port: ", 8000)
      );
    } catch (err) {
      console.log("DB CONNECTION ERROR");
      console.log(err);
    }
  })(); // 서버를 실행시키는 익명함수를 생성하자마자 실행시킨다.

