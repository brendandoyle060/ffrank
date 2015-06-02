var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
var db = process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://localhost/test";
var util = require('util');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    favorites: [String],
    qbs: [String],
    rbs: [String],
    wrs: [String],
    tes: [String],
    defs: [String],
    ks: [String]
}, {collection: "usermodels"});

var UserModel = mongoose.model('UserModel', UserSchema);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(cookieParser());
app.use(session({ secret: 'this is the secret' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));


passport.use(new LocalStrategy(
function(username, password, done)
{
    UserModel.findOne({username: username, password: password}, function(err, user)
    {
        if (err) { 
            return done(err); 
        }
        if (!user) { 
            return done(null, false); 
        }
        return done(null, user);
    })
}));

passport.serializeUser(function(user, done) {
    // console.log("serialized user: " + util.inspect(user, {showHidden: false, depth: null}));
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    // console.log("deserialized user: " + util.inspect(user, {showHidden: false, depth: null}));
    done(null, user);
});

app.post("/login", passport.authenticate('local'), function(req, res){
    console.log("/LOGIN");
    var user = req.user;
    // console.log("SERVER /login: " + user);
    res.json(user);
});

app.get('/loggedin', function(req, res)
{
    console.log("/LOGGEDIN");
    // console.log("res: " + util.inspect(res, {showHidden: false, depth: null}));
    console.log("req.isAuthenticated(): " + req.isAuthenticated());
    console.log("req.user: " + req.user);
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.get('/username', function(req, res)
{
    console.log("SERVER /username");
    // console.log("req: " + req);
    res.send(req.isAuthenticated() ? req.user : '0');
});
    
app.post('/logout', function(req, res)
{
    req.logOut();
    res.send(200);
});     

app.post('/register', function(req, res)
{
    var newUser = req.body;
    UserModel.findOne({username: newUser.username}, function(err, user)
    {
        if(err) { 
            return next(err); 
        }
        if(user)
        {
            res.json(null);
            return;
        }
        var newUser = new UserModel(req.body);
        newUser.save(function(err, user)
        {
            req.login(user, function(err)
            {
                if(err) { return next(err); }
                res.json(user);
            });
        });
    });
});


var auth = function(req, res, next)
{
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

// app.get("/rest/user", auth, function(req, res)
// {
//     UserModel.find(function(err, users)
//     {
//         res.json(users);
//     });
// });

app.get("/usermodels", auth, function(req, res)
{
    UserModel.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.put("/usermodels/:username", auth, function(req, res)
{
    var uName = req.params.username;
    var newUser = req.body;
    // console.log("req.user: " + util.inspect(req.user, {showHidden: false, depth: null}));
    console.log("SERVER USERMODELS/USERNAME user: " + uName)

    console.log("SERVER /usermodels/:username");
    console.log("newUser.qbs: " + newUser.qbs);
    UserModel.update({username: uName}, {$set : {qbs: newUser.qbs,
                                                rbs: newUser.rbs,
                                                wrs: newUser.wrs,
                                                tes: newUser.tes,
                                                defs: newUser.defs,
                                                ks: newUser.ks}},
                                                function(err, doc) {

        console.log(doc);
        res.json(doc);
    });


});

app.get("/usermodels/:username", auth, function (req, res) {
    console.log("SERVER get username: " + req.params.username);
    console.log("req.body: " + util.inspect(req.body, {showHidden: false, depth: null}));
    UserModel.findOne({username: req.params.username}, function (err, user) {
        if (err) {
            console.log("err: " + err)
            return next(err);
        }

        if (user) {
            console.log("if user: " + user);
            res.json(user);
        } else {
            res.send(null);
        }
    });
});

// var getUser = function(uname) {
//     app.get("/usermodels/:" + uname, auth, function(req, res) {
//         UserModel.find({username: req.params.uname}, function(err, doc) {
//             console.log(res.json(doc));
//             return res.json(doc);
//         });
//     });
// };

// app.delete("/rest/user/:id", auth, function(req, res){
//     UserModel.findById(req.params.id, function(err, user){
//         user.remove(function(err, count){
//             UserModel.find(function(err, users){
//                 res.json(users);
//             });
//         });
//     });
// });


var ip   = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

mongoose.connect(db);


app.listen(port, ip);
