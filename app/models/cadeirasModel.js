const database = require('./database');

module.exports = {
    getCadeirasSessao: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM cadeira WHERE sessao_id=${id};`
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    createCadeiras: async (cadeira) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO cadeira (sessao_id, status, coluna, fila, numero) values (${cadeira.sessao_id}, ${cadeira.status}, ${cadeira.coluna}, ${cadeira.fila}, ${cadeira.numero} );`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    createAllCadeiras: async (allCadeiras) => {
        return new Promise((resolve, reject) => {
            const queryBuilder = `
                INSERT INTO cadeira (sessao_id, status, coluna, fila, numero) values 
            `;

            const cadeirasValues = allCadeiras.map((cadeira) =>
                `(${cadeira.sessao_id},${cadeira.status},${cadeira.coluna},${cadeira.fila}, ${cadeira.numero})`
            ).join(',\n');

            const query = queryBuilder + cadeirasValues;

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
}