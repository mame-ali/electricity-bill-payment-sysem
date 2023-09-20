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
    const { user_email, user_password, f_name, m_name, l_name, phone } = req.body;
    if (!user_email || !user_password || !f_name || !m_name || !l_name || !phone) {
      res.json({ status: "failed", msg: "all fields are reqired" });
    }
    // if email is used before
    userService.getUserByEmail(user_email,
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "database connection err during  email checking", });
        }
        
        if (results.length) {
          
          return res.status(500).json({ msg: "email is already registered", });
        }
        else { 

          //password encryption
    const salt = bcrypt.genSaltSync();
    req.body.user_password = bcrypt.hashSync(user_password, salt);
    //otp genarate
    const otp = generateRandomSixDigitNumber();
    //send otp to email
    sendEmail(user_email, otp);
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
      //  console.log(`in ${req.body.user_id}`)
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
               
            return res.json({ status: 'sucess', msg: 'user created sucessfuly' })
          });
      })



        }
        
               
      })
        
    

  },

  // all users list 
  AllUser: (req, res) => { 
    userService.getAllusersInfo(
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "database connection err during  email checking", });
        }
        res.status(200).json({ results });
      }
    )

  },

    // all electric meter list 
  AllElectricMeters: (req, res) => { 
    userService.getAllElectricMeterInfo(
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "database connection err during  email checking", });
        }
        res.status(200).json({ results });
      }
    )

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
          return res.status(500).json({ status: "failed ", msg: "incorrect otp", });
        }
        if (results.length) {
          const data = {
            user_active_status: 1,
            user_email: user_email
          };
          userService.updateUserActiveStatus(data, (err, results) => {
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
           
        
  },
     
  //login
  login: (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    //validation
    if (!email || !password)
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });
    //check email existance
    userService.getUserByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res
          .status(404)
          .json({ msg: "No account with this email has been registered" });
      }
      let user_id = results[0].user_id;
      
      // check password
      userService.getUserpasswordByid(user_id, (err, results2) => {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "database connection err" });
        }
          
        if (!results2) {
          return res
            .status(404)
            .json({ msg: "No account with this email has been registered" });
        }
    
        const isMatch = bcrypt.compareSync(password, results2[0].user_password);
        if (!isMatch)
          return res
            .status(404)
            .json({ msg: "Either the user name or password your entered is incorrect" });
        //token geneate
        const token = jwt.sign(
          { id: results[0].user_id, email: email },
          process.env.JWT_SECRET,
          { expiresIn: "30m" }
        );
        return res.json({
          token,
          user: {
            id: results[0].user_id,
            email: email,
          },
          msg: 'login sucessfully'
        });
            

      })

        
      // console.log(isMatch )
      
     
    });
  },
    
  // forget password
  forgetPassword: (req, res) => {
    const { user_email } = req.body;
    console.log(user_email);
    // if email is used befor
    userService.getUserByEmail(user_email,
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "database connection err during  email checking", });
        }
        if (results.length) {
          //otp genarate
          const otp = generateRandomSixDigitNumber();
          req.body.otp = otp;
          //send otp to email
          sendEmail(user_email, otp);
          userService.updateUserOtp(req.body,
            (err, results) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ msg: "database connection err during  email checking", });
              }
              

            })
          return res.json({ status: "sucess", msg: "opt send to email" });

        }
      }
    );
  },

  //change password

  changePassword: (req, res) => {
    const { user_password, user_email } = req.body;
    console.log(req.body);

    if (!user_password || !user_email) {
      return res
        .status(400)
        .json({ msg: "all fields are required" });
    }

    // Password encryption
    const salt = bcrypt.genSaltSync();
    req.body.user_password = bcrypt.hashSync(user_password, salt);

    //check email existance
    userService.getUserByEmail(user_email, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res
          .status(404)
          .json({ msg: "No account with this email has been registered" });
      }
      let user_id = results[0].user_id;
      req.body.user_id = user_id;
      userService.changepassword(req.body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "Database connection error" });
        }
        return res.status(200).json({
          msg: "Password changed successfully",
          data: results,
        });
      });

    })


  
  },

  //get user info
  getUserById: (req, res) => {
    console.log(`###### ${req.user_id}`);
    userService.userById(req.user_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },
  
  // asign role 
  updateUserRole: (req, res) => { 
    const { user_id, org_role_id } = req.body;
    // console.log(req.body);
     userService.updateRole(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({ status: "sucess",msg:"role updated sucessfully" });
    });

  },
   

  // add new electric meter
  addElectricMeter: (req, res) => {
    userService.addElectricMeter(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      req.body.electric_meter_id = results.insertId;
      userService.addElectricMeterAddress(req.body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "database connection err" });
        }
      //return res.status(200).json({ status: "sucess",msg:"electric meter added sucessfully" });
      })
    return res.status(200).json({ status: "sucess",msg:"electric meter added sucessfully" });
  
      
    });

   },

  // update electric meter info 
  updateElectricMeter: (req, res) => {
    console.log(req.body);
    userService.updateElectricMeter(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
    return res.status(200).json({ status: "sucess",msg:"electric meter updated sucessfully" });      
    });

   },
  
   // update Electric Meter Address
  updateElectricMeterAddress: (req, res) => {
    console.log(req.body);
    userService.updateElectricMeterAddress(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
    return res.status(200).json({ status: "sucess",msg:"electric meter Address updated sucessfully" });      
    });

   },

  // delete Electric Meter
  deleteElectricMeter: (req, res) => {
    const electric_meter_id = req.params.id;
    userService.deleteElectricMeterAddress(electric_meter_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      userService.deleteElectricMeter(electric_meter_id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "database connection err" });
        }
      })
    });
     return res.status(200).json({ status: "sucess",msg:"electric meter deleted sucessfully" });      

  },
  //etUserBill
  getUserBill: (req, res) => {
    const user_id = req.params.id;
    userService.getUserBill(user_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
     return res.status(200).json({ results });      
     
    });
     

  },

  // deleteUser: (req, res) => { 
  //    const user_id = req.params.id;
  //   userService.deleteUserAddress(user_id, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({ msg: "database connection err" });
  //     }
  //     userService.deleteElectricMeter(user_id, (err, results) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).json({ msg: "database connection err" });
  //       }
  //     })
  //   });
  //    return res.status(200).json({ status: "sucess",msg:"electric meter deleted sucessfully" });      

  // }














  
}


export default userController;















//---------------------------------------------------//
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
