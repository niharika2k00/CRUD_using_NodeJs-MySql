
import express from 'express';
const router = express.Router();
import { createDatabase, createUserTable, addNewUser, getAllUsers, getUserById, updateUser, deleteUser } from '../Controllers/user-controller.js';


router.get('/createDb', createDatabase);
router.get('/createUserTable', createUserTable);
router.get('/addUser', addNewUser);
router.get('/allUser', getAllUsers);
router.get('/userByParam/:id', getUserById);
router.get('/updateUser/:id', updateUser);
router.get('/deleteUser/:id', deleteUser);


export default router;
