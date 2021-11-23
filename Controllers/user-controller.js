
import { ConnectDB, getDb } from '../DBConnection/DB.js';
import mysql from 'mysql2';
import express from 'express';


const db = getDb();
console.log("user controller");

const CreateDatabase = () => {
    let sql = 'CREATE DATABASE practiseDatabase';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Database Created :) ');
        console.log("Result = ", result);
    });
}


const CreateUserTable = () => {
    console.log("user controller");
    let aa = 'CREATE TABLE Users ( id int AUTO_INCREMENT, name VARCHAR(255), title VARCHAR(255), PRIMARY KEY(id) )';
    // var response = await db.execute(query);
    db.query(aa, (err, result) => {
        if (err) throw err;
        console.log("Result = ", result);
        res.status(200);
        res.send('User Table Created Success ');
    });
}


const AddNewUser = async (req, res) => {
    try {
        // let query = 'INSERT INTO Users SET `name`=? , `title`=? ';
        let query = 'INSERT INTO Users SET  name = ? ,  title = ? ';
        var result = await db.execute(query, ['motaBhai', '23/11 created']);
        // if (!result)
        // throw new ErrorHandler(500, req, res, 'Users Table Not Created Success', err);

        console.log(result);
        res.status(200);
        res.send('New User Added Success... ');
    }
    catch (err) {
        console.log(err);
    }
}


export { CreateDatabase, CreateUserTable, AddNewUser, };