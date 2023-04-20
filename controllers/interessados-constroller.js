const mysql = require('../mysql');

module.exports = {
    async getInteressados(req, res, next) {
        try {
            const result = await mysql.execute("SELECT * FROM interessados;")
            console.info(result);
            const response = {
                length: result.length,
                interessados: result.map(interessado => {
                    return {
                        nome: interessado.Nome,
                        email: interessado.Email
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
            console.log('body', req.body)
            const query = 'INSERT INTO interessados (`Nome`, `Sobrenome`, `Email`, `ReceberNotificacoes`) VALUES (?, ?, ?, ?)';
            const result = await mysql.execute(query, [req.body.nome, req.body.sobrenome, req.body.email, req.body.receberNotificacao]);
            console.log('result', result)

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