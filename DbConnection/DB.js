
import mysql from 'mysql2';


// CREATE CONNECTION TO THE DATABASE
const ConnectDB = mysql.createConnection({
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
});


export default ConnectDB;