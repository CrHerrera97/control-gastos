
const { response } = require('express');

const Ingreso = require('../models/ingreso')

const obtenerIngresos = async (req, res = response) => {
    const { limite = 5, desde = 0, anio, mes } = req.query;

    // Convertimos desde y limite a números para usarlos correctamente
    const limit = parseInt(limite, 10);
    const skip = parseInt(desde, 10) * limit;

    const fechaInicio = new Date(anio, mes - 1, 1);
    const fechaFin = new Date(anio, mes, 1);

    const ingresos = await Ingreso.find({
        estado: true,
        creadoEn: { $gte: fechaInicio, $lte: fechaFin }
    })
    .populate({
        path: 'categoria',
        select: '-descripcion -estado -creadoEn -__v'
    })
    .skip(skip)
    .limit(limit);

    res.status(200).json({
        ingresos
    });
};


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


const obtenerIngresosTotalesMes = async (req, res) => {

    const { anio, mes } = req.query;

    const fechaInicio = new Date(anio, mes - 1, 1);
    const fechaFin = new Date(anio, mes, 1);

    const ingresoPorMes = await Ingreso.aggregate([
        {
            $match : {
                estado : true,
                creadoEn: {
                    $gte : fechaInicio,
                    $lt: fechaFin
                }
            }
        },
        {
            $group: {
                _id: null,
                totalValor: { $sum: "$valor" }
            }
        }
    ])

    if (ingresoPorMes.length > 0) {
        const total = ingresoPorMes[0].totalValor;
        res.status(200).json({
            valorTotal: total
        });
    } else {
        res.status(200).json({
            valorTotal: 0
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

module.exports = { obtenerIngresos, obtenerIngreso, obtenerIngresosTotales, obtenerIngresosTotalesMes, crearIngreso, editarIngreso, borrarIngreso }