import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import {Users} from "../components/Users";
import { useState,useEffect } from "react";
import axios from "axios";
export const Dashboard= ()=>{
    const [balance,setBalance]=useState(0);
    const AuthStr="Bearer "+localStorage.getItem("token");
    useEffect(()=>{
                    
        const fetchBalance = async()=>{
            const response=await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers : {
                    Authorization:AuthStr
                }});
            // console.log(response);
            setBalance(Math.trunc(response.data.balance));
        }
        fetchBalance();
    },[])
    return (
        <div>
            <Appbar/>
            <div>
                <Balance value={balance}/>
                <Users/>
            </div>
            
        </div>
    )
}