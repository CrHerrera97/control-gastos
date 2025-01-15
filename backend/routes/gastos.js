const { Router } = require('express');

const { obtenerGastos, obtenerGasto, obtenerSaldo, crearGasto, editarCategoriaGasto, borrarCategoriaGasto, obtenerGastosPorCategoria, obtenerGastosPorSubCategoria } = require('../controllers/gastos')

const router = Router();

router.get('/', obtenerGastos);

router.get('/:id', obtenerGasto);

router.get('/saldo/amount', obtenerSaldo);

router.post('/', crearGasto);

router.put('/:id', editarCategoriaGasto);

router.delete('/:id', borrarCategoriaGasto);

// Reportes 

router.get('/reportes/gastos/categoria', obtenerGastosPorCategoria);

router.get('/reportes/gastos/subcategoria', obtenerGastosPorSubCategoria);

module.exports = router;