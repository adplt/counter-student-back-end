import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res) => res.render('login.ejs', {
  messageFailed: req.flash('messageFailed'),
  messageSuccess: req.flash('messageSuccess'),
}));

router.post('/', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}));

export default router;
