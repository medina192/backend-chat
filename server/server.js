
const express  = require('express');
const http    = require('http');
const path    = require('path');
const cors    = require('cors');


class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.server = http.createServer(this.app);
    }

    middlewares(){
        this.app.use( express.static( path.resolve( __dirname, '../public') ) );
    }

    execute(){
        this.middlewares();

        this.server.listen( this.port, ()=> {
            console.log('server running on port ', this.port);
        });
    }
}

module.exports = Server;