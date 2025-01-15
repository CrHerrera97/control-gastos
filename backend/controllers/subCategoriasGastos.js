const { response } = require('express');

const SubCategoriaGasto = require('../models/subCategoriaGasto');


const obtenerSubCategoriasGasto = async (req,res) => {
    const subCategoriasGasto = await SubCategoriaGasto.find();

    res.status(200).json({
        subCategoriasGasto
    })
}

const obtenerSubCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const subCategoriaGasto = await SubCategoriaGasto.findById(id)

    if(!subCategoriaGasto){
        return res.status(400).json({
            msg: `La sub categoria ${id} no existe`
        })
    }
    res.status(200).json({
        subCategoriaGasto
    })
}

const crearSubCategoriaGasto = async (req,res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoria = req.body.categoria;

    const subCategoriaGastoDb = await SubCategoriaGasto.findOne({nombre})

    if(subCategoriaGastoDb){
        return res.status(400).json({
            msg: `La sub categoria ${subCategoriaGastoDb.nombre} ya existe`
        })
    }

    const data = {
        nombre,
        categoria
    }

    const crearSubCategoriaGasto = new SubCategoriaGasto(data)

    await crearSubCategoriaGasto.save();

    res.status(201).json(crearSubCategoriaGasto);
}

const editarSubCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const nombre = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion;
    const estado = req.body.estado;

    const subCategoriaGasto = await SubCategoriaGasto.findByIdAndUpdate(
        id,
        { $set: { nombre, descripcion, estado } }
    )

    res.status(200).json({
        subCategoriaGasto
    })

}

const borrarSubCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const subCategoriaGasto = await SubCategoriaGasto.findByIdAndUpdate(
        id,
        { $set: {estado: "false" } }
    )

    res.status(200).json({
        subCategoriaGasto
    })

}

module.exports = { obtenerSubCategoriasGasto, obtenerSubCategoriaGasto, crearSubCategoriaGasto, editarSubCategoriaGasto, borrarSubCategoriaGasto }