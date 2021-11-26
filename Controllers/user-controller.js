

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
        let val = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);             //  .toString(16) --> means convert into hexadecimal
        let uniqueId = `UID-` + val;

        let query = `INSERT INTO users SET UNIQUE_ID = ? , NAME = ? ,  AGE = ? , ROLL_NO = ? , STANDARD = ? , GENDER = ? , ADDRESS = ?`;
        var result = await db.execute(query, [uniqueId, 'Marry', '21', '32', '3rd Year', 'Female', 'Kolkata']);
        // console.log(result);
        res.status(200);
        res.send('New User Added Success... ');
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
        res.send('Fetch All Users... ');
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
        let modify = 'Harry';
        console.log("req.params.id = ", req.params.id);
        // let query = `UPDATE users SET NAME = ?  WHERE SERIAL_NO = ? `;
        // const [rows, fields] = await db.execute(query, [modify, req.params.id]);

        let query = `UPDATE users SET NAME = '${modify}' WHERE SERIAL_NO = ${req.params.id}`;
        const [rows, fields] = await db.execute(query);
        console.log("Updated user success...");
        res.send("Update User Successfully...");
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