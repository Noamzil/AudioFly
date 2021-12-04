export const utilService = {
  makeId,
  makeLength,
  makeTags,
  ISOStringToSec,
  getTimeStr
};

function makeId(length = 5) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function makeLength() {
  const length = Math.floor(Math.random() * (6000000 - 3000000) + 3000000);
  return length;
}

function makeTags(num) {
  const allTags = [
    'rock',
    'pop',
    'func',
    'soul',
    'punk',
    'metal',
    'jazz',
    'prog rock',
    'art pop',
    'alt hip hop',
    'hip hop',
    'rap',
  ];
  var tags = [];
  for (var i = 0; i < num; i++) {
    const idx = Math.floor(Math.random() * allTags.length);
    tags.push(allTags[idx]);
  }
  return tags;
}

function ISOStringToSec(str) {
  var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  var hours = 0,
    minutes = 0,
    seconds = 0,
    totalseconds;

  if (reptms.test(str)) {
    var matches = reptms.exec(str);
    if (matches[1]) hours = Number(matches[1]);
    if (matches[2]) minutes = Number(matches[2]);
    if (matches[3]) seconds = Number(matches[3]);
    totalseconds = hours * 3600 + minutes * 60 + seconds;
  }
  return totalseconds;
}
function getTimeStr(time) {
    var sec_num = parseInt(time, 10); 
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hours === 0) {
      return minutes + ':' + seconds;
    }

    return hours + ':' + minutes + ':' + seconds;
  }