var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const http = require("http");
const app = require('./app');
const server = http.createServer(app);

(async function () {
    try {
      // db connection
      console.log("test");
      await mongoose.connect("mongodb://localhost:27017/starmark");
  
      console.log("DB CONNECTED");
      server.listen(80, () => // 서버 실행
        console.log("Server is listening to port: ", 80)
      );
    } catch (err) {
      console.log("DB CONNECTION ERROR");
      console.log(err);
    }
  })(); // 서버를 실행시키는 익명함수를 생성하자마자 실행시킨다.

