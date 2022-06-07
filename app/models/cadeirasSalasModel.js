//Create model for cadeirasSala
const database = require('./database');

module.exports = {
    getCadeirasSalas: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM cadeiras_sala WHERE sala_id=${id};`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    updateCadeirasSalas: async (id, cadeirasSala) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE cadeiras_sala SET status=${cadeirasSala.status}  WHERE id=${id};`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    createCadeirasSalas: async (cadeirasSala) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO cadeiras_sala (sala_id,status, coluna, fila) values (${cadeirasSala.sala_id}, ${cadeirasSala.status}, ${cadeirasSala.coluna}, ${cadeirasSala.fila} );`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    createAllCadeirasSalas: async (allCadeirasSalas) => {
        return new Promise((resolve, reject) => {
            const queryBuilder = `
                INSERT INTO cadeiras_sala (sala_id,status, coluna, fila) values 
            `;

            const cadeirasValues = allCadeirasSalas.map((cadeirasSala) =>
                `(${cadeirasSala.sala_id},${cadeirasSala.status},${cadeirasSala.coluna},${cadeirasSala.fila})`
            ).join(',\n');

            const query = queryBuilder + cadeirasValues;

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    deleteCadeirasSalas: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM cadeiras_sala WHERE id=${id};`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

}