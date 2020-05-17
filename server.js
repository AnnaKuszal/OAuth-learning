const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

// configure passport provider options
passport.use(new GoogleStrategy({
  clientID: '624528673879-df9v2lr44jjuuo8uqk442ujjm8luginu.apps.googleusercontent.com',
  clientSecret: 'VFYpPGY8rD5zpc4nh0FqeK93',
  callbackURL: 'http://localhost:8000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
done(null, profile);
}));



app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/user/logged', (req, res) => {
  res.render('logged');
});

app.get('/user/no-permission', (req, res) => {
  res.render('noPermission');

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));
});

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});