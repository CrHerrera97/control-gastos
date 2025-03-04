const jwt = require('jsonwebtoken');

const generarJwt = (uid = '')=>{

    // creamos una promesa para poder llamarlo con el await desde el controlador
    
    return new Promise((resolve,reject)=>{

        // generamos el jwt

        const payLoad = { uid }

        jwt.sign(payLoad,process.env.SECRETOPRIVATEKEY,{
            expiresIn : '4h'
        },(err,token)=>{
            if(err){
                console.log(err)
                reject('no se pudo generar el token')
            }else{
                resolve(token)
            }
        })

    })

}


module.exports = {
    generarJwt
}