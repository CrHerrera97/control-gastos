const { Router } = require('express');

const { obtenerGastos, obtenerGasto, editarGasto, obtenerSaldo, crearGasto, editarCategoriaGasto, borrarCategoriaGasto, obtenerGastosPorCategoria, obtenerGastosPorSubCategoria, obtenerTopCategoria, obtenerTopSubCategoria } = require('../controllers/gastos')

const router = Router();

router.get('/', obtenerGastos);

router.get('/:id', obtenerGasto);

router.get('/saldo/amount', obtenerSaldo);

router.put('/:id', editarGasto);

router.post('/', crearGasto);

router.put('/:id', editarCategoriaGasto);

router.delete('/:id', borrarCategoriaGasto);

// Reportes 

router.get('/reportes/gastos/categoria', obtenerGastosPorCategoria);

router.get('/reportes/gastos/subcategoria', obtenerGastosPorSubCategoria);

// Top 5 gastos por categoria

router.get('/reportes/gastos/top-categoria',obtenerTopCategoria);

router.get('/reportes/gastos/top-subcategoria',obtenerTopSubCategoria);

module.exports = router;