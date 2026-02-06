import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";


export const registerUser = TryCatch( async (req,res,next)=>{
    const {name,email,password,phoneNumber , role , bio} = req.body;

    if(!name||!email || !password || !phoneNumber ||!role){
        throw new ErrorHandler(400,"please fill all details");
    }

    res.json(email);
    
})