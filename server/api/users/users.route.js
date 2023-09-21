import express from 'express';
import auth from '../../auth/auth.js';

import userController from './users.controler.js';
//import { upload } from '../../config/multer.js';
const usersRouter = express.Router();
// usersRouter.put('/assignrole', userController.assignRole);
usersRouter.get('/users', userController.AllUser);
usersRouter.post('/insertreaddata', userController.insertReadData);
usersRouter.get('/electricmeters', userController.AllElectricMeters);
usersRouter.get('/meterread', userController.AllMetersRead);
// usersRouter.get('//users/:id', userController.deleteUser);
usersRouter.get('/bills/:user_id', userController.getUserBill);
usersRouter.post('/createuser', userController.createUser);
usersRouter.post('/confirmotp', userController.confirmOtp);
usersRouter.post('/login', userController.login);
usersRouter.post('/forgetpassword', userController.forgetPassword);
usersRouter.post('/changePassword', userController.changePassword);
usersRouter.get("/", auth, userController.getUserById);
usersRouter.put("/assignrole", userController.updateUserRole);
usersRouter.post("/addelectricmeter", userController.addElectricMeter);
usersRouter.put("/updateElectricMeter", userController.updateElectricMeter);
usersRouter.put("/updateElectricMeterAddress", userController.updateElectricMeterAddress);
usersRouter.delete("/deleteElectricMeter/:id", userController.deleteElectricMeter);

//usersRouter.get("/", auth, userController.getUserById);
// usersRouter.post('/createuser', userController.createUser)
// usersRouter.post('/login', userController.login)
// usersRouter.post('/userinfo',auth, userController.getUserById)
// usersRouter.post('/profilepicture', userController.profilepicture)


export default usersRouter;