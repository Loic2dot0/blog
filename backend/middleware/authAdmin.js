const Admin = require('../models/Admin');

module.exports = (req, res, next) => {
    Admin.findOne({
            where: {
                id_user: req.headers.userid
            }
        })
        .then(admin => {
            if(!admin) return res.status(403).json({error: 'User is not an admin!'});
            next();
        })
        .catch(error => res.status(500).json({error: error}));
};