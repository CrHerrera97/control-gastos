const express = require('express'); 

const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.apiPaths = {
            ingresos : '/api/ingresos',
            categoriasIngresos : '/api/categorias-ingresos',
            gastos : '/api/gastos',
            categoriaGastos : '/api/categoria-gastos',
            subCategoriaGastos : '/api/sub-categoria-gastos'
        }

        // Connect Db
        this.conectarDb();
        this.middlewares();
        this.routes();
    }

    async conectarDb(){
        await dbConnection();
    }

    middlewares(){
        // Cors
        this.app.use(cors());

        // Lectura body
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        })
    }

    routes(){
        this.app.use(this.apiPaths.ingresos, require('../routes/ingresos'));
        this.app.use(this.apiPaths.categoriasIngresos, require('../routes/categoriaIngresos'));
        this.app.use(this.apiPaths.gastos, require('../routes/gastos'));
        this.app.use(this.apiPaths.categoriaGastos, require('../routes/categoriaGastos'));
        this.app.use(this.apiPaths.subCategoriaGastos, require('../routes/subCategoriaGastos'));
    }
}

module.exports = Server;