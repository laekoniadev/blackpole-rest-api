exports.lirikIntro = [
  'konak!', 'konak!', 'sinar',
  'terang,', 'bijiku,', 'percaya',
  'diri,', 'tak', 'kusangka',
  'hai', 'engkow,', 'seorang',
  'waria.', 'perangilah', 'keinginan',
  'ganti', 'kelamin,', 'bumi',
  'akan', 'dikuasai', 'kebingungan.',
  'bangunlah', 'ksatria,', 'bangun',
  'sendiri.', 'tanpa', 'bantuan',
  'tangan,', 'dan', 'sabun',
  'mandi.', 'bangunlah', 'ksatria,',
  'bangun', 'sendiri.', 'tanpa',
  'obat', 'cina', 'atau',
  'nonton', 'film', 'semi',
  'dikomputer', 'pak', 'guru.',
  'ksatria', 'batang', 'hitam(ya?),',
  'konak', 'terus(oke).', 'ksatria',
  'batang', 'hitam(kenapa?),', 'pantat',
  'mundur(oohh).', 'ksatria', 'batang',
  'hitam', 'tam', 'tam!',
  'tam', 'tam!',
];

exports.lirikEnding = [
  'mi', 'goreng,', 'nasi',
  'dan', 'mecin.', 'dikiloin',
  'sama', 'manoharaaa.', 'si',
  "ro'im", 'suka', 'dinamo,',
  'karena', 'suka', 'kincir',
  'tai.', 'marah,', 'siti',
  'nuraeni.', 'cukurin', 'tukang',
  'satee~.', 'marah,', 'ummi',
  'noh', 'curiga(ummi', 'noh',
  'curiga),', 'kobokkan', 'ko',
  'dijilatin?', 'nyumputin', 'choki',
  'choki.', 'dongo,', 'bego,',
  'dan', 'disenteri.',
];

exports.lirikIntroQuery = (wordCount = 62, wordIndex = 0) => {
  let newArr;
  if (wordIndex > 0) {
    newArr = this.lirikIntro.slice(wordIndex, parseInt(wordIndex, 10) + parseInt(wordCount, 10));
  } else {
    newArr = this.lirikIntro.slice(wordIndex, wordCount);
  }
  return newArr.join(' ');
};

exports.lirikEndingQuery = (wordCount = 38, wordIndex = 0) => {
  let newArr;
  if (wordIndex > 0) {
    newArr = this.lirikEnding.slice(wordIndex, parseInt(wordIndex, 10) + parseInt(wordCount, 10));
  } else {
    newArr = this.lirikEnding.slice(wordIndex, wordCount);
  }
  return newArr.join(' ');
};
