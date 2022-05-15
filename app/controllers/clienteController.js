const models = require('../models/clienteModel')
const { hashPass, compareHash } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt-token')

module.exports = {

    getClientes: async (req, res) => {
        try {
            const Clientes = await models.getCliente()
    
            return res.json(Clientes)
        } catch (err) {
            return res.json({ error: err })
        }
    },

    getClienteId: async (req, res) => {
        try {
            const retorno = await models.getClienteId(req.params.id)
    
            return res.json(retorno)
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },

    createCliente: async (req, res) => {
        try {
            const teste = hashPass(req.body.senha)
            const aux = {
                'name': req.body.name,
                'email': req.body.email,
                'senha': teste
            }

            await models.createCliente(aux); 
            
            
            return res.json({'status':'success'})
        } catch (err) {
            return res.json({ error: err.toString() })
        }
    },

    login: async (req, res) => {
        const { email, senha } = req.body

        //Por algum motivo o retorno do nome ta dando undentified

        const user = await models.getClienteEmail(email)

        if(!user[0]) return res.status(403).json({'error': 'Email ou senha incorretos'})

        if(compareHash(senha, user[0].senha)){
            const token = createToken({'id': user[0].id})
            return res.json({'token': token})

        } else{
            return res.status(403).json({'error': 'Email ou senha incorretos'})
        }
        

    },

}
