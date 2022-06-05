const models = require('../models/adminModel');

module.exports = {
    createHistorico: async (admin, acao, alvo) => {
        const log = "" + acao + " " + JSON.stringify(alvo)
        return await models.createHistorico(admin, log.replace(`"`, `'`))
    }
}