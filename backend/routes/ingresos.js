const { Router } = require('express');

const { obtenerIngresos, obtenerIngreso, obtenerIngresosTotales, crearIngreso, editarIngreso, borrarIngreso  } = require('../controllers/ingresos')

const router = Router();

router.get('/', obtenerIngresos)

router.get('/:id', obtenerIngreso)

router.get('/total/amount', obtenerIngresosTotales)

router.post('/', crearIngreso)

router.put('/:id', editarIngreso)

router.delete('/:id', borrarIngreso)


module.exports = router;