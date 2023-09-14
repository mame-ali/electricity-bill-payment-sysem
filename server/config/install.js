import { connection } from './db.js';
import query from '../query/query.js';

//------- table create--------//

connection.query(query.usersTableCreate, (error, results, fields) => { 
    if(error) console.log(error);
    console.log("usersTableCreate");
});

connection.query(query.usersPasswordTableCreate, (error, results, fields) => { 
    if(error) console.log(error);
    console.log("usersPasswordTableCreate");
});

connection.query(query.usersInfoTableCreate, (error, results, fields) => { 
    if(error) console.log(error);
    console.log("usersInfoTableCreate");
});

connection.query(query.orgRoleTableCreate, (error, results, fields) => { 
    if(error) console.log(error);
    console.log("orgRoleTableCreate");
});

connection.query(query.usersRoleTableCreate, (error, results, fields) => { 
    if(error) console.log(error);
    console.log("usersRoleTableCreate");
});

connection.query(query.usersProfileTableCreate, (error, results, fields) => { 
    if(error) console.log(error);
    console.log("usersProfileTableCreate");
});

connection.query(query.electricMeterTableCreate, (error, results, fields) => { 
    if(error) console.log(error);
    console.log("electricMeterTableCreate");
});

connection.query(query.electricMeterAddressTableCreate, (error, results, fields) => { 
    if(error) console.log(error);
    console.log("electricMeterAddressTableCreate");
});

connection.query(query.meterReadTableCreate, (error, results, fields) => { 
    if(error) console.log(error);
    console.log("meterReadTableCreate");
});

connection.query(query.billsTableCreate, (error, results, fields) => { 
    if(error) console.log(error);
    console.log("billsTableCreate");
});