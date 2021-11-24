
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './Routes/user-routes.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

// app.get(endpoint, callback)
app.get('/', (req, res) => {
    res.send('get success !')
})

// INSERT DATA ---- POST REQUEST 
/* app.get('/addpost', (req, res) => {
    let post = { name: 'niharika', title: 'post 1 created' };
    let sqlCommand = 'INSERT INTO Users SET ?';
    let query = db.query(sqlCommand, post, (err, result) => {
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
