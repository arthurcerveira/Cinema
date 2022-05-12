const database = require('./database');

module.exports = {
    getSessao: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM sessao JOIN sala ON sessao.sala_id=sala.id JOIN filme ON sessao.filme_id=filme.id;`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getSessaoId: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM sessao JOIN sala ON sessao.sala_id=sala.id JOIN filme ON sessao.filme_id=filme.id WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getCatalogo: async (hoje, proxSemana) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM sessao JOIN sala ON sessao.sala_id=sala.id JOIN filme ON sessao.filme_id=filme.id WHERE horario>="${hoje}" AND horario<="${proxSemana}";`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    createSessao: async (sessao) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO sessao (sala_id, filme_id, horario) values (${sessao.sala_id}, ${sessao.filme_id}, "${sessao.horario}");`    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    updateSessao: async (id, sessao) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE sessao SET sala_id=${sessao.sala_id}, filme_id=${sessao.filme_id}, horario="${sessao.horario}" WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    deleteSessao: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM sessao WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
}