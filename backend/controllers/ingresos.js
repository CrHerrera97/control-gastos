
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

    /*
    const id = ingresos[0]._id.toString();
    const nombre = ingresos[0].categoria.nombre;
    const valor = ingresos[0].valor;
    const creado = ingresos[0].creadoEn;

    const newData = {
        id,
        nombre,
        valor,
        creado
    }

    console.log(newData);

    */


    res.status(200).json({
        ingresos
    })
}

const getIngreso = async (req,res) => {
    res.json({
        msg: 'get x id ingreso'
    })
}

const getIngresosTotal = async (req, res) => {
    try {
        const sumTotal = await Ingreso.aggregate([
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

module.exports = { getIngresos, crearIngreso, getIngreso, putIngreso, deleteIngreso, getIngresosTotal }