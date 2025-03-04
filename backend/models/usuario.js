const { Schema,model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'el correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'la contraseña es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true
    }
})

// con esto vamos a omitir de nuestro json el __v y el password
UsuarioSchema.methods.toJSON = function(){
    const {__v, password, _id,...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario
}

module.exports = model('Usuario',UsuarioSchema)