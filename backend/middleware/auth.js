const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.userId;
        if (req.headers.userid && req.headers.userid !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch (error){
        res.status(401).json({error: error.message || error || 'Invalid request!'});
    }
};