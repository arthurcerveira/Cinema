const database = require('./database');

module.exports = {
    getCompras: async (compra='') => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM compra ${compra};`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getComprasId: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM compra WHERE id=${id};`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getComprasByCliente: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM compra WHERE cliente_id=${id};`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getComprasCont: async (compra='') => {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(*) FROM compra ${compra};`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getComprasPag: async (limit, offset, compra='') => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM compra ${compra} LIMIT ${offset}, ${limit};`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    createCompras: async (compra) => {
        return new Promise((resolve, reject) => {
            var query = `INSERT INTO compra (cliente_id, valor, pontos_retorno, forma_pagamento, pontos_custo) values ('${compra.cliente_id}', '${compra.valor}', '${compra.pontos_retorno}', '${compra.forma_pagamento}', '${compra.pontos_custo}');`    

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
            
        });
    },

    updateCompras: async (compra, id) => {
        return new Promise((resolve, reject) => {
            var query = `UPDATE compra SET cliente_id='${compra.cliente_id}', valor='${compra.valor}', pontos_retorno='${compra.pontos_retorno}', pagamento_pendente='${compra.pagamento_pendente}', forma_pagamento='${compra.forma_pagamento}', pontos_custo='${compra.pontos_custo}' WHERE id=${id};`    

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
            
        });
    },

    deleteCompras: async (id) => {
        return new Promise((resolve, reject) => {
            var query = `DELETE FROM compra WHERE id=${id};`    

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
            
        });
    },
}