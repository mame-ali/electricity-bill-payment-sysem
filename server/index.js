import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import doenv from 'dotenv';
doenv.config();
const server = express();
const port = process.env.SERVER_PORT;
const ip = process.env.SERVER_HOST;

//db
import { connection } from './config/db.js';
import './config/install.js'

//routing
import usersRouter from "./api/users/users.route.js"
import billsRouter from "./api/bills/bills.route.js";
import electricRouter from "./api/electric/electric.route.js";

//midleware 

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//API routes
server.use("/api/users", usersRouter);
server.use("/api/bills", billsRouter);
server.use("/api/electric", electricRouter);



// testing API
server.get('/', (req, res) => { 
    res.send("<h1>working ..... </h1>")
});

server.listen(port,ip ,() => console.log(`Listening at http://${ip}:${port}`));
