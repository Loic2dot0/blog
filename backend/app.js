const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const postRoutes = require('./routes/post');
const postCategoryRoutes = require('./routes/postCategory');
const postCommentRoutes = require('./routes/postComment');
const postReactionRoutes = require('./routes/postReaction');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/post', postRoutes);
app.use('/postcategory', postCategoryRoutes);
app.use('/postcomment', postCommentRoutes);
app.use('/postreaction', postReactionRoutes);

module.exports = app;