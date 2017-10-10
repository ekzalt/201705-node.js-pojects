const createNote = (date, content) => {
  return MongoClient.connect(url)
    .then(db => db.collection('notes').insert({ date, content }));
};

module.exports = { createNote };
