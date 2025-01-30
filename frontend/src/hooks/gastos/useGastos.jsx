import { useState, useEffect } from 'react';

import { fetchGastos, createGasto, editGasto, deleteGasto, fetchCategoriaGasto, fetchSubCategoriaGasto } from '../../services/gastos/gastosService';

// Hook para obtener los gastos

const useGastos = () => {
    const [ gastos, setGastos ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    // Estados busqueda categorias gasto
    const [ filteredCategoriasGasto, setfilteredCategoriasGasto ] = useState([]);
    
    // Estados busqueda Subcategorias gasto
    const [ filteredSubCategoriasGasto, setfilteredSubCategoriasGasto ] = useState([]);

    const obtenerAnioYmesActual = () => {

        const currentDate = new Date();
    
        const anio = currentDate.getFullYear();
        const mes = currentDate.getMonth() + 1;
        
        return {anio, mes}
      }

    // Recibir paginacion, el anio y mes
    const [ paginacion, setPaginacion ] = useState(0)
    const [ anio, setAnio ] = useState(obtenerAnioYmesActual().anio)
    const [ mes, setMes ] = useState(obtenerAnioYmesActual().mes)

    useEffect(()=>{
        const loadGastos = async () => {
            try {
                const data = await fetchGastos(paginacion,mes,anio); 
                // El estado de gasto va a ser el ingreso al objeto data y al obj gastos
                setGastos(data.gastos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadGastos();
    }, [ gastos, paginacion, anio, mes ]);

    const agregarGasto = async (gasto) => {
        const { subCategoriaDetalles, descripcion, valor } = gasto

        // Creamos obj para almacenar el gasto

        const newObject = {
            categoria : subCategoriaDetalles.categoriaDetalles._id,
            subCategoria: subCategoriaDetalles._id,
            descripcion,
            valor
        }
        
        setLoading(true);
        
        try {
            const newGasto = await createGasto(newObject);
            setGastos((prevGastos) => [...prevGastos, newGasto]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // Editar Gasto

    const editarGasto = async (gasto) => {
        const { _id, subCategoriaDetalles, descripcion, valor } = gasto
        // Creamos obj para almacenar el gasto
        const newObject = {
            id : _id,
            categoria : subCategoriaDetalles.categoriaDetalles._id,
            subCategoria: subCategoriaDetalles._id,
            descripcion,
            valor
        }
        
        setLoading(true);
        
        try {
            const newGasto = await editGasto(newObject);
            setGastos((prevGastos) => [...prevGastos, newGasto]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // Eliminar

    const eliminarGasto = async (gasto) => {
        setLoading(true);
        
        try {
            const borrarGasto = await deleteGasto(gasto);
            setGastos((prevGastos) => [...prevGastos, borrarGasto]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    const filtarCategoriaGasto = async (searchTerm) => {
        try {
            const data = await fetchCategoriaGasto(searchTerm)
            setfilteredCategoriasGasto(data.categoriasGasto)
        } catch (error) {
            setError(error.message)
        }

    }

    // Filtro de subcategorias

    const filtarSubCategoriaGasto = async (searchTerm) => {
        try {
            const data = await fetchSubCategoriaGasto(searchTerm)
            setfilteredSubCategoriasGasto(data.subCategoriasGasto)
        } catch (error) {
            setError(error.message)
        }

    }

    return { gastos, loading, error, agregarGasto, editarGasto, 
        filtarCategoriaGasto, filteredCategoriasGasto, 
        setfilteredCategoriasGasto, filtarSubCategoriaGasto, 
        filteredSubCategoriasGasto, setfilteredSubCategoriasGasto, 
        eliminarGasto, paginacion, setPaginacion, mes, setMes, anio, setAnio };
}

export default useGastos;