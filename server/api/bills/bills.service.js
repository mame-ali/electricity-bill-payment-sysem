import { connection } from '../../config/db.js'
import query from '../../query/query.js';

const billsService = {
    getBillByAccount:  (data, callback) => {
        const getBillInfoByAccount = query.getBillInfoByAccount;
        console.log(data);
        connection.query(getBillInfoByAccount,
            [data],
            (error, result, fields) => {
                if (error) { return callback(error); }
                return callback(null, result);
            });
    },


}

export default billsService;