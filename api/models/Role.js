module.exports = {
  attributes : {
    authority : {
      type : 'string',
      required : true,
      unique : true,
    },
    user : {
      collection : 'user',
      via : 'role',
    },
    state : {
      type: 'string',
    },
  },
};
