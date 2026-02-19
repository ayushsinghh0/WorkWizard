import {Request,Response,NextFunction,RequestHandler} from "express"
import ErrorHandler from "./errorHandler.js"

export const TryCatch = (controller:(req:Request,res:Response,next:NextFunction)=>
Promise<any>): RequestHandler=> async (req,res,next)=>{
    try { 
        await controller(req,res,next)
    } catch(error:any) {
        if(error instanceof ErrorHandler) {
            return res.status(error.statusCode).json({
                message:error.message
            })
        }
        res.status(500).json({
            message: error.message,
        })

    }
}


/* export function TryCatch(controller) {

  return async function (req, res, next) {

    try {
      // Run your main function
      await controller(req, res, next);

    } catch (error) {

      // If it is your custom error
      if (error instanceof ErrorHandler) {

        return res.status(error.statusCode).json({
          message: error.message,
        });
      }

      // If it is normal error
      res.status(500).json({
        message: error.message,
      });
    }
  };
}
 */