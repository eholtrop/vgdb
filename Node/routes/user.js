

module.exports = function(app, passport) {

    var bcrypt = require('bcrypt-nodejs');
    var Model = require("./../models/models");
    var debug = require('debug')('Node:server');

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local', { successRedirect: '/',
            failureRedirect: '/login'}, function(err, user, info) {
            if(err) {
                return res.render('login', {title: 'Sign In', errorMessage: err.message});
            }

            if(!user) {
                return res.render('login', {title: 'Sign In', errorMessage: info.message});
            }
            return req.logIn(user, function(err) {
                if(err) {
                    return res.render('login', {title: 'Sign In', errorMessage: err.message});
                } else {
                    return res.redirect('/');
                }
            });
        })(req, res, next);
    });

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', function(req, res, next) {
        debug('user signup started');
        var user = req.body;
        var usernamePromise = null;
        usernamePromise = new Model.User({username: user.email}).fetch();

        console.log(user.email);

        return usernamePromise.then(function(model){
            if(model) {
                debug('user already exists');
                res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
            } else {
                //TODO: password verification... min length, one number one letter
                var password = user.password;
                var hash = bcrypt.hashSync(password);

                var signUpUser = new Model.User({username: user.email, password: hash});

                debug('user create attempt: ' + hash);
                signUpUser.save().then(function(model) {
                    debug('user signup finished successfully');
                   res.redirect('/login');
                });
            }
        })
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


};
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

