const { response } = require('express');

const Gasto = require('../models/gasto');
const Ingreso = require('../models/ingreso');

const getGastos = async (req,res) => {
    const gastos = await Gasto.find();

    res.status(200).json({
        gastos
    })
}

const getSaldo = async(req,res)=>{

    const ingresos = await Ingreso.aggregate([
        {
            $group: {
                _id: null,
                totalValor: { $sum: "$valor" }
            }
        }
    ])
    const totalIngresos = ingresos[0].totalValor;
    
    try {
        const sumTotal = await Gasto.aggregate([
            {
                $group: {
                    _id: null,
                    totalValor: { $sum: "$valor" }
                }
            }
        ]);

        if (sumTotal.length > 0) {
            const total = sumTotal[0].totalValor;
            const result = totalIngresos-total
            res.status(200).json({
                valorTotal: result
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

const getGasto = async (req,res) => {
    const { id } = req.params;

    const gasto = await Gasto.findById(id)

    if(!gasto){
        return res.status(400).json({
            msg: `El gasto ${id} no existe`
        })
    }
    res.json({
        gasto
    })
}

const crearGasto = async (req,res = response) => {

    /*
    const categoria = req.body.categoria;
    const subCategoria = req.body.subCategoria;
    const valor = req.body.valor;
    const descripcion = req.body.descripcion;
    */

    // Recibir multiples gastos

    const gastos = req.body

    const arrayGastos = await Gasto.insertMany(gastos)

    res.status(201).json({
        arrayGastos
    })

    /*
    const data = {
        categoria,
        subCategoria,
        descripcion,
        valor
    }

    const crearGasto = await new Gasto(data)

    await crearGasto.save();

    res.status(201).json(crearGasto);
    */
   res.json({
    gastos
   })
}

const putCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const nombre = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion;
    const estado = req.body.estado;

    const categoriaGasto = await Gasto.findByIdAndUpdate(
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

    const categoriaGasto = await Gasto.findByIdAndUpdate(
        id,
        { $set: {estado: "false"}}
    )

    res.json({
        categoriaGasto
    })

}

module.exports = { getGastos, getGasto, crearGasto, getSaldo }