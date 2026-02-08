import express from "express"
import dotenv from "dotenv"


dotenv.config();
const app= express();

const PORT = Number(process.env.PORT) ||5002 ;

app.listen(process.env.PORT,()=>{
    console.log(`Users service is running on http://localhost:${process.env.PORT}`)
})