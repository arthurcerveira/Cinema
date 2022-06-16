const res = require('express/lib/response');
const database = require('./database');

module.exports = {
    getProduto: async (queryComposer) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM produto ${queryComposer};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getProdutoId: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM produto WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    getProdutoCont: async (queryComposer) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(*) FROM produto ${queryComposer};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
 
    getProdutoPag: async (limit, offset, queryComposer) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM produto ${queryComposer} LIMIT ${offset}, ${limit};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },


    createProduto: async (produto) => {
        return new Promise((resolve, reject) => {
            var query = `INSERT INTO produto (nome, imagem, valor, pontos_retorno, descricao, estoque, is_ingresso, pontos_custo) values ("${produto.nome}", "${produto.imagem}", ${produto.valor}, ${produto.pontos_retorno}, "${produto.descricao}", ${produto.estoque}, ${produto.is_ingresso}, ${produto.pontos_custo});`    

            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
            
        });
    },

    updateProduto: async (id, produto) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE produto SET nome="${produto.nome}", imagem="${produto.imagem}", valor=${produto.valor}, pontos_retorno=${produto.pontos_retorno}, descricao="${produto.descricao}", estoque=${produto.estoque}, is_ingresso=${produto.is_ingresso}, pontos_custo=${produto.pontos_custo} WHERE id=${id};`
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },

    deleteProduto: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM produto WHERE id=${id};`
    
            database.query(query, (err, res) => {
                if (res) resolve(res);
                else reject(err)
            });
        });
    },
}