"use client";

import { RazorpayInstance, RazorpayOptions } from "@/type";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const useRazorPay = () => {
  const [loaded, setLoaded] = useState(
    typeof window !== "undefined" && !!window.Razorpay
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.Razorpay) return; // already loaded

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => setLoaded(true);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return loaded;
};

export default useRazorPay;


















/* //https://checkout.razorpay.com/v1/checkout.js

"use client"

import { useEffect,useState} from "react";

declare global {
    interface Window {
        Razorpay?: any;
    }
}




const useRazorPay=()=>{
    const [loaded,setLoaded]=useState(false)

    useEffect(()=>{
        if(typeof window!=="undefined" && !window.Razorpay){
            const script=document.createElement("script")
            script.src="https://checkout.razorpay.com/v1/checkout.js";
            script.async=true;
            script.onload=()=>setLoaded(true);
            document.body.appendChild(script);
        } else if(window.Razorpay){
            setLoaded(true)
        }
    },[]);
    return loaded
}

export default useRazorPay */