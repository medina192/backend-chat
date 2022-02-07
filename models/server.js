
const express  = require('express');
const http    = require('http');
const path    = require('path');
const cors    = require('cors');
const socketio = require('socket.io');
const { dbConnection } = require('../database/config');

const Socket = require('./sockets');

// in postman you must set in headers
// Content-Type: application/json

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.server = http.createServer(this.app);

        dbConnection();

        this.io = socketio( this.server, { /* configuraciones */ } );
    }

    middlewares(){
        this.app.use( express.static( path.resolve( __dirname, '../public') ) );

        this.app.use( cors() );
        /*
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        */
        this.app.use( express.json() );
        
        this.app.use( '/api/auth', require('../routes/auth') );
        this.app.use( '/api/messages', require('../routes/messages') );

        this.app.get('*', (req, res) => {
            res.sendFile( path.resolve( __dirname, '../public/index.html' ) );
        });
    }

    configureSockets(){
        new Socket( this.io );
    }

    execute(){
        this.middlewares();

        this.configureSockets();

        this.server.listen( this.port, ()=> {
            console.log('server running on port ', this.port);
        });
    }
}

module.exports = Server;