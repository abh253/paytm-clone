import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"
export const Signup = function (){
    const [firstname,setFirstname]=useState("");
    const [lastname,setLastname]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]= useState("");

    const navigate=useNavigate();

    const onClickHandler=async ()=>{
        //post the data to the api endpoints create
        console.log("signing up");
        try{
            const response = await axios.post("https://api-payapp-clone.onrender.com/api/v1/user/signup",{
            firstname,
            lastname,
            username,
            password
            });
            if(response.status===201){
                localStorage.setItem("token",response.data.token);
                localStorage.setItem("firstname",response.data.info.firstname);
                localStorage.setItem("lastname",response.data.info.lasttname);
                console.log(response)
                navigate("/dashboard");
            }else{
                alert("invalid credentials or user already exist");
            }
            

        }catch(err){
            console.log(err);
            alert("invalid credentials");
        }
       
    }

    return (
        <div className="bg-slate-300 h-screen flex items-center justify-center">
            <div className="flex flex-col w-80 h-130  bg-white rounded justify-center p-4">
                <Heading label ="Sign Up"/>
                <SubHeading label ="Enter your information to create an account"/>
                <InputBox label="First Name" placeholder="Abhishek" onChange={(e)=>{setFirstname(e.target.value)}}/>
                <InputBox label="last Name" placeholder="Singh" onChange={(e)=>{setLastname(e.target.value)}} />
                <InputBox label="username" placeholder="xyz@123" onChange={(e)=>{setUsername(e.target.value)}}/>
                <InputBox label="Password" placeholder="12345678" onChange={(e)=>{setPassword(e.target.value)}}/>
                <Button label= "Sign Up" onClick={onClickHandler}/>
                <BottomWarning label= "Already have an account ?" buttonText="sign in" to="/signin" />
            </div>
        </div>
    )
}