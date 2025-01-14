const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')

const { existeCategoriaPorId } = require('../helpers/db-validators')  

const { getSubCategoriaGastos, crearSubCategoriaGasto, getSubCategoriaGasto, putSubCategoriaGasto, deleteSubCategoriaGasto } = require('../controllers/subCategoriasGastos')

const router = Router();

// TODO middlewares

router.get('/', getSubCategoriaGastos)

router.get('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], getSubCategoriaGasto)

router.post('/',crearSubCategoriaGasto)

router.put('/:id',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validarCampos
],putSubCategoriaGasto)

router.delete('/:id', deleteSubCategoriaGasto)


module.exports = router;