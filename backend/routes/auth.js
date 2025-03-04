const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

/* IMPORTANTE
el metodo check solo valida los campos en el body de la solicitud post y agrega los errores de validacion
al objeto de respuesta, con el middleware personalizado "validarCampos" lo que hace es procesar el objeto de
respuesta enviado y devuelve un objeto con respuesta de error dado el caso si llegase a haber si no lo hay
la funcion de validarCampos pasará a la siguiente validación
*/
router.post('/login',[
    check('correo','el correo es obligatorio').isEmail(),
    check('password','el password es obligatoria').not().isEmpty(),
    validarCampos
],login);

module.exports = router
