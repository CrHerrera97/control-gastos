const { response } = require('express');

const CategoriaGasto = require('../models/categoriaGasto');


const getCategoriaGastos = async (req,res) => {
    const categoriasGasto = await CategoriaGasto.find();

    res.status(200).json({
        categoriasGasto
    })
}

const getCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const categoriaGasto = await CategoriaGasto.findById(id)

    if(!categoriaGasto){
        return res.status(400).json({
            msg: `La categoria ${id} no existe`
        })
    }
    res.json({
        categoriaGasto
    })
}

const crearCategoriaGasto = async (req,res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion;

    const categoriaGastoDb = await CategoriaGasto.findOne({nombre})

    if(categoriaGastoDb){
        return res.status(400).json({
            msg: `La categoria ${categoriaGastoDb.nombre} ya existe`
        })
    }

    const data = {
        nombre,
        descripcion
    }

    const crearCategoriaGasto = await new CategoriaGasto(data)

    await crearCategoriaGasto.save();

    res.status(201).json(crearCategoriaGasto);
}

const putCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const nombre = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion;
    const estado = req.body.estado;

    const categoriaGasto = await CategoriaGasto.findByIdAndUpdate(
        id,
        { $set: { nombre, descripcion, estado }}
    )

    res.json({
        categoriaGasto,
        nombre,
        id
    })

}

const deleteCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const categoriaGasto = await CategoriaGasto.findByIdAndUpdate(
        id,
        { $set: {estado: "false"}}
    )

    res.json({
        categoriaGasto
    })

}

module.exports = { getCategoriaGastos, crearCategoriaGasto, getCategoriaGasto, putCategoriaGasto, deleteCategoriaGasto }