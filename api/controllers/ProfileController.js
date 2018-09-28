/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createProfile : async function () {
	  if(req.method === 'POST'){
	    let inputs = req.body;
	    let profileId = await User.findOne({profileId : inputs.profileId});
	    if(profileId){
	      try {
          let profile = await Profile.create({});
        }catch (e) {
          return res.send(e);
        }
      }
    }
  },
};

