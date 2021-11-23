
import mysql from 'mysql2';


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

        // console.log("MySQL Database connected successfully ...");
        /*   db.connect(err => {
              if (err) {
                  // throw err;
                  console.error('error connecting: ' + err.stack);
                  return;
              };
              console.log("MySQL Database connected successfully ...");
              return db;
          }); */
    }

    catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1)
    }
}

const getDb = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'niharika#28',
        database: 'practiseDatabase',
    });

    // connection.connect(err => {
    //     if (err) {
    //         // throw err;
    //         console.error('error connecting: ' + err.stack);
    //         return;
    //     };
    //     console.log("MySQL Database connected successfully ...");
    //     return connection;
    // });

    if (connection)
        return connection;
    else
        console.log("NOT Connected");
}


export { ConnectDB, getDb };
