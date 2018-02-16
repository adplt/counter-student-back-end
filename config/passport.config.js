import LocalStrategy from 'passport-local';
import User from '../models/User.model';

export default (passport) => {

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'nim',
    passwordField: 'nim',
    passReqToCallback: true
  }, (req, nim, password, done) =>
    User.findOne({'nim': nim}, (err, user) => {
      if (err) return done(err);
      else if (!user) return done(null, false, req.flash('messageFailed', 'No user found.'));
      else return User.findOneAndUpdate(
        {nim: user.nim},
        {$set: {visitCount: Number(user.visitCount + 1)}},
        {new: true, setDefaultsOnInsert: true}
      ).exec((err2, response) => {
        if (err2) return done(null, false, req.flash('messageFailed', err2));
        else return done(null, response, req.flash('messageSuccess', 'Thank you for absence'));
      });
    })));
};
