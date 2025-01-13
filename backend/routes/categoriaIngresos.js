const { Router } = require('express');

const { getCategoriasIngreso, crearCategoriaIngreso, getCategoriaIngreso, putCategoriaIngreso, deleteCategoriaIngreso } = require('../controllers/categoriasIngreso')

const router = Router();

// TODO middlewares

router.get('/', getCategoriasIngreso)

router.get('/:id', getCategoriaIngreso)

router.post('/', crearCategoriaIngreso)

router.put('/:id', putCategoriaIngreso)

router.delete('/:id', deleteCategoriaIngreso)


module.exports = router;