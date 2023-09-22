import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import doenv from 'dotenv';
doenv.config();
const server = express();
const port = process.env.SERVER_PORT;
const ip = process.env.SERVER_HOST;
import stripe from 'stripe';

const stripeInstance = stripe(process.env.SKEY); // here goes the key from the .env
//db
import { connection } from './config/db.js';
import './config/install.js'

//routing
import usersRouter from "./api/users/users.route.js"
import billsRouter from "./api/bills/bills.route.js";
import electricRouter from "./api/electric/electric.route.js";

//midleware

// server.use(cors());
server.use(cors({
    origin: (origin, callback) => {
        // Allow requests from any origin
        callback(null, true);
    },
    credentials: true // Allow credentials (cookies) to be sent
}));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//API routes
server.use("/api/users", usersRouter);
server.use("/api/bills", billsRouter);
server.use("/api/electric", electricRouter);

server.post("/payments/create", async (req, res) => {

	try {
		const total = req.query.total;
		const paymentIntent = await stripeInstance.paymentIntents.create({
			amount: parseInt(total),
			currency: "usd",
		});
		console.log(paymentIntent.client_secret);
		res.send({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).send("server error");
	}
});



//logout
server.get('/api/users/logout',(req, res)=> {
  res.clearCookie('token')
  return res.json({status: 'success'})
})
//check login status
const verifyUser = (req,res,next) => { 
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "no token, so logout" });
  }
  else { 
    jwt.verify(token, 'zerubabel-secret-key', (error, decode) => { 
      if (error) { return res.json({ message: 'authentication error' }); }
      else {
        req.username = decode.username;
        next();
      }
    });
  }
};


// testing API
server.get('/', (req, res) => { 
    res.send("<h1>working ..... </h1>")
});

server.listen(port,ip ,() => console.log(`Listening at http://${ip}:${port}`));
