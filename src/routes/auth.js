const express = require('express');
const router = express.Router();
const fs = require('fs');

// 사용자 정보를 저장할 임시적인 파일
const usersFilePath = './user.json';

// 로그인 API
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 실제로는 데이터베이스에서 사용자 정보를 확인해야 함
  const isValidUser = checkUser(username, password);

  if (isValidUser) {
    const accessToken = generateAccessToken(username); // Access Token 생성 (임시적으로 단순화)
    const refreshToken = generateRefreshToken(username); // Refresh Token 생성 및 저장
    saveRefreshToken(username, refreshToken);

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

    res.status(200).json({ message: 'sccess', accessToken });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// 인증 검사 API
router.post('/authenticate', (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Refresh Token 검증 (임시적으로 단순화)
  const username = verifyRefreshToken(refreshToken);

  if (username) {
    // 새로운 Access Token 발급 (임시적으로 단순화)
    const newAccessToken = generateAccessToken(username);

    res.json({ accessToken: newAccessToken });
  } else {
    // Refresh Token이 유효하지 않은 경우
    res.clearCookie('refreshToken');
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// 사용자 정보 확인 (임시적으로 단순화)
function checkUser(username, password) {
  // 실제로는 데이터베이스에서 확인해야 함
  return username === 'test' && password === 'test_password';
}

// Access Token 생성 (임시적으로 단순화)
function generateAccessToken(username) {
  return `access_token_${username}`;
}

// Refresh Token 생성 (임시적으로 단순화)
function generateRefreshToken(username) {
  return `refresh_token_${username}`;
}

// Refresh Token 저장 (임시적으로 단순화)
function saveRefreshToken(username, refreshToken) {
  const userData = { [username]: refreshToken };
  const existingData = fs.existsSync(usersFilePath)
    ? JSON.parse(fs.readFileSync(usersFilePath, 'utf8'))
    : {};

  const newData = {
    ...existingData,
    ...userData,
  };

  fs.writeFileSync(usersFilePath, JSON.stringify(newData, null, 2), { flag: 'w' }); // flag: 'w'로 변경하여 덮어쓰기
}

// Refresh Token 검증 (임시적으로 단순화)
function verifyRefreshToken(refreshToken) {
  // 실제로는 저장된 Refresh Token을 확인해야 함
  const existingData = fs.existsSync(usersFilePath)
    ? JSON.parse(fs.readFileSync(usersFilePath, 'utf8'))
    : {};

  for (const username in existingData) {
    if (existingData[username] === refreshToken) {
      return username;
    }
  }

  return null;
}

module.exports = router;
