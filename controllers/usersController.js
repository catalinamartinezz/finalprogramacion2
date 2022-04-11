const usersController = {
     profile: function(req, res) {
         return res.render('profile');
     },
     profileEdit: function(req, res) {
         return res.render('profileEdit');
     },
     register: function(req, res) {
        return res.render('register');
    },
};
module.exports = usersController;