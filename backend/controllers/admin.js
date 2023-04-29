const Admin = require('../models/Admin');

// check if user is admin
exports.getUserIsAdmin = (req, res, next) => {
    Admin.findOne({
        where: {
            id_user: req.params.id_user
        }
    })
    .then(admin => {
        res.status(200).json({ isAdmin: admin ? true : false });
    })
    .catch(error => res.status(500).json({error}));
};