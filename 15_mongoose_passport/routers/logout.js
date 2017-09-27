// GET logout
router.get('/signout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});