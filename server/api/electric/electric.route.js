import express from 'express';
import electricController from './electric.controller.js';
const electricRouter = express.Router();

electricRouter.get('/', (req, res) => { 
    res.send("electric")
});

electricRouter.post('/insertreaddata', electricController.createReadData);
electricRouter.post('/getmeterreadsid', electricController.getMeterReadIbByAccount);


export default electricRouter;