var uuid = require('node-uuid');

module.exports = {
  attributes : {
   id : {
     type : 'string',
     autoIncrement : true,
     required : true,
      primaryKey : true,
      defaultsTo : function () {
        return uuid.v4();
      },
    },
    firstName: {
      type : 'string',
      required : true,
    },
    lastName : {
      type : 'string',
      required: true,
    },
    picture: {
      type: 'string',
    },
    phone : {
      type : 'integer',
      required : true,
    },
    toJSON: function () {
      var obj = this.toObject();
      return obj;
    },
    state : {
     type : 'boolean',
      defaultsTo : false,
    },
    adminState : {
     type : 'string',
      enum : ['pending','approved','denied'],
      defaultsTo:'pending',
    }
  },
  autoPK : false,

  beforeCreate: function (profile, cb) {
    if (profile.phone) {
      profile.phone=profile.phone;
      cb();
    }else{
      cb();
    }
  },
};
