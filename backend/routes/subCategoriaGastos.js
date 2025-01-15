const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')

const { existeSubCategoriaGastoPorId } = require('../helpers/db-validators')  

const { obtenerSubCategoriasGasto, obtenerSubCategoriaGasto, crearSubCategoriaGasto, editarSubCategoriaGasto, borrarSubCategoriaGasto } = require('../controllers/subCategoriasGastos')

const router = Router();

router.get('/', obtenerSubCategoriasGasto)

router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeSubCategoriaGastoPorId),
    validarCampos
], obtenerSubCategoriaGasto)

router.post('/', crearSubCategoriaGasto)

router.put('/:id',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], editarSubCategoriaGasto)

router.delete('/:id', borrarSubCategoriaGasto)

module.exports = router;