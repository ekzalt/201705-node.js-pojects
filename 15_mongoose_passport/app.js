const request = require('request');
const url = require('url');

const expressSession = require('express-session');
const passport = require('./passport/passport.config');

const mongoose = require('mongoose');
const dbConfig = require('./config/mongoose.config');

mongoose.connect(dbConfig.uri);

app.use(expressSession({ secret: 'someStrKey' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/tweets/:username', (req, res, next) => {
  let username = req.params.username;

  let options = {
    protocol: 'http:',
    host: 'api.twitter.com',
    pathname: '/1/statuses/user_timeline.json',
    query: {
      screen_name: username,
      count: 10
    }
  };

  let twitterUrl = url.format(options);

  // request(twitterUrl).pipe(res);

  request(twitterUrl, (err, res, body) => {
    let tweets = JSON.parse(body);

    res.render('tweets.ejs', {
      tweets: tweets,
      name: username
    });
  });
});