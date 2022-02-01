const jwt = require('jsonwebtoken');
const {MAIL_VERIFICATION_SECRET_KEY, JWT_VERIFICATION_SECRET_KEY,JWT_EXPIRES_IN} = require('../config')
const createError = require("http-errors");

const reducer = (previousValue, currentValue) => previousValue * currentValue;
const time = JWT_EXPIRES_IN.split("*").map(a => +a).reduce(reducer)


module.exports = {
    mailVerificationSecretKey: (id)=>{
        const token = jwt.sign({ id }, MAIL_VERIFICATION_SECRET_KEY, { algorithm: 'HS256', expiresIn: time})
        return token
    },

    loginVerificationSecretKey: ({username, uuid})=>{
        const token = jwt.sign({ username,uuid }, JWT_VERIFICATION_SECRET_KEY, { algorithm: 'HS256', expiresIn: time})
        return token
    },

    loginVerifyToken: (req, res, next)=>{
        const bearerHeader = req.headers.authorization;
        
        if (!bearerHeader) return res.send(createError.Unauthorized("Access denied."));
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        try {
            const verify = jwt.verify(token, JWT_VERIFICATION_SECRET_KEY);
            req.user = verify
            next();
          } catch (err) {
            return res.send(createError.BadRequest("Invalid token."));
          }
    },

    mailVerifyToken: (req,res,next)=>{
        const token = req.query.token;
        if (!token) return res.send(createError.Unauthorized("Access denied."));
        try {
            const verify = jwt.verify(token, MAIL_VERIFICATION_SECRET_KEY);
            req.user = verify
            next();
          } catch (err) {
            return res.send(createError.BadRequest("Token was expire."));
          }
    },
}