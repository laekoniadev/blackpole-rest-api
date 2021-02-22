const express = require('express');
const rateLimit = require('express-rate-limit');
const controller = require('../../controllers/batang.controller');

const router = express.Router();

const batangHitamLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 10, // start blocking after 5 requests
  message: {
    code: 429,
    success: false,
    message: 'Only 10 hits to batang hitam, sakit bang klo banyak2',
  },
});

const lirikLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 1 hour window
  max: 100, // start blocking after 5 requests
  message: {
    code: 429,
    success: false,
    message: 'Bang, tolong deh, ane kismin T_T. 5 menit cmn boleh hit 100 kali yah',
  },
});

router.get('/hitam/intro', batangHitamLimiter, controller.intro);
router.get('/hitam/ending', batangHitamLimiter, controller.ending);
router.get('/hitam/lirik/:part/:wordCount/:wordIndex', lirikLimiter, controller.lirik);

module.exports = router;
