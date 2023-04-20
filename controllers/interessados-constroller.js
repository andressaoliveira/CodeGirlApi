const mysql = require('../mysql');

exports.getInteressados = async (req, res, next) => {
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
};

// exports.postCategory = async (req, res, next) => {
//     try {
//         const query = 'INSERT INTO categories (name) VALUES (?)';
//         const result = await mysql.execute(query, [req.body.name]);

//         const response = {
//             message: 'Categoria inserida com sucesso',
//             createdCategory: {
//                 categoryId: result.insertId,
//                 name: req.body.name,
//                 request: {
//                     type: 'GET',
//                     description: 'Retorna todas as categorias',
//                     url: process.env.URL_API + 'categories'
//                 }
//             }
//         }
//         return res.status(201).send(response);
//     } catch (error) {
//         return res.status(500).send({ error: error });
//     }
// };