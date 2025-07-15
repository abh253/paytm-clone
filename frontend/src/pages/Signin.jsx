import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"



export const Signin = function (){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate= useNavigate();

    const onClickHandler=async ()=>{
        // console.log(username,password);
        try{
              const response=await axios.post("https://api-payapp-clone.onrender.com/api/v1/user/signin",{
                    username,
                    password
                });
                console.log("response",response);
                localStorage.setItem("token",response.data.token);
                localStorage.setItem("firstname",response.data.info.firstname);
                localStorage.setItem("lastname",response.data.info.lasttname);
                navigate("/dashboard");
        }catch(err){
            console.log(err);
            alert("invalid credentials");
        }
      
    }


    return (
        <div className="bg-slate-300 h-screen flex justify-center items-center">
            <div className="flex flex-col w-80 h-120  bg-white rounded justify-center p-4">
                <Heading label ="Sign in"/>
                <SubHeading label ="Enter your information to create an account"/>
                <InputBox label="Username" onChange={(e)=>{
                    setUsername(e.target.value);
                }} placeholder="xyz@123"/>
                <InputBox label="Password" placeholder="12345678" onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
                <Button label= "Sign in" onClick={onClickHandler}/>
                <BottomWarning label="don't have an account?" buttonText="sign up" to="/signup"/> 
            </div>
        </div>
    )

}