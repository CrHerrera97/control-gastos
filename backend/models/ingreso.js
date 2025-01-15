const { Schema, model } = require('mongoose');

const IngresoSchema = Schema({
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'CategoriaIngreso',
        required: true
    },
    valor: {
        type: Number,
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
})

IngresoSchema.methods.toJSON = function(){
    // Omitir el __v de ese modelo y retorne solo lo otro con el ...data
    const {__v, ...data} = this.toObject();
    return data
}

module.exports = model('Ingreso',IngresoSchema)