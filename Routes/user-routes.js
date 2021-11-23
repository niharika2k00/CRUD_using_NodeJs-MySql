
import express from 'express';
const router = express.Router();
import { CreateDatabase, CreateUserTable, AddNewUser } from '../Controllers/user-controller.js';


router.get('/createDb', CreateDatabase);
router.get('/createUserTable', CreateUserTable);
router.get('/addUser', AddNewUser);
// router.post('/logout', auth, userController.logoutUser);
// router.post('/edit', upload.single('image'), userController.editUser);
// router.post('/getExam', userController.getExam);
// router.post('/registerInExam', userController.registerInExam);

export default router;
