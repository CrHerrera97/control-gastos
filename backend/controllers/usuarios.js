const { request, response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) =>{
    const {limite = '5', desde = '0'} = req.query;

    const query = {estado : true}

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(desde)
            .limit(limite)
    ])

    res.json({
        total,
        usuarios
    })
}


const usuariosPut = async (req, res = response) =>{
    const {id} = req.params
    // excluimos el correo y el password
    const {_id,password,correo, ...resto} = req.body;

    //todo validar contra bd
    
    if(password){
        // encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto)

    res.json(usuario)
}

const usuariosPost = async (req, res = response) =>{

    const {nombre,correo,password} = req.body;
    const usuario = new Usuario({nombre,correo,password});

    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt)
    //guardar en bd
    await usuario.save();

    res.json({
        msg: 'post Api',
        usuario
    })
}

const usuariosDelete = async (req, res = response) => {

    const {id} = req.params

    //const uid = req.uid

    // borrado fisicamente
    //await Usuario.findByIdAndDelete(id);

    // cambiando el estado del usuario

    const usuario = await Usuario.findByIdAndUpdate(id,{estado : false})

    //usuarioAutenticado -> no se va a mandar ya que es informacion sensible
    //const usuarioAutenticado = req.usuario

    res.json({usuario})
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosGet
}
