const { request,response } = require('express');
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

// crearemos una función para validar los tokens y para que podamos restringir ciertas rutas
// los token irian en los headers
const validarJwt = async(req = request, res = response,next)=>{

    //const token = req.header
    // x-token es como se va a llamar
    const token = req.header('x-token')

    if (!token){
        return res.status(401).json({
            msg: "no hay token en la peticion"
        })
    }

    try {

        // validamos el json web token

        const {uid} = jwt.verify(token,process.env.SECRETOPRIVATEKEY);

        // leer usuario que corresponde al uid
        
        const usuario = await Usuario.findById(uid)

        if(!usuario){
            return res.status(401).json({
                msg: 'token no valido - usuario no existe en db'
            })
        }

        // verificar si el uid tiene estado en true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'token no valido - usuario con estado false'
            })
        }
        // guardamos el usuario por si lo requerimos en otros endpoints
        req.usuario = usuario
        next();
        //req.usuario = await usuario.uid

        // dentro del objeto request estoy creando una propiedad nueva para atraparla en el controlador
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'token no valido'
        })
    }

    console.log(token)


}


module.exports = {
    validarJwt
}