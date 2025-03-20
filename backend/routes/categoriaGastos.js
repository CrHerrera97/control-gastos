const { Router } = require('express');

const { check } = require('express-validator');
const { validarJwt } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')

const { existeCategoriaGastoPorId } = require('../helpers/db-validators')  

const { obtenerCategoriasGasto, obtenerCategoriaGasto, crearCategoriaGasto, editarCategoriaGasto, borrarCategoriaGasto } = require('../controllers/categoriasGastos')

const router = Router();

router.get('/', [validarJwt],obtenerCategoriasGasto)

router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaGastoPorId),
    validarCampos
], obtenerCategoriaGasto)

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoriaGasto)

router.put('/:id',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], editarCategoriaGasto)

router.delete('/:id', borrarCategoriaGasto)


module.exports = router;