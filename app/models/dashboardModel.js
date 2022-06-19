const database = require('./database');

module.exports = {
    // Dashboard de filmes 
    // Nº de filmes
    getFilmeCont: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(id) FROM filme;`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    // Filmes por status
    getFilmePorStatus: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT status, COUNT(id) 
                           FROM filme GROUP BY status;`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    getFilmeMaiorBilheteria: async (valorIngresso) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                  filme.titulo Filme, 
                  count(cadeira.id) * ${valorIngresso} Bilheteria 
                FROM sessao
                JOIN filme ON filme.id = sessao.filme_id
                JOIN cadeira ON cadeira.sessao_id = sessao.id
                WHERE cadeira.status = 2
                GROUP BY filme.titulo;`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    // Dashboard de sessões
    // Nº de sessões da próxima semana
    getSessoesCatalogo: async (hoje, proxSemana) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT COUNT(sessao.id) FROM sessao 
                WHERE horario>="${hoje}" 
                AND horario<="${proxSemana}";
            `

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    // Nº de sessões por dia da próxima semana
    getSessoesCatalogoPorDia: async (hoje, proxSemana) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT DAY(horario) Dia, 
                       MONTH(horario) Mes,
                       COUNT(sessao.id) FROM sessao
                WHERE horario>="${hoje}" 
                AND horario<="${proxSemana}"
                GROUP BY MONTH(horario), DAY(horario)
                ORDER BY MONTH(horario), DAY(horario);`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    getTotalSessoes: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(id) FROM sessao`;

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    // Dashboard de clientes
    getClientesCont: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(*) FROM cliente;`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    // TOP 3 clientes com mais pontos
    getTop3ClientesPontos: async () => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT nome, pontos
                FROM cliente
                ORDER BY pontos DESC
                LIMIT 3;`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
    getValorArrecadado: async () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT SUM(valor) FROM compra;`

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

}