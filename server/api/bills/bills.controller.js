import  billsService from "./bills.service.js";
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

const billsController = {
    // get bill information
    getbillByAccount: (req, res) =>
    {
        const account_number = req.params.account_number;
        billsService.getBillByAccount(account_number, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: "database connection err" });
        }
         return res.status(200).json({ data: results });
        });  
    }

}

export default billsController;