const bcrypt = require('bcryptjs')

module.exports = {
    hashPass: pass => {
        return bcrypt.hashSync(pass, 10)
        
    },
    compareHash: (pass, hash) => {
        return bcrypt.compareSync(pass, hash)
    }
}