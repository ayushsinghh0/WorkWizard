
import "dotenv/config";
import app from "./app.js";
import { initDB } from "./Db/index.js";

initDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Job service is running on http://localhost:${process.env.PORT}`);
    })
})


