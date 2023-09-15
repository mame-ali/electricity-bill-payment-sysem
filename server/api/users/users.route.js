import express from 'express';
import auth from '../../auth/auth.js';

import userController from './users.controler.js';
//import { upload } from '../../config/multer.js';
const usersRouter = express.Router();

usersRouter.post('/createuser', userController.createUser);
usersRouter.post('/confirmotp', userController.confirmOtp);
usersRouter.post('/login', userController.login);
usersRouter.post('/forgetpassword', userController.forgetPassword);
usersRouter.post('/changePassword', userController.changePassword);
usersRouter.get("/", auth, userController.getUserById);
usersRouter.post("/assignrole", auth, userController.updateUserRole);
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