const database = require('./database');

module.exports = {
    //queryComposer ou é uma string vazia ("")
    //ou é uma string que contem "WHERE status=${status do filme}"
    //assim, não é necessário dobrar a quantia de queries do db

    getFilme: async (queryComposer='') => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM filme ${queryComposer};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    getFilmeCont: async (queryComposer='') => {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(*) FROM filme ${queryComposer}`
    
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

    getFilmePag: async (limit, offset, queryComposer='') => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM filme ${queryComposer} ORDER BY titulo LIMIT ${offset}, ${limit};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    createFilme: async (filme) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO filme (titulo, imagem, status, descricao, idade_min, genero) values ("${filme.titulo}", "${filme.imagem}", ${filme.status}, "${filme.descricao}", "${filme.idade_min}", "${filme.genero}");`    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    updateFilme: async (id, filme) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE filme SET titulo="${filme.titulo}", imagem="${filme.imagem}", descricao="${filme.descricao}", idade_min="${filme.idade_min}", genero="${filme.genero}", status=${filme.status} WHERE id=${id};`
    
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