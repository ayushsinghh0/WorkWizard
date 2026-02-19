import express from "express"
import dotenv from "dotenv"
import Razorpay from "razorpay"
import cors from "cors"


dotenv.config()

export const instance=new Razorpay(
{    key_id:process.env.Razorpay_Key,
    key_secret:process.env.Razorpay_Secret,

}
)