import mysql from 'mysql';
import express from 'express';
//code legacy from tutorial https://www.asapdevelopers.com/build-a-react-native-login-app-with-node-js-backend/
//import { signup, login, isAuth } from '../controllers/auth.js';

// const patdata = {"table1": 
//                         { "name": { "john","carl", "earl"},
//                             "email": {"no@yahoo", "nope@yahoo", "maybe@gmail.com"}, 
//                             "password": {"123","123","123"}
//                         }
//                 }

//configure the mysql connection object (delete password before upload)
    var con = mysql.createConnection({
        host: '18.205.69.32',
        user: 'admin',
        password: 'M100101s',
        database: "MetroHack",
        port: 3306
    });

    // //legacy from an alternative method that utilizies connecting to the database through aws 
    //     // var RDS_HOSTNAME = '18.205.69.32';
    //     // var RDS_USERNAME= 'admin';
    //     // var RDS_PASSWORD= 'M100101s';
    //     // var RDS_PORT= 3306;


const router = express.Router();


//Connection test for application
router.get('/response/', async function (req, res) {
    
    // .connect creates a connection using the previously defined connection object 
    // and runs a function to catch errors an print err stack to console or output successful connection
    await con.connect(function(err){
        if (err){console.error('Database connection failed: ' + err.stack);
            res.send('database connection failed');
            throw err;
        }
        console.log('Connected to database.');
    });
    res.send('database connection success');
    con.destroy;
})


// Home page
router.get('/', function(req,res){
    res.json('home');
})




/*  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Funcationality routes 
    getPatient
    getDoctor
    getAudioFile
    setPatient
    setDoctor
    setAudioFile
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
//  getPatient
//  input Patient ID
//  returns Patient information in json format
router.get('/getPatient/:patientID?/', async function(req,res){
    const index = req.params.patientID;
    await con.query( "SELECT * FROM patient where user_id ="+index +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
    res.json('data');
})
//  getDoctor
//  input Doctor ID
//  returns Doctor information in json format
router.get('/getDoctor/:docID?/', async function(req,res){
    const index = req.params.docID;
    await con.query( "SELECT * FROM doctor where category_id ="+index +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
    res.json('data');
})
//  getAudioFile
//  input AudioFile ID
//  returns AudioFile information in json format
router.get('/getAudioFileLink/:LinkID?/', async function(req,res){
    const index = req.params.LinkID;
    await con.query( "SELECT * FROM pastmeeting where category_id ="+index +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
    res.json('data');
})
//  getPatient
//  input Patient ID
//  returns Patient information in json format
router.get('/setPatient/:patientID?/', async function(req,res){
    const index = req.params.patientID;
    await con.query( "SELECT * FROM patient where user_id ="+index +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
    res.json('data');
})
//  getDoctor
//  input Doctor ID
//  returns Doctor information in json format
router.get('/setDoctor/:docID?/', async function(req,res){
    const index = req.params.docID;
    await con.query( "SELECT * FROM doctor where category_id ="+index +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
    res.json('data');
})
//  getAudioFile
//  input AudioFile ID
//  returns AudioFile information in json format
router.get('/storeMeeting/:MeetingID?/:http?/:description?/', async function(req,res){
    const index = req.params.MeetingID;
    const http = req.params.http;
    const desc = req.params.description;
    var data;
    await con.query( "select * from meetings where category_id ="+index +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            data = rows;
            console.log(data.name);
        }
    });
    console.log(data);
    // await con.query( "insert into pastmeetings (name, audioFile, date, patient, description) values("+ data[0]+","+http+","+data.date+","+data.patient+","+description+");" , function (err, rows, fields)
    // {
    //     if (err) console.log(err);
    //     else
    //     {
    //         console.log('query statement ran successfully');
    //         data = Object.values(JSON.parse(JSON.stringify(rows)));
    //         console.log(data);
    //     }
    // });
    // await con.query( "delete from meetings where category_id= "+ data.category_id+";" , function (err, rows, fields)
    // {
    //     if (err) console.log(err);
    //     else
    //     {
    //         console.log('query statement ran successfully');
    //         res.json(data);
    //     }
    // });
    // res.json('data');
})






// end................................................................................................................................
// ...................................................................................................................................
// ...................................................................................................................................



// will match any other path not listed in routes
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default router;