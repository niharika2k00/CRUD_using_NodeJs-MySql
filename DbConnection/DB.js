
import mysql from 'mysql2/promise';


// CREATE CONNECTION TO THE DATABASE
const ConnectDB = async () => {
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'niharika#28',
            database: 'practiseDatabase',
            // port: 6900,
            // multipleStatements: true, // Prevent nested sql statements
            // connectTimeout: 60 * 60 * 1000,
            // debug: true,
        });
        return db;
    }
    catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1)
    }
}

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'niharika#28',
    database: 'practiseDatabase',
});


export default connection;
export { ConnectDB };
