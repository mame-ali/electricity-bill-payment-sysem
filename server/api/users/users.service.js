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

    //userById
    userById: (data, callback) => {
        const getUserInfo = query.getUserInfo;

        connection.query(getUserInfo, [data], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result[0]);
        })
    },


    // update role
    updateRole: (data, callback) => { 
        const updateUserRole = query.updateUserRole;
        connection.query(updateUserRole,
            [
              
            data.user_id,
             data.org_role_id
            ],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })
    },
    // add new electric meter
    addElectricMeter: (data, callback) => {
        const insertElectricMeter = query.insertElectricMeter;
        connection.query(insertElectricMeter,
            [
            data.account_number,
             data.user_id
            ],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })
     },

    //add Electric Meter Address
    addElectricMeterAddress: (data, callback) => {
        const insertElectricMeterAddress = query.insertElectricMeterAddress;
        connection.query(insertElectricMeterAddress,
            [
                data.electric_meter_id,
                data.region,
                data.zone,
                data.wereda,
                data.subcity,
                data.kebele,
                 data.house_number,
            ],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })
    },
    // update new electric meter
    updateElectricMeter: (data, callback) => {
        const updateElectricMeter = query.updateElectricMeter;
        connection.query(updateElectricMeter,
            [
            data.account_number,
            data.user_id,
             data.electric_meter_id
            ],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })
    },
    
      // update new electric meter Address
    updateElectricMeterAddress: (data, callback) => {
        const updateElectricMeterAddress = query.updateElectricMeterAddress;
        connection.query(updateElectricMeterAddress,
            [
                data.region,
                data.zone,
                data.wereda,
                data.subcity,
                data.kebele,
                data.house_number,
                data.electric_meter_address_id
            ],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })
    },
    
    //delete Electric Meter Address
    deleteElectricMeterAddress: (data, callback) => {
        const deleteElectricMeterAddress = query.deleteElectricMeterAddress;
        connection.query(deleteElectricMeterAddress,
            [data],
            (error, result, fields) => { 
             if (error) {return callback(error);}
                return callback(null, result);
            })
    },

    //delete Electric Meter
   deleteElectricMeter: (data, callback) => {
    const deleteElectricMeter = query.deleteElectricMeter;
    connection.query(deleteElectricMeter,
        [data],
        (error, result, fields) => { 
        if (error) {return callback(error);}
            return callback(null, result);
        })
    },



}

export default userService;