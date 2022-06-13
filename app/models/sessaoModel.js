const database = require('./database');

const selectGlobal = `sessao.id as sessao_id, filme.id as filme_id, sala.id as sala_id, sessao.horario, sala.filas, sala.colunas, sala.numero, filme.titulo, filme.poster, filme.widescreen, filme.idade_min, filme.genero, filme.status, filme.descricao`

module.exports = {
    getSessao: async (queryComposer='') => {
        return new Promise((resolve, reject) => {
            const query = `SELECT ${selectGlobal} FROM sessao JOIN sala ON sessao.sala_id=sala.id JOIN filme ON sessao.filme_id=filme.id ${queryComposer};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getSessaoId: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT ${selectGlobal} FROM sessao JOIN sala ON sessao.sala_id=sala.id JOIN filme ON sessao.filme_id=filme.id WHERE sessao.id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getSessaoCont: async (queryComposer) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(*) FROM sessao ${queryComposer}`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
 
    getSessaoPag: async (limit, offset, queryComposer) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT ${selectGlobal} FROM sessao JOIN sala ON sessao.sala_id=sala.id JOIN filme ON sessao.filme_id=filme.id ${queryComposer} ORDER BY UNIX_TIMESTAMP(horario) LIMIT ${offset}, ${limit};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getCatalogo: async (hoje, proxSemana) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT ${selectGlobal} FROM sessao JOIN sala ON sessao.sala_id=sala.id JOIN filme ON sessao.filme_id=filme.id WHERE horario>="${hoje}" AND horario<="${proxSemana}";`
    
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

    getSalaDeSessao: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT sala_id FROM sessao WHERE id=${id}`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },    
}