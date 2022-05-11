const models = require('../models/models');

module.exports = {
    getSalas: async (req, res) => {
      try {
        const salas = await models.getSalas(); 
 
        return res.json(salas);
      } catch (err) {
        return res.json({ error: err });
      }
    }
}
  