const { Router } = require('express');

const { getGastos, getGasto, crearGasto, getSaldo, obtenerGastoPorCategoria, obtenerGastoPorSubCategoria } = require('../controllers/gastos')

const router = Router();

router.get('/',getGastos)

router.get('/:id',getGasto)

router.get('/saldo/amount',getSaldo)

// Reportes 

router.get('/reportes/obtenerGastoPorCategoria',obtenerGastoPorCategoria)

router.get('/reportes/obtenerGastoPorSubCategoria',obtenerGastoPorSubCategoria)

router.post('/',crearGasto)

module.exports = router;