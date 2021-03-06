var bcrypt = require('bcrypt');
var uuid = require('node-uuid');

module.exports = {
  attributes : {
    id: {
      type: 'string',
      primaryKey: true,
      defaultsTo: function () {
        return uuid.v4();
      },
    },
    email: {
      type: 'email',
      unique: true,
      required: true,
    },
    password: {
      type: 'string',

    },
    ProfileId: {
      model: 'profile',
      //unique: true,
    },
    roles : {
      collection : 'role',
      via: 'users',
    },
    productdetails :{
      collection: 'productdetails',
      via : 'user',
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    },
    newPin :{
     type:'string',
    },
    state : {
      type : 'boolean',
      defaultsTo : false,
    },
    facebookID: {
      type: 'string'
    },
    googleID: {
      type: 'string'
    },
  },
    autoPK : false,

  beforeCreate: function (user, cb) {
    if (user.password) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            console.log(err);
            cb(err);
          } else {
            user.password = hash;
            console.log("saving data" + user.password);
            cb();
          }
        });
      });
    }else{
      cb();
    }
  }


};
