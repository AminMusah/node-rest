const jwt = require('jsonwebtoken');

function auth (req,res, next) {
    const token = req.header('auth-token');
    console.log(token)
    if(!token) {
        res.writeHead(400, { "Content-TYpe": "application/json" });
        return res.end("Access Denied");
    }

    try {
        const verified = jwt.verify(token, procss.env.TOKEN_SECRET);
        req.user = verified;
        // next()
    } catch (error) {
        res.writeHead(400, { "Content-TYpe": "application/json" });
        return res.end("Invalid Token");
    }
}

module.exports = auth;