const { Router } = require('express');

const { getGastos, getGasto, crearGasto, getSaldo } = require('../controllers/gastos')

const router = Router();

router.get('/',getGastos)

router.get('/:id',getGasto)

router.get('/saldo/amount',getSaldo)

router.post('/',crearGasto)

module.exports = router;