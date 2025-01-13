const express = require('express'); 

const cors = require('cors')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.apiPaths = {
            ingresos : '/api/ingresos',
        }
        this.middlewares();
        this.routes();
    }

    middlewares(){
        // Cours
        this.app.use(cors());

        // Lectura body

        this.app.use(express.json())
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        })
    }

    routes(){
        this.app.use(this.apiPaths.ingresos, require('../routes/ingresos'));
    }
}

module.exports = Server;