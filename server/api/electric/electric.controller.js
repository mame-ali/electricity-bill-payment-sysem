import electricService from "./electric.service.js";
//Importing bcryptJs module to use password encryption
import bcrypt from "bcryptjs";
//Importing database structure
import { connection } from "../../config/db.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
//import { upload } from '../../config/multer.js';
import dotenv from "dotenv";
dotenv.config();
let verify_data;

const electricController = {
    // insert read data
    createReadData: (req, res) => {
        electricService.addReadData(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: "database connection err" });
            }
            return res.status(200).json({ status: "sucess",msg:" readed electric meter data added sucessfully" });
            });
    },
    // get meter read id
    getMeterReadIbByAccount: (req, res) => { 
        electricService.getMeterReadIbByAccount(req.body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: "database connection err" });
        }
         return res.status(200).json({ data: results });
        });  
    }






}
export default electricController ;

