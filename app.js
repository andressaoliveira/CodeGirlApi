const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const InteressadosRoute = require('./routes/interessados-route');

app.use(bodyParser.urlencoded({ extended: false }));  // apenas dados simples
app.use(bodyParser.json()); // json de entrada no body

app.use('/interessados', InteressadosRoute);

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;