var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 700;
var nav = [{ Link: '/Books', Text: 'Books' }, { Link: '/Authors', Text: 'Authors' }];

var bookRouter = require('./src/routes/bookRoute')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(express.static('src/views'));
app.use(express.static('src'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret:'library'}));

require('./src/config/passport')(app);

app.use('/Books', bookRouter);
app.use('/admin', adminRouter);
app.use('/Auth', authRouter);


app.get('/', function (req, res) {
    res.render('index', { title: 'Hello from EJS', nav: nav });
});
app.get('/Books', function (req, res) {
    res.send('hello books');
});
app.get('/Authors', function (req, res) {

});
app.listen(port, function (error) {
    console.log('Running server on Port: ' + port);
});