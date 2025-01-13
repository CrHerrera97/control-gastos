
const { response } = require('express');

const Ingreso = require('../models/ingreso')

const getIngresos = async (req,res = response) => {
    /*
    const [ingresos] = await Promise.all([
        Ingreso.find()
            .populate('categoria')
    ])
    */

    const ingresos = await Ingreso.find().populate({
        path: 'categoria',
        select: '-descripcion -estado -creadoEn -_id -__v'
    })

    res.status(200).json({
        ingresos
    })
}

const getIngreso = (req,res) => {
    res.json({
        msg: 'Get by id'
    });
}

const crearIngreso = async (req,res) => {

    const categoria = req.body.categoria;
    const valor = req.body.valor;

    const data = { categoria, valor }

    const crearIngreso =  new Ingreso(data)
    await crearIngreso.save();

    res.status(201).json(crearIngreso)

}

const putIngreso = (req,res) => {
    res.json({
        msg: 'Put'
    });
}

const deleteIngreso = (req,res) => {
    res.json({
        msg: 'Delete'
    });
}

module.exports = { getIngresos, crearIngreso, getIngreso, putIngreso, deleteIngreso }