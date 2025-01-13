const CategoriaIngreso = require('../models/categoriaIngreso')

const existeCategoriaPorId = async (id) =>{
    
    const categoriaIngreso = await CategoriaIngreso.findById(id)
    
    if(!categoriaIngreso){
        console.log('error')
        throw new Error(`la categoria con el id ${id} no existe`)
    }
}

module.exports = { existeCategoriaPorId }