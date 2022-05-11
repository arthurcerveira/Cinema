const database = require('./database');

module.exports = {
    getSalas: async () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM sala;"
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    }
}