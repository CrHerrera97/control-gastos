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
    creadoEn: {
        type: Date,
        default: Date.now
    }
});


module.exports = model('SubCategoriaGasto',SubCategoriaGastoSchema)