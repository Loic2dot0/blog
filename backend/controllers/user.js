const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const fs = require('fs');
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
                return res.status(404).json({error: 'User not found!'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid =>{
                    if(!valid){
                        return res.status(401).json({error: 'Incorrect password!'});
                    }
                    res.status(200).json({
                        userId: user.id_user,
                        token: jwt.sign({ userId: user.id_user }, process.env.JWT_KEY, { expiresIn: '24h' })
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.getUser = (req, res, next) => {
    User.findOne({
            where: {
                id_user: req.headers.userid
            }
        })
        .then(user => {
            if (user == null) {
                return res.status(404).json({error: 'User not found!'});
            }
            res.status(200).json({
                name: user.name,
                avatar: user.avatar
            });
        })
        .catch(error => res.status(500).json({error: error}));
};

exports.updateUser = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            id_user: req.headers.userid
        }
    });

    if (!user) return res.status(404).json({error: 'User not found!'});

    if(req.file) {
        if(user.avatar){
            const filepath = user.avatar.split('/upload/')[1];
            fs.unlink(`upload/${filepath}`, (err) => {
                if (err) throw err;
            });
        }
        user.avatar = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;
    }
    user.name = req.body.name;
            
    user.save()
        .then(() => {
            res.status(200).json({message: 'User updated!'});
        })
        .catch(error => res.status(500).json({error: error}));
};