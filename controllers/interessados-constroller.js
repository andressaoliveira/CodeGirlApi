const mysql = require('../mysql');

async function get() {
    const result = await mysql.execute("SELECT * FROM interessados;")
    const response = {
        length: result.length,
        interessados: result.map(interessado => {
            return {
                nome: interessado.Nome,
                telefone: interessado.Telefone,
                email: interessado.Email,
                receberNovidades: interessado.ReceberNovidades,
                data: interessado.Data
            }
        })
    }
    return response;
}
module.exports = {
    async getInteressados(req, res, next) {
        try {
            const response = await get();
            return res.status(200).send(response);
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    },

    async postInteressados(req, res) {
        try {
            const inseridos = await get();
            let existe = inseridos?.interessados?.find(i => i.email == req.body.email)
            if (existe) {
                throw new Error('Usuário já cadastrado');
            }

            const query = 'INSERT INTO interessados (`Nome`, `Telefone`, `Email`, `ReceberNovidades`, `Data`) VALUES (?, ?, ?, ?, ?)';
            const result = await mysql.execute(query, [req.body.nome, req.body.telefone, req.body.email, req.body.receberNovidades, new Date()]);

            const response = {
                message: 'Dado inserido com sucesso',
                result: result
            }
            return res.status(201).send(response);
        } catch (error) {
            return res.status(500).send({ error });
        }
    }
}