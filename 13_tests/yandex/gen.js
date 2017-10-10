/*
const generateNoteId = str => {
  if (typeof str !== 'string') return;

  return str
    .split('\n').shift()
    .replace(/[^a-z0-9\s]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
};
*/

//////////////////////////////////////////////////

/*
const replaceSpaces = str => {
  return str
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const generateNoteId = str => {
  if (typeof str === 'string') {
    str = str.split('\n').shift().toLowerCase();

    return replaceSpaces(str);
  }
};
*/

//////////////////////////////////////////////////

const translit = require('translit');

const generateNoteId = str => {
  if (typeof str !== 'string') return;

  return translit(str)
    .split('\n').shift()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

module.exports = generateNoteId;
