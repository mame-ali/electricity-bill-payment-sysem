import userService from "./users.service.js";
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

const userController = {
    //create user
    createUser: (req, res) => {
        // console.log(req.body);
        const { user_email, user_password, f_name, m_name, l_name, phone } = req.body;
        if (!user_email || !user_password || !f_name || !m_name || !l_name || !phone) {
            res.json({ status: "failed", msg: "all fields are reqired" });
        }
        // if email is used befor
        userService.getUserByEmail(user_email,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ msg: "database connection err during  email checking", });
                }
                if (results.length) { 
                      return res.status(500).json({ msg: "email is already registered", });
                }
               
            })
        
        //password encryption
        const salt = bcrypt.genSaltSync();
        req.body.user_password = bcrypt.hashSync(user_password, salt);
        //otp genarate
        const otp = generateRandomSixDigitNumber();
        //send otp to email
        sendEmail(user_email,otp);
        req.body.otp = otp;
        // console.log(req.body);
       let user_id;
        //insert data
        userService.createUser(req.body,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ msg: "database connection err during inserting users data11", });
                }
                user_id = results.insertId;
                req.body.user_id = user_id;
                // console.log(`in ${req.body.user_id}`)
                // console.log(`out ${user_id}`)
                        userService.addUserPassword(req.body,
                        (err, results) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).json({ msg: "database connection err during inserting users data", });
                            }

                            })
        userService.addUserInfo(req.body,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ msg: "database connection err during inserting users info", });
                }

            });
        userService.addUserrole(req.body,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ msg: "database connection err during inserting users role", });
                }
               
                return res.json({status: 'sucess',msg: 'user created sucessfuly'})
            });  
            })  

    },

    // confirm OTP
    confirmOtp: (req, res) => {
        const { user_email, otp } = req.body;
    userService.getOTPByEmail(req.body,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ msg: "database connection err during  email checking", });
                }
                if (!results.length) { 
                     return res.status(500).json({ status: "failed " ,msg: "incorrect otp", });
                }
                if (results.length) {
                    const data = {
                        user_active_status: 1,
                        user_email: user_email
                        };
                userService.updateUserActiveStatus(data,(err, results) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).json({ msg: "database connection err during  email checking", });
                            }
                    // console.log(results);  
                    // res.send("sucess");
                    }
                )
                }
               
                res.json({ status: "sucess", msg: 'email sucessfully confirmed' });
                   // console.log(results);
            })
           
        
     }
        
    
   
}


export default userController;


const generateRandomSixDigitNumber = () => {
  return Math.floor(Math.random() * 900000 + 100000);
};

// Function to send email
const sendEmail = async (user_email, v_code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user_email,
      subject: "text",
      text: `your evangadi verification code is ${v_code}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};