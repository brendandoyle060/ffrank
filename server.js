var express = require('express');
var app     = express();

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
var multer     = require('multer'); 

var cookieParser = require('cookie-parser');
var session      = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var WebSiteSchema = new mongoose.Schema({
    name: String,
    created: {type: Date, default: Date.now}
}, {collection: 'website'});

var WebSiteModel = mongoose.model('WebSite', WebSiteSchema);



app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'this is the secret' }));
app.use(multer());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

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

passport.use(new LocalStrategy(
function(username, password, done)
{
    if(username == 'admin' && password == 'alice')
    {
        var user = { firstName: 'Alice', lastName: 'Wonderland' };
        return done(null, user);
    }
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
    res.send(req.user);
});

app.post('/logout', function(req, res)
{
    req.logOut();
    res.send(200);
});     

app.listen(3000);