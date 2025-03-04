const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJwt } = require('../middlewares/validar-jwt')

const { existeEmail,existeUsuarioPorId } = require('../helpers/db-validators')

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete} = require('../controllers/usuarios');


const router = Router();

router.get('/',usuariosGet);

router.put('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosPut);


// vamos a enviar en el segundo argumento del post un middleware, cuando hay 3 argumentos
// el segundo es el middleware, si solo hubiera 2 indicaria que el 2 sería el controlador
router.post('/', [
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el password debe ser de 6 letras').isLength({min:6}),
    check('correo').custom(existeEmail),
    validarCampos
],usuariosPost);

router.delete('/:id',[
    validarJwt,
    //esAdminRole,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

module.exports = router