const database = require('./database');

module.exports = {
    getSala: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM sala;`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getSalaId: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM sala WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    createSala: async (sala) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO sala (filas,colunas,numero) values (${sala.filas}, ${sala.colunas}, ${sala.numero});`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    updateSala: async (id, sala) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE sala SET filas=${sala.filas}, colunas=${sala.colunas}, numero=${sala.numero} WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    deleteSala: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM sala WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
}