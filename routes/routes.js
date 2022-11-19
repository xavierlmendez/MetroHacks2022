import mysql from 'mysql';
import express from 'express';
//code legacy from tutorial https://www.asapdevelopers.com/build-a-react-native-login-app-with-node-js-backend/
//import { signup, login, isAuth } from '../controllers/auth.js';


//configure the mysql connection object (delete password before upload)
    var con = mysql.createConnection({
        host: '18.205.69.32',
        user: 'admin',
        password: '',
        database: "",
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
    Testing routes do it work doe??
    populateOrders
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

router.get('/populateAll/', async function (req, res) {
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
// end................................................................................................................................
// ...................................................................................................................................
// ...................................................................................................................................







/*  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    General routes We Got the GOODIES
    getOrder
    getDriver
    getRestaurant
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
//  getOrder
//  input order ID
//  returns order information in json format
router.get('/getOrder/:orderID?/', async function(req,res){
    const index = req.params.orderID;
    await con.query( "SELECT * FROM Orders where idOrders ="+index +";" , function (err, rows, fields)
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
//  getDriver
//  input driver ID
//  returns driver information in json format
router.get('/getDriver/:driverID?/', async function(req,res){
    const index = req.params.driverID;
    await con.query( "SELECT * FROM Restaurant where idDriver ="+index +";" , function (err, rows, fields)
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
//  getRestaurant
//  input Restaurant ID
//  returns Restaurant information in json format
router.get('/getRestaurant/:RestaurantID?/', async function(req,res){
    const index = req.params.index;
    await con.query( "SELECT * FROM Restaurant where idRestaurant ="+index +";" , function (err, rows, fields)
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
// end................................................................................................................................
// ...................................................................................................................................
// ...................................................................................................................................





/*  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    driver routes vroom vroom
    getDHistory
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/


// end................................................................................................................................
// ...................................................................................................................................
// ...................................................................................................................................











/*  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    restaurant routes YUmmmmm
    getRestaurantsByCoordinate
    getRHistory
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
//  getRestaurantsByCoordinate
//  input x coordinate then y coordinate in decimal degree notation then range in miles
//  returns restaurant information in json format
router.get('/getRestaurantsByCoordinate/:X?/:Y?/:range?/', async function(req,res){
    const rangeInMiles = req.params.range;
    //miles to decimal notation is 1/60 convsersion 
    const rangeRadiusInDecimalNotation = rangInMiles/60;
    const xMin = req.params.X - rangeInDecimalNotation;
    const yMin = req.params.Y - rangeInDecimalNotation;
    const xMax = req.params.X + rangeInDecimalNotation;
    const yMax = req.params.Y + rangeInDecimalNotation;
    await con.query( 
        "SELECT * FROM restaurant where xCor between "
        + xMin +"and "+xMax+
        " and yCor between "+
        + yMin +"and "+yMax+
        ";" , function (err, rows, fields)
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
//  getRHistory
//  input restaurant id 
//  returns all orders restaurant has completed
router.get('/getRHistory/:id?/', async function(req,res){
    const id = req.params.id;
    
    await con.query( 
        "SELECT * FROM Orders where restaurant = "+id+";" , function (err, rows, fields)
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
// end................................................................................................................................
// ...................................................................................................................................
// ...................................................................................................................................






/*  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Customer route hangry
    getDriver
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

// will match any other path not listed in routes
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default router;