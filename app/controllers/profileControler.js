const cliente = require('../models/clienteModel')

profile = (userData) => {
    return {
        id: userData.id,
        nome: userData.nome,
        email: userData.email,
        pontos: userData.pontos
    }
}

module.exports = {
    getProfile: async (req, res) => {
        try {
            let userData
            if (!req.user.admin) {
                userData = await cliente.getClienteId(req.user.id)
                return res.json(profile(userData[0]))
            }
            userData = await cliente.getClienteId(req.params.id)
            return res.json(profile(userData[0]))

        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },
}
