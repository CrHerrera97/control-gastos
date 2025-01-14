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

// aqui van como los reportes de los gastos

const obtenerGastoPorCategoria = async (req, res = response) => {
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

        res.json(reporte);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "Error al obtener el reporte por categoría" });
    }
};


const obtenerGastoPorSubCategoria = async (req, res) => {
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
            { $unwind: "$subcategoriaDetalles" }
        ])
        res.json(reporte);
    } catch (error) {
        
    }
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

module.exports = { getGastos, getGasto, crearGasto, getSaldo, obtenerGastoPorCategoria, obtenerGastoPorSubCategoria }