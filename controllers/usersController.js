const usersController = {
     profile: function(req, res) {
         return res.render('profile');
     },
     profileEdit: function(req, res) {
         return res.render('profileEdit');
     }
};
module.exports = usersController;