const jwt = require('jsonwebtoken')

const env = require('dotenv')

env.config()

module.exports = {

    createToken: ( params = {}) => {
        return jwt.sign(params, process.env.SECRET, { 
            expiresIn: 30000 // 5min 
        })
    },
    
}
