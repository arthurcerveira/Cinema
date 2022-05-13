const database = require('./database');

module.exports = {
    getCliente: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM cliente;`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getClienteId: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM cliente WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },


    createCliente: async (cliente) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO cliente (nome, email, senha) values ("${cliente.nome}", "${cliente.email}", "${cliente.senha}");`    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    updateCliente: async (id, sessao) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE cliente SET nome=${cliente.nome}, email=${cliente.email}, senha=${cliente.senha}, pontos=${cliente.pontos}, data_criacao="${cliente.data_criacao}" WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    deleteCliente: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM cliente WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
}