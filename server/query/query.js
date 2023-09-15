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

};