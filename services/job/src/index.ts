import app from "./app.js";
import dotenv from "dotenv";
import { sql } from "./utils/db.js";
import { initDB } from "./Db/index.js";

dotenv.config();

initDB().then(()=>{
app.listen(()=>{
    console.log(`Job service is running on http://localhost:${process.env.PORT}`);
})


})


