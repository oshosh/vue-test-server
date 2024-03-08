const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
const fcm = require('./routes/fcm');
const auth = require('./routes/auth');

const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
};

dotenv.config();
const app = express();
const port = 9000;

app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(corsMiddleware);

app.get('/test-call', (req, res) => {
  res.status(200).json('Hello World!');
});

app.use('/api/fcm', fcm);
app.use('/api/auth', auth);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
