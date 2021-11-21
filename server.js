
import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
// import ConnectDB from './config/DB.js';
// import Choco_routes from './Routes/Choco_routes.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
// ConnectDB();


// app.get(endpoint, callback)
app.get('/', (req, res) => {
    res.send('get success !')
})


// CREATE CONNECTION TO THE DATABASE
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'niharika#28',
    database: 'practiseDatabase',
    // port: 6900,
    // multipleStatements: true, // Prevent nested sql statements
    // connectTimeout: 60 * 60 * 1000,
    // debug: true,
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Database connected successfully ...");
})


// CREATE DB
app.get('/createDb', (req, res) => {
    let sql = 'CREATE DATABASE practiseDatabase';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Database Created :) ');
        console.log("Result = ", result);
    });
});


// CREATE TABLE IF NOT EXISTS
app.get('/createUsersTable', (req, res) => {
    let aa = 'CREATE TABLE Users ( id int AUTO_INCREMENT, name VARCHAR(255), title VARCHAR(255), PRIMARY KEY(id) )';
    // var response = await db.execute(query);
    db.query(aa, (err, result) => {
        if (err) throw err;
        console.log("Result = ", result);
        res.status(200);
        res.send('User Table Created Success ');
    });
});


// INSERT DATA ---- POST REQUEST 
app.get('/addpost', (req, res) => {
    let post = { name: 'niharika', title: 'post 1 created' };
    let aa = 'INSERT INTO Users SET ?';
    let query = db.query(aa, post, (err, result) => {
        if (err) throw err;
        console.log("Result = ", result);
        res.status(200);
        res.send('added ');
    });
})

app.get('/createUsersTable22', async (req, res) => {
    let query = 'create table Userss ( ID INT AUTO_INCREMENT not null, NAME varchar(50) , EMAIL varchar(50) ,DOB datetime , GENDER varchar(50) , ADDRESS longtext  )';
    var result = await db.execute(query);
    if (!result)
        throw new ErrorHandler(500, req, res, 'Users Table Not Created Success', err);
});

// SYNTAX: app.use(path, callback)
// app.use('/choco', Choco_routes);


// listen() function ---->  used to bind and listen the connections on the specified host and port
// app.listen(port, () => console.log(`Server Connected in ${port} for ${process.env.NODE_ENV}`));

app.listen(port, function () {
    console.log(`App listening at http://localhost:${port}`);
    console.log(process.env.PORT);
})
