
"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAppData } from "@/context/appContext"
import { AccountProps } from "@/type"
import { Award, Car, Plus, Sparkle, X } from "lucide-react"
import react, { useState } from "react"





const Skills: React.FC<AccountProps> = ({user,isYourAccount})=>{
    const {addSkill,btnLoading,removeSkill} = useAppData();
    const [skill,setSkill]=useState("");


    const addSkillHandler=()=>{
    if(!skill.trim()){
        alert("Please enter a skill");
        return;
    }
    addSkill(skill,setSkill)
    
};

    const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==="Enter"){
            addSkillHandler();
        }
    }

    const removeSkilHandler = (skillToRemove:string) =>{
        if(confirm(` Are you sure you want to remove ${skillToRemove} ? `)){
            removeSkill(skillToRemove)
            
        }
    }
    return <div className="max-w-5xl mx-auto px-4 py-6 ">
        <Card className="shadow-lg border-2 overflow-hidden">
            <div className="bg-blue-500 p-6 border-b">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <Award size={20} className="text-blue-600"/>
                 </div>
                         <CardTitle className="text-2xl text-white">
                                {isYourAccount ? "Your skills" :"User Skills"}
                            </CardTitle>

                            {
                                isYourAccount && <CardDescription className="text-sm mt-1 text-white">
                                    Showcase your skill and experities
                                </CardDescription>
                            }
                </div> 
            </div>
            {/* Add skillss Input */}

            {
                isYourAccount && <div className="flex gap-3 flex-col sm:flex-row ">
                    <div className="relative flex-1">
                        <Sparkle  size={18} className = "absolute left-3 top-1/2 -translate-y-1/2 opacity-50"/>
                            <Input type="text" placeholder="eg.Node.js ,React.js ..etc." className="h-11 pl-10 bg-background " value={skill} onChange={e=>setSkill(e.target.value)} onKeyPress={handleKeyPress}>
                            </Input>
                    </div>
                    <Button onClick={addSkillHandler} className="h-11 gap-2 px-6" disabled={!skill.trim()||btnLoading}>
                        <Plus size={18}/> Add skills
                    </Button>
                </div>
            }

            {/*  Skill Display */}
            <CardContent  className="p-6">
                {
                    user.skills && user.skills.length>0 ?
                        <div className="flex flex-wrap gap-3">{user.skills.map((e,i)=>(
                            <div className="group relative inline-flex items-center gap-2 border-2 rounded-full hover:shadow-sm duration-200 transition-all pl-4 pr-3 py-2" key={i}>
                                <span className="font-medium text-sm">{e}</span>
                                {
                                    isYourAccount && <Button onClick={()=>removeSkilHandler(e) } className="h-6 w-6 rounded-full text-red-500 flex items-center bg-white justify-center transition-all hover:bg-gray-500  hover:scale-110">
                                        <X size={14}/></Button>
                                }

                            </div>)
                        )}</div> :<>
                        <div className="text-center py-12 ">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                                <Award size={18} className="opacity-40"/>
                                </div>
                                <CardDescription className="text-base">
                                   { isYourAccount ? "No skill added yet. Start Building Your profile!":"No skills Added by user"}
                                </CardDescription>
                                </div></>
                }
            </CardContent>
        </Card>
    </div>
}

export default Skills