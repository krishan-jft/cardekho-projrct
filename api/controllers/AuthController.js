var passport = require('passport');

module.exports = {

  CreateUser :async function ( req ,res){
    console.log('CreateUser');
    if(req.method === 'POST'){
      let user = await User.find({email : req.param("email")});
      if(user.length == 0){
        console.log('user is not Present in User Table');
        try {
          let role = await Role.findOne({authority : 'ROLE_USER'});
          console.log(role);
          let user =  await User.create({email : req.param('email'), password : req.param('password'), roles : role.id});
          return res.redirect('/Dashboard');
        }catch (err) {
          console.log("error : ", err);
          return res.send(err);
        }
      } else {
        var alreayExist;
        if (user[0].email.toUpperCase() == req.param('email').toUpperCase()) {
          alreayExist = 'email';
          console.log(alreayExist);
        }
        var errorMessage = {
          status: false,
          message: 'User already exist with this ' + alreayExist + '. Please try to login'
        };
        res.send(errorMessage);

        //return res.send('User Aleard Exists...');
      }

    }else{

    }
  },


  process: function(req, res){
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.send({
          message: 'login failed'
        });
        // res.send(err);
      }
      req.logIn(user, function(err) {
        req.session.userId = user.id;
        req.session.email = user.email;
        //console.log(req.session.email);
         //console.log(req.session.userId);

        if (err) res.send(err);
      /*  return res.send({
          message: 'login successful'
        });*/
      return res.redirect('/createProfile-page');
      });
    })(req, res);
  },

  google: async function (req, res,next) {
    console.log("----------Google Function");
   passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.profile.emails.read', 'https://www.googleapis.com/auth/userinfo.profile']})(req, res,next);

  },

  googleCallback: function (req, res) {
    console.log("----------Callback");
   passport.authenticate('google', {failureRedirect: 'Index', successRedirect: 'homepage'})(req, res)
  },

  facebook: function (req, res,next) {
    passport.authenticate('facebook', {scope: ['email', 'public_profile']})(req, res,next);

  },

  facebookCallback: function (req, res) {
    passport.authenticate('facebook', {failureRedirect: 'home', successRedirect: 'home'})(req, res)
  },


  
  facebook: function(req, res) {
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
  },



};
