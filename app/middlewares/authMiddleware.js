const jwt = require('jsonwebtoken')
const env = require('dotenv')

env.config()

module.exports = {
    validateToken: (req, res, next) => {
        const token = req.headers['authorization']

        jwt.verify(token, process.env.SECRET, (err, user) =>{
           if (err){return res.status(403).json({'error':'Você não tem acesso a isto'})}
            req.user = user
            next()
        })
    },
    validateAdminToken: (req, res, next) => {
        const token = req.headers['authorization']

        jwt.verify(token, process.env.SECRET, (err, user) =>{
           if (err){return res.status(403).json({'error':'Você não tem acesso a isto'})}
           if (user.admin){
                req.user = user
                next()
           } else{
                return res.status(403).json({'error':'Você não tem acesso a isto'})
           }
            
        })
    }
}