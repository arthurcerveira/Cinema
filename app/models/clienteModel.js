const database = require('./database');

module.exports = {
    getCliente: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT cliente.id, 
                                  cliente.nome,
                                  cliente.email,
                                  cliente.pontos,
                                  cliente.data_criacao
                                FROM cliente;`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    getClienteCont: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(*) FROM cliente`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    getClientePag: async (limit, offset) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT cliente.id, 
                cliente.nome,
                cliente.email,
                cliente.pontos,
                cliente.data_criacao 
                FROM cliente ORDER BY UNIX_TIMESTAMP(data_criacao) DESC LIMIT ${offset}, ${limit};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    getClienteId: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT cliente.id, 
                cliente.nome,
                cliente.email,
                cliente.pontos,
                cliente.data_criacao
                FROM cliente WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },


    getClienteEmail: async (email) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM cliente WHERE email='${email}';`
    
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


    updateCliente: async (id, cliente) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE cliente SET nome="${cliente.nome}", email="${cliente.email}", pontos=${cliente.pontos} WHERE id=${id};`
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

    updatePontosCliente: async(id, pontos) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE cliente SET pontos=${pontos} WHERE id=${id};`
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    }
}
