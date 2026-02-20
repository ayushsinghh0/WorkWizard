"use client";

import { AppContextType, Application, AppProviderProps, User } from "@/type";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const utils_service = "http://localhost:5001";
export const auth_service = "http://localhost:5000";
export const user_service = "http://localhost:5002";
export const job_service = "http://localhost:5003";
export const payment_service="http://localhost:5004";


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [applications,setApplications] = useState<Application[]|null> (null);

  const token = Cookies.get("token");

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${user_service}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }




  
  async function updateProfilePic(fromData: FormData) {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/update/pic`,
        fromData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);
      fetchUser();
    } catch (error: unknown) {
      // toast.error(error.response.data.message)
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  }






  async function updateResume(fromData: FormData) {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/update/resume`,
        fromData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);
      fetchUser();
    } catch (error: unknown) {
      // toast.error(error.response.data.message)
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  }






  async function updateUser(name: string, phoneNumber: string, bio: string) {
    setBtnLoading(true);

    try {
      const { data } = await axios.put(
        `${user_service}/api/user/update/profile`,
        {
          name,
          phoneNumber,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setBtnLoading(false);
    }
  }





   async function addSkill(skill:string,setSkill:React.Dispatch<React.SetStateAction<string>>) {
         setBtnLoading(true);
        try {
          const {data}= await axios.post(`${user_service}/api/user/skills/add`,{skillName:skill},{
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          toast.success(data.message);
          setSkill("")

        } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setBtnLoading(false);
    }
  }


  

   async function removeSkill(skill:string) {
        
        try {
          const {data}= await axios.put(`${user_service}/api/user/skill/delete`,{skillName:skill},{
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          toast.success(data.message);
        
        } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setBtnLoading(false);
    }
  }






  async function logoutUser() {
    Cookies.set("token", "");
    setUser(null);
    setIsAuth(false);
    toast.success("Logges Out successfully");
  }


  async function applyJob(job_id:number) {
    setBtnLoading(true)
    try {
      const {data} = await axios.post(`${user_service}/api/user/apply/job`,{job_id},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("Login failed");
      }    }
      finally{
        setBtnLoading(false)
      }
      
  }



  async function fetchApplications() {
    try {
      const {data}=await axios.get(`${user_service}/api/user/application/all`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
      })

      setApplications(data)
    } catch (error) {
      console.log(error)
      
    }
    
  }

   useEffect(() => {
    fetchUser();
    fetchApplications();
    
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        btnLoading,
        isAuth,
        setUser,
        setIsAuth,
        setLoading,
        logoutUser,
        updateProfilePic,
        updateResume,
        updateUser,
        addSkill,
        removeSkill,
         applyJob,
         applications,
         fetchApplications

      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within App provider");
  }
  return context;
};
