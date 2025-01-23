
const { response } = require('express');

const Ingreso = require('../models/ingreso')

const obtenerIngresos = async (req,res = response) => {
    
    const {limite = '5',desde = '0'} = req.query
    
    const [ ingresos ] = await Promise.all([
        Ingreso.find({ estado: true })
        .populate({
            path: 'categoria',
            select: '-descripcion -estado -creadoEn -__v'
        })
        .skip(desde)
        .limit(limite)
    ])

    res.status(200).json({
        ingresos
    })
}

const obtenerIngreso = async (req,res) => {

    const { id } = req.params;

    const ingreso = await Ingreso.findById(id)

    res.status(200).json({
        ingreso
    })
}

const obtenerIngresosTotales = async (req, res) => {

    try {
        const sumTotal = await Ingreso.aggregate([
            {
                $match: {
                    estado: true
                }
            },
            {
                $group: {
                    _id: null,
                    totalValor: { $sum: "$valor" }
                }
            }
        ]);
        
        if (sumTotal.length > 0) {
            const total = sumTotal[0].totalValor;
            res.status(200).json({
                valorTotal: total
            });
        } else {
            res.status(200).json({
                valorTotal: 0
            });
        }
    } catch (err) {
        res.status(500).json({
            msg: 'Error',
            error: err.message
        });
    }
}

const crearIngreso = async (req,res) => {

    const categoria = req.body.categoria;
    const valor = req.body.valor;

    const data = { categoria, valor }

    const crearIngreso =  new Ingreso(data)
    await crearIngreso.save();

    res.status(201).json(crearIngreso)

}

const editarIngreso = async (req,res) => {

    const { id } = req.params;

    const categoria = req.body.categoria;
    const valor = req.body.valor;
    const estado = req.body.estado;

    const actualizarIngreso = await Ingreso.findByIdAndUpdate(
        id,
        { $set: { categoria, valor, estado }}
    )

    res.status(200).json(actualizarIngreso)
}

const borrarIngreso = async (req,res) => {
    const { id } = req.params;
    
    const ingreso = await Ingreso.findByIdAndUpdate(
        id,
        { $set: { estado: "false" } }
    )

    res.status(200).json(ingreso);
}

module.exports = { obtenerIngresos, obtenerIngreso, obtenerIngresosTotales, crearIngreso, editarIngreso, borrarIngreso }