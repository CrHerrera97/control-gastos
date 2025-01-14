const { Schema, model } = require('mongoose');

const GastoSchema = Schema({
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'CategoriaGasto',
        required: true
    },
    subCategoria: {
        type: Schema.Types.ObjectId,
        ref: 'SubCategoriaGasto',
        require: true
    },
    descripcion: {
        type: String
    },
    valor: {
        type: Number,
        required: true
    },
    creadoEn: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Gasto',GastoSchema)