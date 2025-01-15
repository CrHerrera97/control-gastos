const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')

const { existeCategoriaIngresoPorId } = require('../helpers/db-validators')  

const { obtenerCategoriasIngreso, obtenerCategoriaIngreso, crearCategoriaIngreso, editarCategoriaIngreso, borrarCategoriaIngreso } = require('../controllers/categoriasIngreso')

const router = Router();

router.get('/', obtenerCategoriasIngreso)

router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaIngresoPorId),
    validarCampos
], obtenerCategoriaIngreso)

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoriaIngreso)

router.put('/:id',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],editarCategoriaIngreso)

router.delete('/:id', borrarCategoriaIngreso)

module.exports = router;