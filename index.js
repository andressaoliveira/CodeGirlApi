const express = require('express');
const server = express();

server.get('/', (req, res) => {
    return res.json({ mensagem: 'Api Ok' })
})

server.listen(3000, () => {
    console.log('Funcionando...')
})