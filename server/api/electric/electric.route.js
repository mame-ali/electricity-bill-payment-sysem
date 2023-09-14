import express from 'express';
const electricRouter = express.Router();
electricRouter.get('/', (req, res) => { 
    res.send("electric")
});

export default electricRouter;