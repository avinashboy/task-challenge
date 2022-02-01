const createError = require("http-errors");
const { isEmpty } = require("../helper");
const {SECRET_KEY} = require('../config');
const jwt = require('jsonwebtoken');

module.exports = {
    validatorData: (req,res,next)=>{
        for(const prop in req.body){
            if(isEmpty(req.body[prop])) return res.send(createError.BadRequest(`Don't leave ${prop}`))
        }
        next()
    },

    verifyToken: async (req,res,next) =>{
        const bearerHeader = req.headers.authorization;
        
        if (!bearerHeader) return res.send(createError.Unauthorized("Access denied."));
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        try {
            const verify = jwt.verify(token, SECRET_KEY);
            req.user = verify
            next();
          } catch (err) {
            return res.send(createError.BadRequest("Invalid token."));
          }
    }
};
