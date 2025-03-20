const { Router } = require('express');

const { validarJwt } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')

const { check } = require("express-validator");

const { obtenerIngresos, obtenerIngreso, obtenerIngresosTotales, obtenerIngresosTotalesMes, crearIngreso, editarIngreso, borrarIngreso  } = require('../controllers/ingresos')

const router = Router();

router.get('/', [ validarJwt ] , obtenerIngresos)

router.get('/:id', [
    validarJwt,
    check('id','no es un id valido').isMongoId(),
    validarCampos
], obtenerIngreso)

router.get('/total/amount', [ validarJwt ], obtenerIngresosTotales)

router.get('/total/mes', [ validarJwt ] ,obtenerIngresosTotalesMes)

router.post('/', [
    validarJwt,
    check('categoria','no es un id valido').isMongoId(),
    validarCampos
], crearIngreso)

router.put('/:id', [
    validarJwt,
    check('categoria','no es un id valido').isMongoId(),
    validarCampos
], editarIngreso)

router.delete('/:id', [
    validarJwt,
    check('id','no es un id valido').isMongoId(),
    validarCampos
], borrarIngreso)


module.exports = router;