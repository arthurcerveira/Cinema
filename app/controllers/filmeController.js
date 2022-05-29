const models = require("../models/filmeModel");
const helper = require("../helpers/helper");

module.exports = {
  getFilme: async (req, res) => {
    try {
      //queryComposer: caso for feita uma busca por status/genero, todo o get será feito com base no status
      //caso não vier o status, não ocorre interferencia nas querries
      let queryComposer = ''
      if(req.query.status && req.query.genero) 
        queryComposer += `WHERE status=${req.query.status} AND genero="${req.query.genero}"`
      else if(req.query.status)
        queryComposer += `WHERE status=${req.query.status}`
      else if(req.query.genero)
        queryComposer += `WHERE genero="${req.query.genero}"`


      if (!req.query.limit && !req.query.offset)
        res.json(await models.getFilme(queryComposer))
      else
        res.json({
          data: await models.getFilmePag(req.query.limit, req.query.offset, queryComposer),
          limit: parseInt(req.query.limit),
          total: (await models.getFilmeCont(queryComposer))[0]["COUNT(*)"],
        })
    } catch (err) {
      return res.json({ error: err.toString() });
    }
  },

  getFilmeId: async (req, res) => {
    try {
      const retorno = await models.getFilmeId(req.params.id);

      return res.json(retorno[0]);
    } catch (err) {
      return res.json({ error: err.toString() });
    }
  },

  createFilme: async (req, res) => {
    try {
      const retorno = await models.createFilme(req.body);

      const adminid = req.user.id;
      if (!isNaN(adminid))
        await helper.createHistorico(adminid, "criar filme - id filme: "+retorno.insertId, req.body)

      return res.json({'status':'success'});
    } catch (err) {
      return res.json({ error: err.toString() });
    }
  },

  updateFilme: async (req, res) => {
    try {
      const retorno = await models.updateFilme(req.params.id, req.body);

      const adminid = req.user.id;
      if (!isNaN(adminid))
        await helper.createHistorico(adminid, "atualizar filme - id filme: "+req.params.id, req.body);

      return res.json({'status':'success'});
    } catch (err) {
      return res.json({ error: err.toString() });
    }
  },

  deleteFilme: async (req, res) => {
    try {
      const retorno = await models.getFilmeId(req.params.id)
      await models.deleteFilme(req.params.id)
      const adminid = req.user.id
      if (!isNaN(adminid))
        await helper.createHistorico(adminid, "deletar filme - id filme: "+req.params.id, retorno)

      return res.json({'status':'success'})
    } catch (err) {
      return res.json({ error: err.toString() })
    }
  },
};
