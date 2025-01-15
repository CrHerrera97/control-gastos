const { response } = require('express');

const CategoriaIngreso = require('../models/categoriaIngreso');


const obtenerCategoriasIngreso = async (req,res) => {
    const categoriasIngreso = await CategoriaIngreso.find();

    res.status(200).json({
        categoriasIngreso
    })
}

const obtenerCategoriaIngreso = async (req,res) => {
    const { id } = req.params;

    const categoriaIngreso = await CategoriaIngreso.findById(id)

    res.status(200).json({
        categoriaIngreso
    })
}

const crearCategoriaIngreso = async (req,res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion;

    const categoriaIngresoDb = await CategoriaIngreso.findOne({nombre})

    if(categoriaIngresoDb){
        return res.status(400).json({
            msg: `La categoria ingreso ${categoriaIngresoDb.nombre} ya existe`
        })
    }

    const data = {
        nombre,
        descripcion
    }

    const crearCategoriaIngreso = new CategoriaIngreso(data)

    await crearCategoriaIngreso.save();

    res.status(201).json(crearCategoriaIngreso);
}

const editarCategoriaIngreso = async (req,res) => {

    const { id } = req.params;

    const nombre = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion;
    const estado = req.body.estado;

    const categoriaIngreso = await CategoriaIngreso.findByIdAndUpdate(
        id,
        { $set: { nombre, descripcion, estado } }
    )

    res.status(200).json({
        categoriaIngreso
    })

}

const borrarCategoriaIngreso = async (req,res) => {
    const { id } = req.params;

    const categoriaIngreso = await CategoriaIngreso.findByIdAndUpdate(
        id,
        { $set: { estado: "false" } }
    )

    res.status(200).json({
        categoriaIngreso
    })

}

module.exports = { obtenerCategoriasIngreso, obtenerCategoriaIngreso, crearCategoriaIngreso, editarCategoriaIngreso, borrarCategoriaIngreso  }