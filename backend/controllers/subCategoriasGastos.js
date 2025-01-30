const { response } = require('express');

const SubCategoriaGasto = require('../models/subCategoriaGasto');


const obtenerSubCategoriasGasto = async (req,res) => {

    const { nombre } = req.query;

    let subCategoriasGasto;

    if(!nombre){
        subCategoriasGasto = await SubCategoriaGasto.find();
    }else{
        subCategoriasGasto = await SubCategoriaGasto.aggregate([
            {
                $match: {
                    estado: true,
                    nombre: { $regex: nombre, $options: 'i' }
                }
            },
            {
                $lookup: {
                    from: "categoriagastos",
                    localField: "categoria",
                    foreignField: "_id",
                    as: "categoriaDetalles"
                }
            },
            { $unwind: "$categoriaDetalles" },
            {
                $project: {
                    _id: 1,
                    "categoriaDetalles._id": 1,
                    "categoriaDetalles.nombre": 1,
                    nombre: 1,
                    creadoEn: 1
                }
            }
        ]);
    }
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