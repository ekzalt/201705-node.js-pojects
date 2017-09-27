const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// reg 'login' strategy
passport.use('login', new LocalStrategy({
  passReqToCallback: true

}, (req, username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) return done(err);

    if (!user) {
      console.log(`User Not Found with username: ${username}`);
      return done(null, false, req.flash('message', 'User Not Found'));
    }

    return done(null, user);
  });
}));

// reg 'signup' strategy
passport.use('signup', new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, done) => {
  const findOrCreateUser = () => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        console.log(`Error in SignUp: ${err}`);
        return done(err);
      }
  
      if (user) {
        console.log('User Already Exists');
        return done(null, false, req.flash('message', 'User Already Exists'));
      
      } else {
        let newUser = new User();
        newUser.username = username;
        newUser.password = createHash(password);
        newUser.email = req.params.email;
        newUser.firstName = req.params.firstName;
        newUser.lastName = req.params.lastName;

        newUser.save(err => {
          if (err) {
            console.log(`Error In Saving user: ${err}`);
            throw err;
          }
        
        // code ...
        });
      }
    });
  };
}));

module.exports = passport;