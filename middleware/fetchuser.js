const jwt = require('jsonwebtoken');
const secretKey = "goodeno@ughk$y";

const fetchuser = (req, res, next) => {
    const token = req.body.headers.authToken;
    if (!token) {
        return res.status(401).json("token not available");
    }
    
    try {
        let data = jwt.verify(token, secretKey);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json("invalid token");
    }
}

module.exports = fetchuser;