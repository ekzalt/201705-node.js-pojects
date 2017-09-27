const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
};

// GET home
router.get('/home', isAuthenticated, (req, res, next) => {
  res.render('home', { user: req.user });
});