const { Router } = require('express');

const { getIngresos, postIngreso, getIngreso, putIngreso, deleteIngreso } = require('../controllers/ingresos')

const router = Router();

router.get('/', getIngresos)

router.get('/:id', getIngreso)

router.post('/', postIngreso)

router.put('/:id', putIngreso)

router.delete('/:id', deleteIngreso)


module.exports = router;