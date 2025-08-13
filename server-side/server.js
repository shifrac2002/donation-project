const express = require('express');
const user = require('./routes/user')
const shul = require('./routes/shul')
const addresses = require('./routes/addresses')
const gabay = require('./routes/gabay')
const item = require('./routes/item')
const donation = require('./routes/donation')
const dedication = require('./routes/dedication')
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require("body-parser")
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth'); 
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(session({
  secret: '0556742514!!',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


const port = process.env.PORT || 6200;
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', user);
app.use('/api/user', user);
app.use('/api/dedication', dedication);
app.use('/api/gabay', gabay);
app.use('/api/shul', shul);
app.use('/api/item', item);
app.use('/api/addresses', addresses);
app.use('/api/donation', donation);
app.get('/', (req, res) => {
  res.send('<h1>Welcome</h1><a href="/api/auth/github">Login with GitHub</a>');
});

app.use(cors())
app.use(express.static('images'));
app.listen(port, () => {
  console.log('server is up and running');
})