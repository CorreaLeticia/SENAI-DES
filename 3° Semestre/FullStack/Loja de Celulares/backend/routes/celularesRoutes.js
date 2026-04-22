const express = require('express');
const router = express.Router();

const celularesController = require('../controllers/celularesController');

router.get('/', celularesController.listar);
router.post('/', celularesController.criar);

router.get('/:id', celularesController.buscarPorId);
router.put('/:id', celularesController.atualizar);
router.delete('/:id', celularesController.deletar);

module.exports = router;