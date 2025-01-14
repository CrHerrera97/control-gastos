const { response } = require('express');

const SubCategoriaGasto = require('../models/subCategoriaGasto');


const getSubCategoriaGastos = async (req,res) => {
    const categoriasGasto = await SubCategoriaGasto.find();

    res.status(200).json({
        categoriasGasto
    })
}

const getSubCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const categoriaGasto = await SubCategoriaGasto.findById(id)

    if(!categoriaGasto){
        return res.status(400).json({
            msg: `La categoria ${id} no existe`
        })
    }
    res.json({
        categoriaGasto
    })
}

const crearSubCategoriaGasto = async (req,res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoria = req.body.categoria;

    const categoriaGastoDb = await SubCategoriaGasto.findOne({nombre})

    if(categoriaGastoDb){
        return res.status(400).json({
            msg: `La categoria ${categoriaGastoDb.nombre} ya existe`
        })
    }

    const data = {
        nombre,
        categoria
    }

    const crearCategoriaGasto = await new SubCategoriaGasto(data)

    await crearCategoriaGasto.save();

    res.status(201).json(crearCategoriaGasto);
}

const putSubCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const nombre = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion;
    const estado = req.body.estado;

    const categoriaGasto = await SubCategoriaGasto.findByIdAndUpdate(
        id,
        { $set: { nombre, descripcion, estado }}
    )

    res.json({
        categoriaGasto,
        nombre,
        id
    })

}

const deleteSubCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const categoriaGasto = await SubCategoriaGasto.findByIdAndUpdate(
        id,
        { $set: {estado: "false"}}
    )

    res.json({
        categoriaGasto
    })

}

module.exports = { getSubCategoriaGastos, crearSubCategoriaGasto, getSubCategoriaGasto, putSubCategoriaGasto, deleteSubCategoriaGasto }