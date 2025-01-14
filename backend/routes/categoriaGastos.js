const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')

const { existeCategoriaPorId } = require('../helpers/db-validators')  

const { getCategoriaGastos, crearCategoriaGasto, getCategoriaGasto, putCategoriaGasto, deleteCategoriaGasto } = require('../controllers/categoriasGastos')

const router = Router();

// TODO middlewares

router.get('/', getCategoriaGastos)

router.get('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], getCategoriaGasto)

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoriaGasto)

router.put('/:id',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validarCampos
],putCategoriaGasto)

router.delete('/:id', deleteCategoriaGasto)


module.exports = router;