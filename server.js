
import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB, getDb } from './DBConnection/DB.js';
import userRoutes from './Routes/user-routes.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
// ConnectDB();

// app.get(endpoint, callback)
app.get('/', (req, res) => {
    res.send('get success !')
})

// const db = ConnectDB();
const db = getDb();
// console.log("db = ", db);

// CREATE DB
// app.get('/createDb', (req, res) => {
//     let sql = 'CREATE DATABASE practiseDatabase';
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send('Database Created :) ');
//         console.log("Result = ", result);
//     });
// });


// INSERT DATA ---- POST REQUEST 
/* app.get('/addpost', (req, res) => {
    let post = { name: 'niharika', title: 'post 1 created' };
    let aa = 'INSERT INTO Users SET ?';
    let query = db.query(aa, post, (err, result) => {
        if (err) throw err;
        console.log("Result = ", result);
        res.status(200);
        res.send('added ');
    });
}) */



// SYNTAX: app.use(path, callback)
app.use('/api', userRoutes);


// listen() function ---->  used to bind and listen the connections on the specified host and port
app.listen(port, function () {
    console.log(`App listening at http://localhost:${port} for ${process.env.NODE_ENV}`);
    console.log(process.env.PORT);
})
