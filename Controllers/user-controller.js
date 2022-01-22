
import connection, { ConnectDB } from "../DBConnection/DB.js";
import { ErrorHandler, SuccessHandler } from "../response-handler/response-handle.js";
import { v4 as uuid } from "uuid";

// DATABASE ACCESS
// const db = await ConnectDB();
const db = connection;


//  @Desc   : Database Creation
//  @Route  : GET/api/createDb
const createDatabase = () => {
    let sql = `CREATE DATABASE practiseDatabase`;
    db.query(sql, (err, result) => {
        console.log("Result = ", result);
        res.status(200).json(SuccessHandler(ResponseData, 'Database Created :)'));
        if (err) throw err;
    });
};


//  @Desc   : Create User Table
//  @Route  : GET/api/createUserTable
const createUserTable = (req, res) => {
    let sqlQuery = `CREATE TABLE users ( SERIAL_NO int AUTO_INCREMENT, UNIQUE_ID VARCHAR(255) NOT NULL , NAME VARCHAR(255), AGE VARCHAR(255), ROLL_NO VARCHAR(255), STANDARD VARCHAR(255) , GENDER VARCHAR(255) , ADDRESS VARCHAR(255) ,  PRIMARY KEY(SERIAL_NO) )`;
    // var response = await db.execute(sqlQuery);
    db.query(sqlQuery, (err, result) => {
        if (err) throw err;
        console.log("Result = ", result);
        res.status(200).json(SuccessHandler(ResponseData, 'User Table Created Success :)'));
    });
};


//  @Desc   : Add New User
//  @Route  : GET/api/user/new
const addNewUser = async (req, res) => {
    try {
        // Unique ID generator
        // var uniq = 'id' + (new Date()).getTime();
        let val = Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1); //  .toString(16) --> means convert into hexadecimal
        let uniqueId = `UID-` + val;
        let ID = uuid();

        // Inserting Manually
        // let query = `INSERT INTO users SET UNIQUE_ID = ? , NAME = ? ,  AGE = ? , ROLL_NO = ? , STANDARD = ? , GENDER = ? , ADDRESS = ?`;
        // var result = await db.execute(query, [uniqueId, 'LALALAaaaa', '4', '00', 'Dev', 'Female', 'Kolkata']);

        // Inserting from the UI/Postman
        let data = req.body || {};

        // Throws Error
        if (data.name.length > 0 && data.age.length > 0 && data.roll.length > 0 && data.gender.length > 0 && data.address.length > 0)
            throw new Error("Missing fields");


        let query = `INSERT INTO users SET UNIQUE_ID = ? , NAME = ? ,  AGE = ? , ROLL_NO = ? , STANDARD = ? , GENDER = ? , ADDRESS = ?`;
        var result = await db.execute(query, [
            ID,
            data.name,
            data.age || " ",
            data.roll,
            data.standard,
            data.gender,
            data.address,
            // JSON.stringify(data.tags),
            // data.image?.trim() || defaultBannerImage,
        ]);

        const ResponseData = {
            ID: ID,
            Name: data.name,
            Age: data.age || " ",
            "Roll No.": data.roll,
            Standard: data.standard,
            Gender: data.gender,
            Address: data.address,
        };

        if (result)
            res.status(200).json(SuccessHandler(ResponseData, 'User Inserted Successfully!'));
    }
    catch (err) {
        console.log(err);
        res.status(500).send(ErrorHandler(500, req, res, 'User Not Inserted!'));
    }
};


//  @Desc   :  Fetch All User
//  @Route  : GET/api/user/all
const getAllUsers = async (req, res) => {
    try {
        let query = `SELECT * FROM users`;
        var [rows, fields] = await db.execute(query);
        /*  var result = db.execute(query, (err, result) => {
         if (err) throw err;
         res.send('Fetch All Users... ');
         }) */
        console.log(rows);
        if (result)
            res.status(200).json(SuccessHandler(rows, 'All User Fetched!'));

    } catch (err) {
        console.log(err);
        throw new ErrorHandler(500, req, res, 'User Not Inserted!')
    }
};


//  @Desc   : Get User by ID ( parameters)
//  @Route  : GET/api//userByParam/:id
const getUserById = async (req, res) => {
    try {
        // let query = `SELECT * FROM users WHERE NAME = ?`;
        // const [rows, fields] = await db.execute(query, ['Larry']);

        let query = `SELECT * FROM users WHERE SERIAL_NO = ${req.params.id}`;
        const [rows, fields] = await db.execute(query);

        console.log(rows);
        if (rows && rows.length > 0) console.log(rows[0]);
    } catch (err) {
        console.log(err);
        // throw new ErrorHandler(500, req, res, 'Error ', err);
    }
};


//  @Desc   : Update User
//  @Route  : GET/api/user/update/:id
const updateUser = async (req, res) => {
    try {
        console.log("req.params.id = ", req.params.id);
        const { name, age, roll, standard, gender, address } = req.body; //  Destructure

        // METHOD - 1
        //   let modify = "Niharika Dutta";
        // let query = `UPDATE users SET NAME = ?  WHERE SERIAL_NO = ?`;
        // const [rows, fields] = await db.execute(query, [modify, req.params.id]);


        // METHOD - 2
        // let query = `UPDATE users SET NAME = '${modify}' WHERE UNIQUE_ID = ${req.params.id}`;
        if (name.length > 0 && age.length > 0 && roll.length > 0 && gender.length > 0 && address.length > 0)
            throw new Error("Missing fields");

        let query = `UPDATE users SET NAME = ? ,  AGE = ? , ROLL_NO = ? , STANDARD = ? , GENDER = ? , ADDRESS = ?  WHERE UNIQUE_ID = ?`;
        const [result, fields] = await db.execute(query, [
            req.params.id,
            name,
            age || "",
            roll,
            standard,
            gender,
            address,
        ]);

        const ResponseData = {
            ID: req.params.id,
            Name: name,
            Age: age || " ",
            "Roll No.": roll,
            Standard: standard,
            Gender: gender,
            Address: address,
        };
        if (result)
            res.status(200).json(SuccessHandler(ResponseData, 'User Updated Successfully!'));
    }
    catch (err) {
        console.log(err);
        res.status(500).send(ErrorHandler(500, req, res, 'User Not Updated!'));
    }
};


//  @Desc   : Delete User
//  @Route  : GET/api/user/delete/:id
const deleteUser = async (req, res) => {
    try {
        let query = `DELETE FROM users WHERE UNIQUE_ID = "${req.params.id}"`;
        await db.execute(query);

        if (!req.params.id)
            throw new Error("Missing ID");

        res.status(200).json(SuccessHandler(null, 'User Deleted Successfully!'));
    }
    catch (err) {
        console.log(err);
        res.status(500).send(ErrorHandler(500, req, res, 'User Not Deleted!'));
    }
};


export { createDatabase, createUserTable, addNewUser, getAllUsers, getUserById, updateUser, deleteUser, };
