import express from 'express';
const billsRouter = express.Router();
billsRouter.get('/', (req, res) => { 
    res.send("bills")
});

export default billsRouter;