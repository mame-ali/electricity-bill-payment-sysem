import express from 'express';
import billsController from './bills.controller.js';

const billsRouter = express.Router();



billsRouter.get("/:account_number", billsController.getbillByAccount);

export default billsRouter;