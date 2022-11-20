/*
    to start server use scripts
        set up the dependencies:

            npm install
            npm install body-parser cors express helmet morgan mysql sequelize node-fetch

        run server:

            npm start

*/


import express from 'express';
// import router 
import router from './routes/routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Sequelize } from 'sequelize';


import http from "http";
import fs from 'fs';
var port = process.env.PORT || 3000;

//         html = fs.readFileSync('index.html');

// var log = function(entry) {
//     fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
// };


const server = express();

// .use() from express() is meant to mount a specified middleware function (these have access to the request and responce object) 
server.use(express.json());
server.use(router);
// .get()  tells the server what to do when get requests at a given route
//these will be in the routes.js file



// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');

