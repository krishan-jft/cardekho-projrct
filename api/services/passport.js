var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  GoogleStrategy = require( 'passport-google-oauth2' ).Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  bcrypt = require('bcrypt');


async function findById(id, fn) {
  var id = await User.findOne(id);
  if(id){
    return fn(null ,id);
  }

}



async function findByUsername(u, fn) {
  console.log("findByUsername  :  ",u);
  try {
    var user = await User.findOne({email: u});

    if(user){
      console.log('inside email = found : ',user.email);
      return fn(null , user);
    }else{
      return fn(null , false);
    }
  }
  catch (e) {
    console.log(e);
  }

}



passport.serializeUser(function (user, done) {
  done(null, user.id);
  console.log('user id for session : ', user.id);
});

passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    process.nextTick(function () {
      findByUsername(username, function (err, user) {
        if (err)
          return done(null, err);

        bcrypt.compare(password, user.password, function (err, res) {
          if (!res)
            return done(null, false, {
              message: 'Invalid Password'
            });

          return done(null, user, {
            message: 'Logged In Successfully'
          });
        });
      })
    });
  }
));

passport.use(new GoogleStrategy({
    clientID     : '953537275022-5u4dsmnjvoamklr4raus8p3icsd86dbh.apps.googleusercontent.com',
    clientSecret : 'q3beXFR8XGxMnrkw3IWgVBS8',
    callbackURL  : 'http://localhost:1337/googleCallback',
  },
   function (request, accessToken, refreshToken, profile, done) {
    console.log("hiiiii google");
    process.nextTick( function () {
      var userData = profile._json;
      console.log(userData);
      try {
        let user = await User.findOne({email : userData.emails[0].value});
        if(user){
          user.googleID = userData.id;
          user.save(function (err) {
            return err
          });
          return done(null, user);
        }
        else{
          let role = await User.findOne({authority : 'ROLE_USER'});
          let user = await User.create({
            email : userData.emails[0].value,
            googleID : userData.id,
            state : true,
            role : role.id,
          }).then(function (err , user) {
            if(err){
              return res.send(err);
            }
            return done(null ,user);

          });


        }
      }
      catch (e) {
        console.log(e);
      }

    });


  }));
