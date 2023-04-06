const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    const saltRounds = 10;
    const key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
    const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

    bcrypt.hash(req.body.password, saltRounds)
        .then(hash => {
            User.create({
                    email: CryptoJS.AES.encrypt(req.body.email, key, {iv: iv}).toString(),
                    password: hash,
                    name: req.body.name
                })
                .then(() => res.status(201).json({message: 'User created!'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    const key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
    const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);
    
    User.findOne({
            where: {
                email: CryptoJS.AES.encrypt(req.body.email, key, {iv: iv}).toString()
            }
        })
        .then(user => {
            if(user === null){
                return res.status(401).json({error: 'User not found!'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid =>{
                    if(!valid){
                        return res.status(401).json({error: 'Incorrect password!'});
                    }
                    res.json({
                        userId: user.id_user,
                        token: jwt.sign({ userId: user.id_user }, process.env.JWT_KEY, { expiresIn: '24h' })
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};