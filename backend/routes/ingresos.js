const { Router } = require('express');

const { getIngresos, crearIngreso, getIngreso, putIngreso, deleteIngreso } = require('../controllers/ingresos')

const router = Router();

router.get('/', getIngresos)

router.get('/:id', getIngreso)

router.post('/', crearIngreso)

router.put('/:id', putIngreso)

router.delete('/:id', deleteIngreso)


module.exports = router;