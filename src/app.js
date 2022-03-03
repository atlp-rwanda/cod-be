import express from 'express';
import dotenv  from 'dotenv';
const app=express();
dotenv.config();
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
});

export default app;

