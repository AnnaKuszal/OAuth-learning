const express = require('express');
const router = express.Router();

router.get('/logged', (req, res) => {
  req.user ? res.render('logged') : res.redirect('/no-permission');
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/profile', (req, res) => {
  req.user ? res.render('profile') : res.redirect('/no-permission');
});
  
router.get('/profile/settings', (req, res) => {
  req.user ? res.render('settings') : res.redirect('/no-permission');
});
  
module.exports = router;