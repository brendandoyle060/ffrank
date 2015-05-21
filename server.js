var express = require('express');
var app     = express();
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var multer     = require('multer'); 
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var mongoose = require('mongoose');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'this is the secret' }));
app.use(multer());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    created: {type: String, lowercase: true, trim: true}
}, {collection: 'users'});


var User = mongoose.model('User', UserSchema);

var admin = new User({username: "admin", email: "admin@admin.com", password: "password"});
var bob = new User({username: "bob", email: "bob@bob.com", password: "marley"});

admin.save();
bob.save();


app.get('/api/website/:name/create', function (req, res) {
    var website = new WebSiteModel({ name: req.params.name });
    website.save(function(err, doc) {
        res.json(doc);
    });

});

app.get('/api/website/:id', function (req, res) {
    WebSiteModel.findById(req.params.id, function (err, site) {
        res.json(site);
    });
});

app.get('/api/website', function (req, res) {
    WebSiteModel.find(function (err, sites) {
        res.json(sites);
    });
});

app.get('/api/users/:name/create', function (req, res) {
    var user = new UserModel({ name: req.params.name });
    user.save(function(err, doc) {
        res.json(doc);
    });

});

app.get('/api/users/:id', function (req, res) {
    UserModel.findById(req.params.id, function (err, site) {
        res.json(site);
    });
});

app.get('/api/users', function (req, res) {
    UserModel.find(function (err, sites) {
        res.json(sites);
    });
});

app.get('/process', function (req, res) {
    res.json(process.env);
});

// passport.use(new LocalStrategy(
// function(username, password, done)
// {
//     if(username == 'admin' && password == 'alice')//different than in class
//         //29 minutes into PassportJS video
//     {
//         var user = { firstName: 'Alice', lastName: 'Wonderland' };
//         console.log("USER:" + user);
//         return done(null, user);
//     }
//     console.log("Unable to login");
//     return done(null, false, {message: 'Unable to login'});
// }));

passport.use(new LocalStrategy(
function(username, password, done)
{
    console.log("username: " + username + " password: " + password);
    if(username == password)//different than in class
        //29 minutes into PassportJS video
        console.log("Login success!");  
    {
        return done(null, {username: username, password: password});
    }
    console.log("Unable to login");
    return done(null, false, {message: 'Unable to login'});
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var auth = function(req, res, next)
{
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

app.get('/users', auth, function(req, res)
{
    res.json([{username: 123},{username: 234}]);
});

app.get('/loggedin', function(req, res)
{
    res.send(req.isAuthenticated() ? req.user : '0');
});
    
app.post('/login', passport.authenticate('local'), function(req, res)
{
    console.log("/login");
    console.log(req.body);
    res.send(req.user);
});

app.post('/register', passport.authenticate('local'), function(req, res)
{
    console.log("/register");
    console.log(req.body);
    res.send(req.user);
});

app.post('/logout', function(req, res)
{
    req.logOut();
    res.send(200);
});

var ip   = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var connection_string = process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://localhost/test";
mongoose.connect(connection_string);

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(port, ip);
