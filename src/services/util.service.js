export const utilService = {
  makeId,
  makeLength,
  makeTags,
  ISOStringToSec,
  writeTime,
  getRelativeTime,
  secToStr,
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
function secToStr(sec) {
  var sec_num = parseInt(sec, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (hours === '00') {
    return minutes + ':' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
}
function writeTime(timeStemp) {
  var min = parseInt(timeStemp / (1000 * 60));
  var sec = parseInt((timeStemp % (1000 * 60)) / 1000);
  if (min < 10) min = '0' + min;
  if (sec < 10) sec = '0' + sec;
  return min + ':' + sec;
}

function getRelativeTime(previous) {
  var current = Date.now();
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
  }
}
