import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"
import cors from "cors"


dotenv.config();
const app= express();
app.use(cors());
app.use(express.json());


app.use("/api/user",userRoutes);


const PORT = Number(process.env.PORT) ||5002 ;

app.listen(process.env.PORT,()=>{
    console.log(`Users service is running on http://localhost:${process.env.PORT}`)
})