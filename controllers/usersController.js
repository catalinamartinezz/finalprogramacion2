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
    login: function(req, res) {
        return res.render('login');
    }
};
module.exports = usersController;