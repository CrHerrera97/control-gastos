const { response } = require('express');

const CategoriaIngreso = require('../models/categoriaIngreso');


const getCategoriasIngreso = async (req,res) => {
    const categoriasIngreso = await CategoriaIngreso.find();

    res.status(200).json({
        categoriasIngreso
    })
}

const getCategoriaIngreso = async (req,res) => {
    const { id } = req.params;

    const categoriaIngreso = await CategoriaIngreso.findById(id)
    res.json({
        categoriaIngreso
    })
}

const crearCategoriaIngreso = async (req,res = response) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;

    const data = {
        nombre,
        descripcion
    }

    const crearCategoriaIngreso = await new CategoriaIngreso(data)

    await crearCategoriaIngreso.save();

    res.status(201).json(crearCategoriaIngreso);
}

const putCategoriaIngreso = async (req,res) => {
    const { id } = req.params;

    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;


    const categoriaIngreso = await CategoriaIngreso.findByIdAndUpdate(
        id,
        { $set: { nombre, descripcion }}
    )

    res.json({
        categoriaIngreso,
        nombre,
        id
    })

}

const deleteCategoriaIngreso = async (req,res) => {
    const { id } = req.params;

    const categoriaIngreso = await CategoriaIngreso.findByIdAndUpdate(
        id,
        { $set: {estado: "false"}}
    )

    res.json({
        categoriaIngreso
    })

}

module.exports = { getCategoriasIngreso, getCategoriaIngreso, crearCategoriaIngreso, putCategoriaIngreso, deleteCategoriaIngreso }