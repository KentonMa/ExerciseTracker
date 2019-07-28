const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find().select('-password')
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));
});

router.route('/').post((req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ username })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'Username already exists' });

            const newUser = new User({
                username,
                password
            });

            // Salt and hash password
            bcrypt.genSalt((err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            const { _id, username, createdAt } = user;

                            jwt.sign(
                                { id: _id },
                                process.env.JWT_SECRET,
                                { expiresIn: 3600 }, 
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        _id,
                                        username,
                                        createdAt
                                    });
                                });
                        })
                        .catch(err => res.status(400).json(err));
                });
            });
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;