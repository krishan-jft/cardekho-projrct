module.exports = {
  attributes : {
    authority : {
      type : 'string',
      required : true,
      unique : true,
    },
    users : {
      collection : 'user',
      via : 'roles',
    },
    state : {
      type: 'boolean',
      defaultsTo : false,
    },
  },
};
