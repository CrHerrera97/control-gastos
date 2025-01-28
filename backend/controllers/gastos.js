const { response } = require('express');

const Gasto = require('../models/gasto');
const Ingreso = require('../models/ingreso');

const obtenerGastos = async (req, res) => {

    // convertimos el string a booleano
    const estado = req.query.estado === 'true';

    const gastos = await Gasto.aggregate([
        {
            $match: { estado }
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
            $lookup: {
                from: "subcategoriagastos",
                localField: "subCategoria",
                foreignField: "_id",
                as: "subCategoriaDetalles"
            }
        },
        { $unwind: "$subCategoriaDetalles" },
        {
            $project: {
                _id: 1,
                valor: 1,
                descripcion: 1,
                "categoriaDetalles._id": 1,
                "categoriaDetalles.nombre": 1,
                "subCategoriaDetalles._id": 1,
                "subCategoriaDetalles.nombre": 1
            }
        }
    ]);

    res.status(200).json({
        gastos
    });
}

const obtenerGasto = async (req,res) => {
    const { id } = req.params;

    const gasto = await Gasto.findById(id)

    if(!gasto){
        return res.status(400).json({
            msg: `El gasto ${ id } no existe`
        })
    }
    res.status(200).json({
        gasto
    })
}

const editarGasto = async (req,res) => {

    const { id } = req.params;

    const categoria = req.body.categoria;
    const subCategoria = req.body.subCategoria;
    const descripcion = req.body.descripcion;
    const valor = req.body.valor;

    const actualizarGasto = await Gasto.findByIdAndUpdate(
        id,
        { $set: { categoria, subCategoria, descripcion, valor }}
    )

    res.status(200).json(actualizarGasto)
}

const obtenerSaldo = async(req,res)=>{

    // Obtenemos todos los ingresos
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
        // Obtener todos los gastos
        const sumTotal = await Gasto.aggregate([
            {
                $match: { estado: true }
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
            // Calculamos saldo
            const saldo = totalIngresos-total
            res.status(200).json({
                valorTotal: saldo
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

const crearGasto = async (req,res = response) => {

    // Recibir multiples gastos

    const gastos = req.body

    const arrayGastos = await Gasto.insertMany(gastos)

    res.status(201).json({
        arrayGastos
    })
}

const editarCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const nombre = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion;
    const estado = req.body.estado;

    const categoriaGasto = await Gasto.findByIdAndUpdate(
        id,
        { $set: { nombre, descripcion, estado }}
    )

    res.status(200).json({
        categoriaGasto
    })
}

const borrarCategoriaGasto = async (req,res) => {
    const { id } = req.params;

    const categoriaGasto = await Gasto.findByIdAndUpdate(
        id,
        { $set: { estado : "false" } }
    )

    res.status(200).json({
        categoriaGasto
    })
}

// Aqui van como los reportes de los gastos

const obtenerGastosPorCategoria = async (req, res = response) => {

    const { mes, año } = req.query;
    try {
        const mesInt = parseInt(mes, 10);
        const añoInt = parseInt(año, 10);

        if (isNaN(mesInt) || isNaN(añoInt)) {
            return res.status(400).json({ msg: "Mes o año no válidos" });
        }

        // Generar las fechas, ajustando el mes (restar 1 ya que el mes en JavaScript va de 0 a 11)
        const fechaInicio = new Date(añoInt, mesInt - 1, 1); // Primer día del mes
        const fechaFin = new Date(añoInt, mesInt, 0); // Último día del mes

        // Ejecutar la agregación
        const reporte = await Gasto.aggregate([
            {
                $match: {
                    creadoEn: {
                        $gte: fechaInicio,  
                        $lt: fechaFin     
                    }
                }
            },
            {
                $group: {
                    _id: "$categoria",  // Agrupar por categoría
                    totalGastos: { $sum: "$valor" },  // Sumar los valores
                    cantidad: { $sum: 1 }  // Contar el número de gastos
                }
            },
            {
                $lookup: {
                    from: "categoriagastos", 
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoriaDetalles"
                }
            },
            {
                $unwind: "$categoriaDetalles"  
            }
        ]);

        if (!reporte.length) {
            console.log("No se encontraron gastos para este mes y año.");
        }

        res.status(200).json(reporte);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "Error al obtener el reporte por categoría" });
    }
};

const obtenerGastosPorSubCategoria = async (req, res) => {

    const { mes, año } = req.query;
    try {

        const mesInt = parseInt(mes, 10);
        const añoInt = parseInt(año, 10);

        if (isNaN(mesInt) || isNaN(añoInt)) {
            return res.status(400).json({ msg: "Mes o año no válidos" });
        }
        const fechaInicio = new Date(añoInt, mesInt - 1, 1); // Primer día del mes
        const fechaFin = new Date(añoInt, mesInt, 0);
        
        const reporte = await Gasto.aggregate([
            {
                $match: {
                    creadoEn: {
                        $gte: fechaInicio,  
                        $lte: fechaFin     
                    }
                }
            },
            {
                $group: {
                    _id: "$subCategoria", 
                    totalGastos: { $sum: "$valor" },
                    cantidad: { $sum: 1}
                }
            },
            {
                $lookup: {
                    from: "subcategoriagastos", 
                    localField: "_id",
                    foreignField: "_id",
                    as: "subcategoriaDetalles"
                }
            },
            { $unwind: "$subcategoriaDetalles" },
            {
                $lookup: {
                    from: "categoriagastos",
                    localField: "subcategoriaDetalles.categoria",
                    foreignField: "_id",
                    as: "categoriaDetalles"
                }
            },
            { $unwind: "$categoriaDetalles" },
            {
                $project: {
                    _id: 1,
                    totalGastos: 1,
                    cantidad : 1,
                    "subcategoriaDetalles.nombre": 1,
                    "categoriaDetalles.nombre": 1
                }
            }
        ])

        res.status(200).json(reporte);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "Error al obtener el reporte por Sub categoría" });
    }
}

module.exports = { obtenerGastos, obtenerGasto, obtenerSaldo, crearGasto, editarGasto, editarCategoriaGasto, borrarCategoriaGasto, obtenerGastosPorCategoria, obtenerGastosPorSubCategoria }