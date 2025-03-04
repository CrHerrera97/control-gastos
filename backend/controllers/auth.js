const { response } = require("express");
const Usuario = require('../models/usuario')
const { generarJwt } = require('../helpers/generar-jwt')
const bcryptjs = require('bcryptjs');

const login = async (req,res = response)=>{

    const { correo, password } = req.body;

    try {

        // verificar si el email existe

        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg: 'usuario / password no son correctos = correo'
            })
        }

        // verificar si el usuario está activo en bd

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'el usuario está inabilitado'
            })
        }

        // verificar el pass

        const validPassword = bcryptjs.compareSync(password, usuario.password)

        if (!validPassword) {
            return res.status(400).json({
                msg: 'el usuario / password no son correctos'
            })
        }

        // generar el jwt

        const token = await generarJwt(usuario.id);
        
        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'algo salió mal, hable con el admin'
        })
    }



}

module.exports = {
    login
}