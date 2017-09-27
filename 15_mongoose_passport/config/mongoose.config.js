module.exports = {
  // uri: 'mongodb://<dbUser>:<dbPass>@site.com:27017/<dbName>',
  uri: 'mongodb://localhost/test',

  options: {
    useMongoClient: true,
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
  }
};