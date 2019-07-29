const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

router.route('/').post((req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    User.findOne({ username })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
                    
                    const { _id, username } = user;

                    jwt.sign(
                        { id: _id },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 }, 
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                _id,
                                username
                            });
                        });
                })
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;