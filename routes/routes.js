import mysql from 'mysql';
import express from 'express';
import AWS from 'aws-sdk';
//code legacy from tutorial https://www.asapdevelopers.com/build-a-react-native-login-app-with-node-js-backend/
//import { signup, login, isAuth } from '../controllers/auth.js';
var comprehendmedical = new AWS.ComprehendMedical({
    comprehendmedical: 2018-10-30,
    region: 'us-east-1'
})

//configure the mysql connection object (delete password before upload)
    var con = mysql.createConnection({
        host: '18.205.69.32',
        user: 'admin',
        password: '',
        database: "MetroHack",
        port: 3306
    });

    // //legacy from an alternative method that utilizies connecting to the database through aws 
    //     // var RDS_HOSTNAME = '18.205.69.32';
    //     // var RDS_USERNAME= 'admin';
    //     // var RDS_PASSWORD= 'M100101s';
    //     // var RDS_PORT= 3306;


const router = express.Router();
async function getDetails(text){
    var params = {
        Text: text
    };

var data = await comprehendmedical.detectEntitiesV2(params).promise();
console.log(data);
var diseases = [];
for(let entity of data["Entities"]){
    if(entity["Category"] === "MEDICAL_CONDITION"){
        diseases.push(entity["Text"]);
    }
}
console.log(diseases);
return ("Identitfied diseases are: "+ diseases.join(", "));
}

router.post('/textFile/', async function ( req, res){
    var text = req.body.text;
    var id = req.body.id;
    var diseases = getDetails(text);
    console.log(diseases);
    res.send(diseases);

    //     await con.query( "insert into pastmeetings set found = "+diseases+" where  category_id = "+id+";" , function (err, rows, fields)
    //     {
    //         if (err) console.log(err);
    //             else
    //         {
    //         console.log('query statement ran successfully');
    //         let data = Object.values(JSON.parse(JSON.stringify(rows)));
    //         res.json(data);
    //         }
    // });
        }
    )
//Connection test for application
router.get('/response/', async function (req, res) {[]
    
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
})


// Home page
router.get('/', function(req,res){
    res.json('home');
})




/*  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Funcationality routes 
    getDescription
    getPatient
    getDoctor
    getAudioFile
    setAudioFile
    setPatient
    setDoctor
    storeMeeting
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
//  getDescription
//  input meeting ID
//  returns the transcript of the meeting
router.get('/getDescription/:meetingID?/', async function(req,res){
    const index = req.params.meetingID;
    await con.query( "SELECT * FROM pastmeetings where  category_id = "+index +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  getFile
//  input meeting ID
//  returns the transcript of the meeting
router.get('/getFile/:pastMeetingID?/', async function(req,res){
    const index = req.params.meetingID;
    await con.query( "SELECT audioFile FROM pastmeetings where  category_id = "+index +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  getPatient
//  input patient ID
//  returns the patient profile
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
})
//  getAudioFile
//  input AudioFile ID
//  returns AudioFile information in json format
router.get('/getAudioFileLink/:LinkID?/', async function(req,res){
    const index = req.params.LinkID;
    await con.query( "SELECT audioFile FROM pastmeeting where category_id ="+index +";" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  setPatient
//  input Patient name, email, password
//  creates a patient object in the patient database
router.get('/setPatient/:patientName?/:email?/:password?/', async function(req,res){
    const name = req.params.patientName;
    const email = req.params.email;
    const pwd = req.params.password;

    await con.query( "insert into patient (username, email, password) values("+ name+","+email +","+ pwd+");" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})
//  setDoctor
//  input Doctor ID
//  sets doctor file
router.get('/setDoctor/:docName?/:json?/', async function(req,res){
    const name = req.params.docName;
    const info = req.params.json;

    await con.query( "insert into doctor (name, doctorInfo) values();" , function (err, rows, fields)
    {
        if (err) console.log(err);
        else
        {
            console.log('query statement ran successfully');
            let data = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(data);
        }
    });
})

//setPastMeeting
//input name audioFile date patient description
//return success




//storeAudioFile
//input pastmeeting id
router.get('/storeMeeting/:MeetingID?/:http?/', async function(req,res){
    const index = req.params.MeetingID;
    const http = req.params.http;
    var data;
    await con.query( "update pastmeetings set audioFile ="+http +" where category_id ="+ MeetingID+";" , function (err, rows, fields)
    {
        if (err) {
            console.log(err);
            data = 'sqlFail';
        }
        else
        {
            console.log('query statement ran successfully');
            data = Object.values(JSON.parse(JSON.stringify(rows)));
            console.log(data);
        }
        res.send(data);
    });
})

//  storeMeeting
//  input Meeting id from object in meetings table, http to audio file, description
//  creating pastmeetings object from the meetings object with the http and description
router.get('/storeMeeting/:name?/:http?/:date?/:patient?/:description?/', async function(req,res){
    const name = req.params.name;
    const http = req.params.http;
    const date = req.params.date;
    const patient = req.params.patient;
    const desc = req.params.description;
    var data;
    await con.query( "insert into pastmeetings (name, audioFile, date, patient, description) values("+name+","+http+","+date +","+patient+","+desc+");" , function (err, rows, fields)
    {
        if (err) {console.log(err); data = "sqlFailed";}
        else
        {
            console.log('query statement ran successfully');
            data = Object.values(JSON.parse(JSON.stringify(rows)));
            console.log(data);
        }
        res.send(data);
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
