
import express from 'express';
const router = express.Router();
import { CreateDatabase, CreateUserTable, AddNewUser } from '../Controllers/user-controller.js';


router.get('/createDb', CreateDatabase);
router.get('/createUserTable', CreateUserTable);
router.get('/addUser', AddNewUser);


export default router;
