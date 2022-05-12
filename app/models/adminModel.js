const database = require('./database');

module.exports = {
    getHistorico: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM historico WHERE admin_id=${id};`
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    createHistorico: async (id, log) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO historico (log, admin_id) values ("${log}", ${id});`    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    createAdmin: async (usuario, senha) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO admin (usuario, senha) values ("${usuario}", "${senha}");`    
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    getAll: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM admin`
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
}