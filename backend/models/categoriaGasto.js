const { Schema, model } = require('mongoose');

const CategoriaGastoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    estado:{
        type: Boolean,
        default: true
    },
    creadoEn: {
        type: Date,
        default: Date.now
    }
});


module.exports = model('CategoriaGasto',CategoriaGastoSchema)