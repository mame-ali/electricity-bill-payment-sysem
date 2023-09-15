import { connection } from '../../config/db.js'
import query from '../../query/query.js';

const  userService = {
    //data comes form the user controller
    createUser: (data, callback) => { 
        const insertIntoUsers = query.insertIntoUsers;
        connection.query(insertIntoUsers,
            [data.user_email,
            data.otp,
            ],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })
    },
    // add user password
    addUserPassword: (data, callback) => { 
        const insertIntoUsersPassword = query.insertIntoUsersPassword;
        //console.log(data);
        connection.query(insertIntoUsersPassword,
            [
            data.user_id,
            data.user_password,
            ],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })
    },
    //add user info
    addUserInfo: (data, callback) => { 
        const insertIntoUsersInfo = query.insertIntoUsersInfo;
        connection.query(insertIntoUsersInfo,
            [
                data.user_id,
                data.f_name,
                data.m_name,
                data.l_name,
                 data.phone,
            ],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })
    },

    // add user role
    addUserrole: (data, callback) => { 
        const insertIntoUsersrole = query.insertIntoUsersrole;
        connection.query(insertIntoUsersrole,
            [
                data.user_id,
                1, 
            ],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })
    },

    // change password
    changepassword: (data, callback) => { 
        const updatePassword = query.updatePassword;
    connection.query(updatePassword,
            [
                data.user_password,
                 data.user_id
            ],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
        //query select user using email to get user_id
    },

    //get otp by email
    getOTPByEmail : (data, callback) => { 
        const getOTPByEmail = query.getOTPByEmail;
        
        connection.query(getOTPByEmail,
            [
                data.user_email,
                data.otp
            ],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })},
    //get user by email
    getUserByEmail:(data, callback) => { 
        const getUserByEmail = query.getUserByEmail;
        
        connection.query(getUserByEmail, [data], (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })} ,
    //update user active status
    updateUserActiveStatus: (data, callback) => { 
        const updateUserActiveStatus = query.updateUserActiveStatus;
        console.log(data);
        connection.query(updateUserActiveStatus,
            [
                 data.user_active_status,
                  data.user_email
            ],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })} ,
     // get password by id
    getUserpasswordByid:  (data, callback) => { 
        const getUserpasswordbyid = query.getUserpasswordbyid;
        console.log(data);
        connection.query(getUserpasswordbyid,
            [
                 data
            ],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })
    },
    
    //update OTP
    updateUserOtp:  (data, callback) => { 
        const updateOtp = query.updateOtp;
        console.log(data);
        connection.query(updateOtp,
            [
              
                data.otp,
             data.user_email
            ],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })} ,












}

export default userService;