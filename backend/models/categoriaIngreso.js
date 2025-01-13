const mongoose = require('mongoose');

const CategoriaIngresoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,   
        trim: true     
    },
    descripcion: {
        type: String,
        trim: true,     
        default: ''
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

module.exports = mongoose.model('CategoriaIngreso',CategoriaIngresoSchema)