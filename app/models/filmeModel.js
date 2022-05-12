const database = require('./database');

module.exports = {
    getFilme: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM filme;`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getFilmeId: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM filme WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    createFilme: async (filme) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO filme (titulo, imagem, descricao) values ("${filme.titulo}", "${filme.imagem}", "${filme.descricao}");`    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    updateFilme: async (id, filme) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE filme SET titulo="${filme.titulo}", imagem="${filme.imagem}", descricao="${filme.descricao}" WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    deleteFilme: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM filme WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
}