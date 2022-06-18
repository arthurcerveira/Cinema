const database = require('./database');

module.exports = {
    getIngressoId: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ingresso WHERE id=${id};`
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    createIngresso: async (ingresso) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ingresso (sessao_id, cadeira_id, produto_id) values (${ingresso.sessao_id}, ${ingresso.cadeira_id}, ${ingresso.produto_id} );`
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

}