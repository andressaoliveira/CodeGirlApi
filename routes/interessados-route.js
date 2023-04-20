const express = require('express');
const router = express.Router();

const InteressadosController = require('../controllers/interessados-constroller');

router.get('/', InteressadosController.getInteressados);
router.post('/', InteressadosController.postInteressados);

module.exports = router;