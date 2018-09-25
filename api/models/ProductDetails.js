var uuid = require('uuid');
module.exports = {
  attributes : {
    id : {
      primaryKey : true,
      autoIncrement : true,
      required : true,
      defaultsTo : uuid.v4(),
    },
    productModelName : {
      type :"string",
      required : true,
    },
    productName : {
      type : 'string',
      required: true,
    },
    productBrand : {
      type: 'string',
      required : 'type',
    },
    /*productionYear : {
      type : 'date',
      required : true,
    },*/
    owner : {
      type : 'string',
    },
    kmDriven : {
      type : 'integer',
      required : true,
    },
    registrationYear : {
      type : 'date',
      required : true,
    },
    productColor : {
      type : 'string',
    },
    user : {
      model : 'user',
    },

  }
};
