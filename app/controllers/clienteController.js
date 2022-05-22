const models = require('../models/clienteModel')
const { hashPass, compareHash } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt-token')

module.exports = {
    getCliente: async (req, res) => {
        try {
            
            let retorno

            if(!req.query.limit && !req.query.offset)
                retorno = await models.getCliente()
            else{
                retorno = {
                    data: await models.getClientePag(req.query.limit, req.query.offset),
                    limit: parseInt(req.query.limit),
                    total: (await models.getClienteCont())[0]['COUNT(*)']
                }            
            }
            return res.json(retorno)
        } catch (err) {
            return res.json({ error: err.toString() })

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
                'nome': req.body.nome,
                'email': req.body.email,
                'senha': teste
            }

            await models.createCliente(aux) 
            
            
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
            const token = createToken({'id': user[0].id, 'admin': false})
            return res.json({'token': token})

        } else{
            return res.status(403).json({'error': 'Email ou senha incorretos'})
        }
        

    },

    
    updateCliente: async (req, res) => {
        try {
            const data = req.body
            const retorno = await models.updateCliente(req.params.id, data) 

            return res.json(retorno)
        } catch (err) {
            return res.json({ error: err })
        }
    },

    deleteCliente: async (req, res) => {
        try {
            const retorno = await models.deleteCliente(req.params.id) 
    
            return res.json(retorno)
        } catch (err) {
            return res.json({ error: err })
        }
    },
}
