
import express from 'express';
const router = express.Router();
import { createDatabase, createUserTable, addNewUser, getAllUsers, getUserById, updateUser, deleteUser } from '../Controllers/user-controller.js';


router.get('/createDb', createDatabase);
router.get('/createUserTable', createUserTable);
router.get('/new', addNewUser);
router.get('/all', getAllUsers);
router.get('/update/:id', updateUser);
router.get('/delete/:id', deleteUser);
router.get('/:id', getUserById); // applicable for id as well as other params 


export default router;
