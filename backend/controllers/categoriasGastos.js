const { response } = require('express');

const CategoriaGasto = require('../models/categoriaGasto');


const obtenerCategoriasGasto = async (req,res) => {

    const { nombre } = req.query;

    let categoriasGasto;
    if(!nombre){
        categoriasGasto = await CategoriaGasto.find();
    }else{
        categoriasGasto = await CategoriaGasto.find({
            nombre: { $regex: nombre, $options: 'i' }
        });
    }

    res.status(200).json({
        categoriasGasto
    })
}

const obtenerCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const categoriaGasto = await CategoriaGasto.findById(id)

    if(!categoriaGasto){
        return res.status(400).json({
            msg: `La categoria ${id} no existe`
        })
    }
    res.status(200).json({
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

    const crearCategoriaGasto = new CategoriaGasto(data)

    await crearCategoriaGasto.save();

    res.status(201).json(crearCategoriaGasto);
}

const editarCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const nombre = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion;
    const estado = req.body.estado;

    const categoriaGasto = await CategoriaGasto.findByIdAndUpdate(
        id,
        { $set: { nombre, descripcion, estado } }
    )

    res.status(200).json({
        categoriaGasto
    })
}

const borrarCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const categoriaGasto = await CategoriaGasto.findByIdAndUpdate(
        id,
        { $set: { estado : "false" } }
    )

    res.status(200).json({
        categoriaGasto
    })

}

module.exports = { obtenerCategoriasGasto, obtenerCategoriaGasto, crearCategoriaGasto, editarCategoriaGasto, borrarCategoriaGasto }