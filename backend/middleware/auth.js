const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let token = req.header('authorization');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    
    if (!token.startsWith("Bearer ")) {
        return res.status(400).json({ msg: 'Authorization schema not supported' });
    }

    // Extract token from Bearer schema
    token = token.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Invalid token' });
        } else {
            req.user = decoded;
            next();
        }
    });
}

module.exports = auth;