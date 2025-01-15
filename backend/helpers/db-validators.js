const CategoriaIngreso = require('../models/categoriaIngreso')
const CategoriaGasto = require('../models/categoriaGasto')
const SubCategoriaGasto = require('../models/subCategoriaGasto')

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

module.exports = { existeCategoriaIngresoPorId, existeCategoriaGastoPorId, existeSubCategoriaGastoPorId }