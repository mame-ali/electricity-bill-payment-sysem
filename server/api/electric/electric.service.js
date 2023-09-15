import { connection } from '../../config/db.js'
import query from '../../query/query.js';

const electricService = {
    // insert readed electric meater data
    addReadData: (data, callback) => {
        const insertReadData = query.insertReadData;
        console.log(data);
        connection.query(insertReadData,
            [
                data.electric_meter_id,
                data.user_id,
                data.read_data,
                data.month,
            ],
            (error, result, fields) => {
                if (error) { return callback(error); }
                return callback(null, result);
            });
    },
    // get electric meter id by account number
    getMeterReadIbByAccount: (data, callback) => {
        const getElectricMeterReadIdByAccountNumber = query.getElectricMeterReadIdByAccountNumber;
        console.log(data);
        connection.query(getElectricMeterReadIdByAccountNumber,
            [data.account_number],
            (error, result, fields) => {
                if (error) { return callback(error); }
                return callback(null, result);
            });
    },















}
export default electricService;