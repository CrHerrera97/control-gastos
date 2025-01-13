const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')

const { existeCategoriaPorId } = require('../helpers/db-validators')  

const { getCategoriasIngreso, crearCategoriaIngreso, getCategoriaIngreso, putCategoriaIngreso, deleteCategoriaIngreso } = require('../controllers/categoriasIngreso')

const router = Router();

// TODO middlewares

router.get('/', getCategoriasIngreso)

router.get('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], getCategoriaIngreso)

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoriaIngreso)

router.put('/:id', putCategoriaIngreso)

router.delete('/:id', deleteCategoriaIngreso)


module.exports = router;