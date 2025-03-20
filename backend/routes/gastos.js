const { Router } = require('express');

const { validarJwt } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')

const { check } = require("express-validator");

const { obtenerGastos, obtenerGasto, editarGasto, obtenerSaldo, obtenerGastosTotales, obtenerGastosTotalesMes, crearGasto, editarCategoriaGasto, borrarCategoriaGasto, obtenerGastosPorCategoria, obtenerGastosPorSubCategoria, obtenerTopCategoria, obtenerTopSubCategoria } = require('../controllers/gastos')

const router = Router();


/* El validar campos funciona con el express validator con datos que obtiene a través del requiere
con el check*/
router.get('/', [ validarJwt ], obtenerGastos);

router.get('/:id', [ 
    validarJwt,
    check('id','no es un id valido').isMongoId(),
    validarCampos
], obtenerGasto);

router.get('/total/amount', [ validarJwt ],obtenerGastosTotales)

router.get('/total/amount/mes', [ validarJwt ], obtenerGastosTotalesMes)

router.get('/saldo/amount',[ validarJwt ], obtenerSaldo);

router.put('/:id',[ 
    validarJwt
], editarGasto);

router.post('/', [
    validarJwt
], crearGasto);

router.delete('/:id',[
    validarJwt
], borrarCategoriaGasto);

// Reportes 

router.get('/reportes/gastos/categoria',[ validarJwt ], obtenerGastosPorCategoria);

router.get('/reportes/gastos/subcategoria',[ validarJwt ], obtenerGastosPorSubCategoria);

// Top 5 gastos por categoria

router.get('/reportes/gastos/top-categoria',[ validarJwt ],obtenerTopCategoria);

router.get('/reportes/gastos/top-subcategoria',[ validarJwt ],obtenerTopSubCategoria);

module.exports = router;