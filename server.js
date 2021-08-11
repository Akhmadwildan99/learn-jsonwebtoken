require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json())

const posts = [
    {
        username: 'Nanu',
        title: 'training'
    },
    {
        username: 'Dan',
        title: 'training 2'
    },
]


app.get('/post', authenticatedToken, (req, res)=> {
    res.json(posts.filter(post => post.username === req.user.name))
});

function authenticatedToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(3000)