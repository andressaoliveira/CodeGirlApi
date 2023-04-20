const mysql = require('../mysql');

module.exports = {
    async getInteressados(req, res, next) {
        try {
            const result = await mysql.execute("SELECT * FROM interessados;")
            const response = {
                length: result.length,
                interessados: result.map(interessado => {
                    return {
                        nome: interessado.Nome,
                        sobrenome: interessado.Sobrenome,
                        email: interessado.Email,
                        receberNovidades: interessado.ReceberNovidades
                    }
                })
            }
            return res.status(200).send(response);
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    },

    async postInteressados(req, res) {
        try {
            const query = 'INSERT INTO interessados (`Nome`, `Sobrenome`, `Email`, `ReceberNovidades`) VALUES (?, ?, ?, ?)';
            const result = await mysql.execute(query, [req.body.nome, req.body.sobrenome, req.body.email, req.body.receberNovidades]);

            const response = {
                message: 'Dado inserido com sucesso',
                result: result
            }
            return res.status(201).send(response);
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    }
}