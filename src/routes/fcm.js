const express = require('express');
const webpush = require('web-push');
const router = express.Router();

router.get('/getKey', (req, res) => {
  const keys = webpush.generateVAPIDKeys();
  webpush.setVapidDetails(process.env.EMAIL, keys.publicKey, keys.privateKey);

  res.status(200).json({ applicationServerKey: keys.publicKey });
});

router.post('/push2', async (req, res) => {
  const { endpoint, keys } = req.body;
  const msg = JSON.stringify({
    title: '호출 시도~~~',
    body: '바디222222222',
  });

  setTimeout(async()=> {
    try {
      await webpush.sendNotification({ endpoint, keys }, msg);
      res.status(200).json({ status: '성공', message: 'success' });
    } catch (error) {
      res.status(400).json({ status: '실패', message: error });
    }
  }, 5000)
  // try {
  //   await webpush.sendNotification({ endpoint, keys }, msg);
  //   res.status(200).json({ status: '성공', message: 'success' });
  // } catch (error) {
  //   res.status(400).json({ status: '실패', message: error });
  // }
});

router.post('/push', async (req, res) => {
  const { endpoint, keys } = req.body;
  console.log('키 갱신: ', keys);

  const msg = JSON.stringify({
    title: '최초 한번 시도 타이틀...',
    body: '바디',
  });

  try {
    await webpush.sendNotification(
      {
        endpoint,
        keys,
      },
      msg
    );
    await webpush.sendNotification(
      {
        endpoint,
        keys,
      },
      msg
    );
    await webpush.sendNotification(
      {
        endpoint,
        keys,
      },
      msg
    );

    res.status(200).json({ status: '성공', message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: '실패', message: error });
  }
});

router.get('/close', async (req, res) => {
  console.log('브라우저를 닫는걸 받아서 구독 취소 확인함');

  // try {
  //   await webpush.sendNotification(
  //     {
  //       endpoint,
  //       keys,
  //     },
  //     msg
  //   );

  //   res.status(200).json({ status: '성공', message: 'success' });
  // } catch (error) {
  //   console.log(error);
  //   res.status(400).json({ status: '실패', message: error });
  // }
});

module.exports = router;
