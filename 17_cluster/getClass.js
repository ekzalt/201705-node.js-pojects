const getClass = obj => { // return string 'ClassName' || null || undefined
  if (obj === undefined) return;
  if (obj === null) return null;
  return obj.constructor.toString().match(/^(function|class) ([A-Za-z0-9]+)/)[2];
};

module.exports = getClass;
