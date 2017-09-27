module.exports = passport => {
  // GET login
  router.get('/', (req, res, next) => {
    res.render('index', { message: req.flash('message') });
  });

  // POST login
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
  }));

  // GET registry
  router.get('/signup', (req, res, next) => {
    res.render('register', { message: req.flash('message') });
  });

  // POST registry
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  return router;
};