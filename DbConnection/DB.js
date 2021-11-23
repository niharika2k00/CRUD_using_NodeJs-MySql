
import mysql from 'mysql2';


// CREATE CONNECTION TO THE DATABASE
let db = null;
const ConnectDB = async () => {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'niharika#28',
            database: 'practiseDatabase',
            // port: 6900,
            // multipleStatements: true, // Prevent nested sql statements
            // connectTimeout: 60 * 60 * 1000,
            // debug: true,
        });

        console.log("MySQL Database connected successfully ...");
        // db.connect(err => {
        //     if (err) throw err;
        //     console.log("MySQL Database connected successfully ...");
        // });
    }

    catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1)
    }
}


const getDb = () => {
    console.log("db = ", db);

    return db;
}



export default db;
export { ConnectDB, getDb };
