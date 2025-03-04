const Usuario = require('../models/usuario')

const CategoriaIngreso = require('../models/categoriaIngreso')
const CategoriaGasto = require('../models/categoriaGasto')
const SubCategoriaGasto = require('../models/subCategoriaGasto')

const existeUsuarioPorId = async (id) =>{

    //verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id)
    
    if(!existeUsuario){
        throw new Error(`el id ${id} no existe`)
    }
}

const existeEmail = async (correo = '') =>{

    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo})
    
    if(existeEmail){
        throw new Error(`el corrreo ${correo} ya está registrado`)
    }
}

const existeCategoriaIngresoPorId = async (id) =>{
    
    const categoriaIngreso = await CategoriaIngreso.findById(id)
    
    if(!categoriaIngreso){
        throw new Error(`la categoria con el id ${id} no existe`)
    }
}

const existeCategoriaGastoPorId = async (id) =>{
    
    const categoriaGasto = await CategoriaGasto.findById(id)
    
    if(!categoriaGasto){
        throw new Error(`la categoria con el id ${id} no existe`)
    }
}

const existeSubCategoriaGastoPorId = async (id) =>{
    
    const subCategoriaGasto = await SubCategoriaGasto.findById(id)
    
    if(!subCategoriaGasto){
        throw new Error(`la sub categoria con el id ${id} no existe`)
    }
}

module.exports = { existeUsuarioPorId, existeEmail, existeCategoriaIngresoPorId, existeCategoriaGastoPorId, existeSubCategoriaGastoPorId }