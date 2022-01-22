

import connection, { ConnectDB } from '../DBConnection/DB.js';
import { ErrorHandler } from '../Error/error-handle.js';


// DATABASE ACCESS 
// const db = await ConnectDB();
const db = connection;



//  @Desc   : Database Creation
//  @Route  : GET/api/createDb
const createDatabase = () => {
    let sql = `CREATE DATABASE practiseDatabase`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Database Created :) ');
        console.log("Result = ", result);
    });
}


//  @Desc   : Create User Table
//  @Route  : GET/api/createUserTable
const createUserTable = (req, res) => {
    let sqlQuery = `CREATE TABLE users ( SERIAL_NO int AUTO_INCREMENT, UNIQUE_ID VARCHAR(255) NOT NULL , NAME VARCHAR(255), AGE VARCHAR(255), ROLL_NO VARCHAR(255), STANDARD VARCHAR(255) , GENDER VARCHAR(255) , ADDRESS VARCHAR(255) ,  PRIMARY KEY(SERIAL_NO) )`;
    // var response = await db.execute(sqlQuery);
    db.query(sqlQuery, (err, result) => {
        if (err) throw err;
        console.log("Result = ", result);
        res.status(200);
        res.send('User Table Created Success ');
    });
}


//  @Desc   : Add New User 
//  @Route  : GET/api/addUser
const addNewUser = async (req, res) => {
    try {
        // Unique ID generator
        // var uniq = 'id' + (new Date()).getTime();
        let val = Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);             //  .toString(16) --> means convert into hexadecimal
        let uniqueId = `UID-` + val;

        // Inserting Manually
        // let query = `INSERT INTO users SET UNIQUE_ID = ? , NAME = ? ,  AGE = ? , ROLL_NO = ? , STANDARD = ? , GENDER = ? , ADDRESS = ?`;
        // var result = await db.execute(query, [uniqueId, 'LALALAaaaa', '4', '00', 'Dev', 'Female', 'Kolkata']);


        // Inserting from the UI/Postman
        let data = req.body || {};
        let query = `INSERT INTO users SET UNIQUE_ID = ? , NAME = ? ,  AGE = ? , ROLL_NO = ? , STANDARD = ? , GENDER = ? , ADDRESS = ?`;
        var result = await db.execute(query, [
            uniqueId,
            data.name,
            data.age || ' ',
            data.roll,
            data.standard,
            data.gender,
            data.address,
            // JSON.stringify(data.tags),
            // data.image?.trim() || defaultBannerImage,
        ]);


        const ResponseData = {
            "ID": uniqueId,
            "Name": data.name,
            "Age": data.age || ' ',
            "Roll No.": data.roll,
            "Standard": data.standard,
            "Gender": data.gender,
            "Address": data.address,
        };
        // res.status(200).send('New User Added Success... ');
        if (result)
            res.status(200).json(ResponseData);
        // res.status(200).json(SuccessResponse({ user }, 'User Inserted !'));
        // else throw new CustomError('User not inserted!', 500);
    }
    catch (err) {
        console.log(err);
        // throw new ErrorHandler(500, req, res, 'User not added', err);
    }
}


//  @Desc   :  Fetch All User
//  @Route  : GET/api/allUser
const getAllUsers = async (req, res) => {
    try {
        let query = `SELECT * FROM users`;
        var [rows, fields] = await db.execute(query);
        // var result = db.execute(query, (err, result) => {
        // if (err) throw err;
        console.log(rows);
        res.status(200);
        // res.send('Fetch All Users... ');
        res.send(rows);
        // })
    }
    catch (err) {
        console.log(err);
        // throw new ErrorHandler(500, req, res, 'Error ', err);
    }
}


//  @Desc   : Get User by ID ( parameters)
//  @Route  : GET/api//userByParam/:id
const getUserById = async (req, res) => {
    try {
        // let query = `SELECT * FROM users WHERE NAME = ?`;
        // const [rows, fields] = await db.execute(query, ['Larry']);

        let query = `SELECT * FROM users WHERE SERIAL_NO = ${req.params.id}`;
        const [rows, fields] = await db.execute(query);

        console.log(rows);
        if (rows && rows.length > 0)
            console.log(rows[0]);
    }
    catch (err) {
        console.log(err);
        // throw new ErrorHandler(500, req, res, 'Error ', err);
    }
}


//  @Desc   : Update User
//  @Route  : GET/api//updateUser/:id
const updateUser = async (req, res) => {
    try {
        let modify = 'Niharika Dutta';
        console.log("req.params.id = ", req.params.id);

        // METHOD - 1
        // let query = `UPDATE users SET NAME = ?  WHERE SERIAL_NO = ? `;
        // const [rows, fields] = await db.execute(query, [modify, req.params.id]);
        // const [rows, fields] = await db.execute(query);



        // METHOD - 2
        // let query = `UPDATE users SET NAME = '${modify}' WHERE UNIQUE_ID = ${req.params.id}`;
        let data = req.body || {};
        let query = `UPDATE users SET NAME = ? ,  AGE = ? , ROLL_NO = ? , STANDARD = ? , GENDER = ? , ADDRESS = ?  WHERE SERIAL_NO = ${req.params.id}`;
        const [rows, fields] = await db.execute(query, [
            data.name,
            data.age || '',
            data.roll,
            data.standard,
            data.gender,
            data.address
        ]);

        const ResponseData = {
            "ID": req.params.id,
            "Name": data.name,
            "Age": data.age || ' ',
            "Roll No.": data.roll,
            "Standard": data.standard,
            "Gender": data.gender,
            "Address": data.address,
        };
        // res.send("Update User Successfully...");
        if (result)
            res.status(200).json(ResponseData);
    }
    catch (err) {
        console.log(err);
        // throw new ErrorHandler(500, req, res, 'Error ', err);
    }
}


//  @Desc   : Delete User
//  @Route  : GET/api/deleteUser/:id
const deleteUser = async (req, res) => {
    try {
        let query = `DELETE FROM users WHERE SERIAL_NO = ${req.params.id}`;
        await db.execute(query);
        res.send("Delete User Successfully...");
    }
    catch (err) {
        console.log(err);
        // throw new ErrorHandler(500, req, res, 'Error ', err);
    }
}



export { createDatabase, createUserTable, addNewUser, getAllUsers, getUserById, updateUser, deleteUser };