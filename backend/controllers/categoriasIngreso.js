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

    if(!categoriaIngreso){
        return res.status(400).json({
            msg: `La categoria ${id} no existe`
        })
    }
    res.json({
        categoriaIngreso
    })
}

const crearCategoriaIngreso = async (req,res = response) => {

    const nombre = req.body.nombre.toUpperCase();;
    const descripcion = req.body.descripcion;

    const categoriaIngresoDb = await CategoriaIngreso.findOne({nombre})

    if(categoriaIngresoDb){
        return res.status(400).json({
            msg: `La categoria ${categoriaIngresoDb.nombre} ya existe`
        })
    }

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
    const estado = req.body.estado;

    const categoriaIngreso = await CategoriaIngreso.findByIdAndUpdate(
        id,
        { $set: { nombre, descripcion, estado }}
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