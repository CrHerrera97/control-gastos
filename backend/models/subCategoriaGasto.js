const { Schema, model } = require('mongoose');

const SubCategoriaGastoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'CategoriaGasto',
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


module.exports = model('SubCategoriaGasto',SubCategoriaGastoSchema)