const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const connectDB = require('./db/conn');
connectDB();

const express = require('express');
const app = express();

const authRouter = require('./routers/auth')

// middleware
app.use(express.json());
app.use(authRouter);

app.get('/',(req,res)=>{
    res.send('Hello, This is the backend of GitAlong');
})

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    try{
        console.log(`server is running at port ${PORT}`);
    }
    catch(e){
        console.log(e)
    }
})