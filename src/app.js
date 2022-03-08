import express from 'express';
import dotenv  from 'dotenv';
const app=express();
dotenv.config({path:__dirname+'/../.env'});
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
});

export default app;

