const models = require('../models/adminModel');
const dashboard = require('../models/dashboardModel');
const datetime = require('../helpers/datetime');
const { createToken } = require('../helpers/jwt-token')
const { hashPass, compareHash } = require('../helpers/bcrypt')

module.exports = {
    login: async (req, res) => {
        try {
            const { usuario, senha } = req.body

            const adm = await models.getUser(usuario)

            if (!adm[0]) return res.status(403).json({ 'error': 'Usuario ou senha incorretos' })

            if (compareHash(senha, adm[0].senha)) {
                const token = createToken({ 'id': adm[0].id, 'admin': true })
                return res.json({ 'token': token })

            } else {
                return res.status(403).json({ 'error': 'Usuario ou senha incorretos' })
            }

        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },
    getAll: async (req, res) => {
        try {
            const admin = await models.getAll()
            return res.json(admin);
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },

    getHistoricoId: async (req, res) => {
        //pega o histórico pela id do admin
        try {
            if (!req.query.limit && !req.query.offset)
                return res.json(await models.getHistorico(req.params.id))
            else
                return res.json({
                    data: await models.getHistoricoPag(req.params.id, req.query.limit, req.query.offset),
                    limit: parseInt(req.query.limit),
                    total: (await models.getHistoricoCont(req.params.id))[0]["COUNT(*)"]
                })
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },
    addAdmin: async (req, res) => { //procced with caution
        try {
            const { usuario, senha } = req.body
            const hash = hashPass(senha)

            const admin = await models.createAdmin(usuario, hash)
            return res.json({ 'status': 'success' });
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    },
    getDashboard: async (req, res) => {
        try {
            // Numero de filmes
            const filmesCont = await dashboard.getFilmeCont();

            // Filmes por status
            const filmesPorStatus = await dashboard.getFilmePorStatus();
            let filmesPorStatusJson = {};
            filmesPorStatus.map(row => {
                filmesPorStatusJson[row.status] = row["COUNT(id)"];
            })

            // Filmes com mais cadeiras ocupadas
            const valorIngreso = 10;
            const filmesMaiorBilheteria = await dashboard.getFilmeMaiorBilheteria(valorIngreso);

            const responseFilmes = {
                contagem: filmesCont[0]["COUNT(id)"],
                contagemPorStatus: filmesPorStatusJson,
                filmesMaiorBilheteria: filmesMaiorBilheteria
            };

            // Sessões
            const hojeFormatado = datetime.getHoje()
            const nextWeekFormatado = datetime.getNextWeek()

            const sessoesCatalogo = await dashboard.getSessoesCatalogo(
                hojeFormatado,
                nextWeekFormatado
            );

            const totalSessoes = await dashboard.getTotalSessoes();
            const sessoesRealizadas = totalSessoes[0]["COUNT(id)"] - sessoesCatalogo[0]["COUNT(sessao.id)"];

            const sessoesCatalogoPorDia = await dashboard.getSessoesCatalogoPorDia(
                hojeFormatado,
                nextWeekFormatado
            );

            let sessoesCatalogoPorDiaJson = {};
            sessoesCatalogoPorDia.map(row => {
                // Preenche com zero os dias e meses para formatação
                const dia = row.Dia.toString().padStart(2, '0');
                const mes = row.Mes.toString().padStart(2, '0');

                sessoesCatalogoPorDiaJson[
                    `${dia}/${mes}`
                ] = row["COUNT(sessao.id)"];
            })

            const responseSessoes = {
                emCatalogo: sessoesCatalogo[0]["COUNT(sessao.id)"],
                sessoesRealizadas: sessoesRealizadas,
                sessoesCatalogoPorDia: sessoesCatalogoPorDiaJson
            }

            // Clientes
            const clientesCont = await dashboard.getClientesCont();
            const top3CLientesPontos = await dashboard.getTop3ClientesPontos();
            const valorArrecadado = await dashboard.getValorArrecadado();

            const responseClientes = {
                contagem: clientesCont[0]["COUNT(*)"],
                top3CLientesPontos: top3CLientesPontos,
                valorArrecadado: valorArrecadado[0]["SUM(valor)"]
            }

            return res.json({
                "filmes": responseFilmes,
                "sessoes": responseSessoes,
                "clientes": responseClientes,
            });
        } catch (err) {
            return res.json({ error: err.toString() });
        }
    }
}
