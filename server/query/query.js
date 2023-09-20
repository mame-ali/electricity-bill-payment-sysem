export default {
  usersTableCreate: `CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(45) NOT NULL,
    user_active_status INT NOT NULL,
    otp varchar(8),
    user_registration_data DATETIME NOT NULL,
    UNIQUE KEY (user_email)
  );`,
  
  usersPasswordTableCreate: `CREATE TABLE IF NOT EXISTS users_password (
    user_password_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_password_created_date DATETIME NOT NULL,
    FOREIGN KEY (user_id)
      REFERENCES users (user_id)
  );`,
  
  usersInfoTableCreate: `CREATE TABLE IF NOT EXISTS users_info (
    user_info_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    f_name VARCHAR(45) NOT NULL,
    m_name VARCHAR(45) NOT NULL,
    l_name VARCHAR(45) NOT NULL,
    phone VARCHAR(13) NOT NULL,
    FOREIGN KEY (user_id)
      REFERENCES users (user_id)
  );`,
  
  orgRoleTableCreate: `CREATE TABLE IF NOT EXISTS org_role (
    org_role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    org_role_name VARCHAR(45) NOT NULL
  );`,
  
  usersRoleTableCreate: `CREATE TABLE IF NOT EXISTS users_role (
    user_role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    org_role_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id)
      REFERENCES users (user_id),
    FOREIGN KEY (org_role_id)
      REFERENCES org_role (org_role_id)
  );`,
  
  usersProfileTableCreate: `CREATE TABLE IF NOT EXISTS users_profile (
    user_profile_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    user_profile_image VARCHAR(255),
    FOREIGN KEY (user_id)
      REFERENCES users (user_id)
  );`,
  
  electricMeterTableCreate: `CREATE TABLE IF NOT EXISTS electric_meter (
    electric_meter_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(15) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id)
      REFERENCES users (user_id)
  );`,
  
  electricMeterAddressTableCreate: `CREATE TABLE IF NOT EXISTS electric_meter_address (
    electric_meter_address_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    electric_meter_id INT NOT NULL,
    region VARCHAR(255) NOT NULL,
    zone VARCHAR(255) NOT NULL,
    wereda VARCHAR(255) NOT NULL,
    subcity VARCHAR(255) NOT NULL,
    kebele VARCHAR(255) NOT NULL,
    house_number VARCHAR(255) NOT NULL,
    FOREIGN KEY (electric_meter_id)
      REFERENCES electric_meter (electric_meter_id)
  );`,
  
  meterReadTableCreate: `CREATE TABLE IF NOT EXISTS meter_read (
    meter_reads_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    electric_meter_id INT NOT NULL,
    user_id INT NOT NULL,
    read_data VARCHAR(10) NOT NULL,
    month VARCHAR(255) NOT NULL,
    read_date DATETIME NOT NULL,
    FOREIGN KEY (user_id)
      REFERENCES users (user_id),
    FOREIGN KEY (electric_meter_id)
      REFERENCES electric_meter (electric_meter_id)
  );`,
  
  billsTableCreate: `CREATE TABLE IF NOT EXISTS bills (
    bill_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    electric_meter_id INT NOT NULL,
    bill_month VARCHAR(255) NOT NULL,
    bill_status INT NOT NULL,
    ec_range INT NOT NULL,
    bill_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (electric_meter_id)
      REFERENCES electric_meter (electric_meter_id)
  );`,

  getUserByEmail: `select * from users WHERE USER_email=?;`,
  getOTPByEmail: `select * from users WHERE USER_email=? and otp =?;`,
  getUserpasswordbyid: `select * from users_password where user_id=?`,
  insertIntoUsers: `INSERT INTO users (user_email, user_active_status, otp, user_registration_data) VALUES (?, 0, ?, NOW());`,
  insertIntoUsersPassword: `INSERT INTO users_password (user_id, user_password, user_password_created_date)VALUES (?, ?, NOW());`,
  insertIntoUsersInfo: `INSERT INTO users_info (user_id, f_name, m_name, l_name, phone) VALUES (?, ?, ?, ?, ?);`,
  insertIntoUsersrole: `INSERT INTO users_role (org_role_id, user_id) VALUES (?, ?);`,
  updateUserActiveStatus: `UPDATE users SET user_active_status = ?, otp = NULL WHERE user_email = ?;`,
  updateOtp: `UPDATE users SET otp = ? WHERE user_email = ?;`,
  updatePassword: `UPDATE users_password SET user_password = ? WHERE user_id = ?`,
  getUserdata: `SELECT registration.user_id,user_name,user_email,first_name,middle_name,last_name,other_name,image_url FROM registration LEFT JOIN profile ON registration.user_id = profile.user_id WHERE registration.user_id = ?`,
  updateUserRole: `UPDATE users_role SET org_role_id = ? WHERE user_role_id = ?;`,
  getUserInfo: `SELECT users.user_id, users.user_email, users.user_active_status,
       users_info.f_name, users_info.m_name, users_info.l_name, users_info.phone,
       users_profile.user_profile_image
        FROM users
        INNER JOIN users_info ON users.user_id = users_info.user_id
        LEFT JOIN users_profile ON users.user_id = users_profile.user_id
        WHERE users.user_id = ?;`,
  insertElectricMeter: `INSERT INTO electric_meter (account_number, user_id) VALUES (?, ?);`,
  insertElectricMeterAddress: `INSERT INTO electric_meter_address (electric_meter_id, region, zone, wereda, subcity, kebele, house_number)
                        VALUES (?, ?, ?, ?, ?, ?, ?);`,
  updateElectricMeter: `UPDATE electric_meter SET account_number = ?, user_id = ? WHERE electric_meter_id = ?;`,
  updateElectricMeterAddress: `UPDATE electric_meter_address
            SET region = ?, zone = ?, wereda = ?, subcity = ?, kebele = ?, house_number = ?
            WHERE electric_meter_address_id = ?;`,
  deleteElectricMeterAddress: `DELETE FROM electric_meter_address WHERE electric_meter_id = ?`,
  deleteElectricMeter: `DELETE FROM electric_meter WHERE electric_meter_id = ?`,

  insertReadData: `INSERT INTO meter_read (electric_meter_id, user_id, read_data, month, read_date) VALUES (?, ?, ?, ?,NOW());`,

  getElectricMeterReadIdByAccountNumber: `SELECT meter_read.electric_meter_id FROM electric_meter INNER JOIN meter_read ON electric_meter.electric_meter_id = meter_read.electric_meter_id where account_number = ? ;`,

  getBillInfoByAccount: `SELECT b.bill_id, e.account_number, b.bill_month, b.bill_status, b.ec_range, b.bill_amount,
               m.read_data, m.month, m.read_date FROM bills AS b JOIN electric_meter AS e ON b.electric_meter_id = e.electric_meter_id
              JOIN meter_read AS m ON b.electric_meter_id = m.electric_meter_id
              JOIN users AS u ON e.user_id = u.user_id WHERE e.account_number = ?`

 , getAllUsersData: `SELECT * FROM users
        JOIN users_info ON users.user_id = users_info.user_id
        JOIN users_role ON users.user_id = users_role.user_id
        JOIN users_profile ON users.user_id = users_profile.user_id
        ORDER BY users.user_id;`,
 getAllElectricMeterData:  `SELECT *
FROM electric_meter
JOIN electric_meter_address ON electric_meter.electric_meter_id = electric_meter_address.electric_meter_id;`

  ,getBillInfo: `SELECT * FROM bills
                JOIN electric_meter ON bills.electric_meter_id = electric_meter.electric_meter_id
                JOIN users ON electric_meter.user_id = users.user_id
                WHERE users.user_id = ?;`

};