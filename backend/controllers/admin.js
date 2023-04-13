const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const User = require('../models/User');
const Admin = require('../models/Admin');

exports.loginAdmin = async (req, res, next) => {
    const key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
    const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);
    
    let user;
    try {
        user = await User.findOne({
            where: {
                email: CryptoJS.AES.encrypt(req.body.email, key, {iv: iv}).toString()
            }
        });
        if(!user) return res.status(404).json({error: 'User not found!'});
    } catch (error) {
        return res.status(500).json({error : error});
    }
    
    try {
        const admin = await Admin.findOne({
            where: {
                id_user: user.id_user
            }
        });
        if(!admin) return res.status(403).json({error: 'User is not an admin!'});        
    } catch (error) {
        return res.status(500).json({error: error});
    }    

    bcrypt.compare(req.body.password, user.password)
        .then(valid =>{
            if(!valid) return res.status(401).json({error: 'Incorrect password!'});

            res.status(200).json({
                userId: user.id_user,
                token: jwt.sign({ userId: user.id_user }, process.env.JWT_KEY, { expiresIn: '24h' })
            });
        })
        .catch(error => res.status(500).json({error}));
};