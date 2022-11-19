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

//legacy from aws sample uses the same server.listen(port) as const server = express
//var server = http.createServer(function (req, res) {
//     if (req.method === 'POST') {
//         var body = '';

//         req.on('data', function(chunk) {
//             body += chunk;
//         });

//         req.on('end', function() {
//             if (req.url === '/') {
//                 log('Received message: ' + body);
//             } else if (req.url = '/scheduled') {
//                 log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
//             }

//             res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
//             res.end();
//         });
//     } else {
//         res.writeHead(200);
//         res.write(html);
//         res.end();
//     }
// });
