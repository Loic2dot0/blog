const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds)
        .then(hash => {
            User.create({
                    email: CryptoJS.AES.encrypt(req.body.email, process.env.CRYPTO_KEY).toString(),
                    password: hash,
                    name: req.body.name
                })
                .then(() => res.status(201).json({message: 'User created!'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};