/* eslint-disable consistent-return */
const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');
const lirik = require('../utils/lirik');
const APIError = require('../utils/APIError');

const batangHitamIntro = path.join(__dirname, '../../audio/Ksatria-Batang-Hitam-Intro.mp3');
const batangHitamEnding = path.join(__dirname, '../../audio/Ksatria-Batang-Hitam-End-Title.mp3');

const introStat = fs.statSync(batangHitamIntro);
const endStat = fs.statSync(batangHitamEnding);

/**
 * Stream Ksatria-Batang-Hitam.mp3
 * @public
 */
exports.intro = async (req, res, next) => {
  try {
    const fileSize = introStat.size;
    const { range } = req.headers;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1;
      const chunksize = (end - start) + 1;
      const readStream = fs.createReadStream(batangHitamIntro, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.set(head);
      res.status(httpStatus.PARTIAL_CONTENT);
      readStream.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.set(head);
      res.status(httpStatus.OK);
      fs.createReadStream(batangHitamIntro).pipe(res);
    }
  } catch (e) {
    return next(e);
  }
};

/**
 * Stream Ksatria-Batang-Hitam-End-Title.mp3
 * @public
 */
exports.ending = async (req, res, next) => {
  try {
    const fileSize = endStat.size;
    const { range } = req.headers;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1;
      const chunksize = (end - start) + 1;
      const readStream = fs.createReadStream(batangHitamEnding, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.set(head);
      res.status(httpStatus.PARTIAL_CONTENT);
      readStream.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.set(head);
      res.status(httpStatus.OK);
      fs.createReadStream(batangHitamEnding).pipe(res);
    }
  } catch (e) {
    return next(e);
  }
};

/**
 * Stream Ksatria-Batang-Hitam-End-Title.mp3
 * @public
 */
exports.lirik = async (req, res, next) => {
  try {
    const { part, wordCount, wordIndex } = req.params;
    const wordCountInt = parseInt(wordCount, 10);
    const wordIndexInt = parseInt(wordIndex, 10);

    if (wordCountInt && (wordCountInt <= 62 && wordCountInt > 0)) {
      if (wordIndexInt <= 61 && wordIndexInt >= 0) {
        const lyrics = this.getLyrics(part, wordCountInt, wordIndexInt);
        res.status(httpStatus.OK).json({
          code: httpStatus.OK,
          success: true,
          data: [{
            lyrics,
          }],
        });
      } else {
        throw new APIError({
          success: false,
          message: 'wordIndex param must be integer and must not be higher than 61 or lower than 0',
          status: 400,
          stack: 'validation',
        });
      }
    } else {
      throw new APIError({
        success: false,
        message: 'wordCount param must be integer and must not be higher than 62 or lower than 1',
        status: 400,
        stack: 'validation',
      });
    }
  } catch (e) {
    return next(e);
  }
};

exports.getLyrics = (part, wordCount, wordIndex) => {
  switch (part) {
    case 'intro':
      return lirik.lirikIntroQuery(wordCount, wordIndex);
    case 'ending':
      return lirik.lirikEndingQuery(wordCount, wordIndex);
    case 'end':
      return lirik.lirikEndingQuery(wordCount, wordIndex);
    case 'allIntro':
      return lirik.lirikIntroQuery;
    case 'allEnding':
      return lirik.lirikEndingQuery;
    case 'allEnd':
      return lirik.lirikEndingQuery;
    default:
      return `${lirik.lirikIntroQuery} ${lirik.lirikEndingQuery}`;
  }
};
