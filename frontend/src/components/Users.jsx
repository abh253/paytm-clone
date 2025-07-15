import { useState,useEffect } from "react"
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Users=()=>{

    const [userList,setUserList]=useState([]);
    const [filter,setFilter]=useState("");
    useEffect(()=>{
        const getUserData=async ()=>{
            const AuthStr="Bearer "+localStorage.getItem("token");
            const response=await axios.get("https://api-payapp-clone.onrender.com/api/v1/user/bulk?filter="+filter,{headers:{
                'Authorization': AuthStr
            }});
            console.log(response);
            setUserList(response.data.users);
        }
        getUserData();
        // console.log(userList);
    },[filter]);
    
    return (
        <div className="mx-4">
            <div className="text-2xl font-bold">Users</div>
            <div className="my-2">
                <input onChange={(e) => {
                    setFilter(e.target.value)
                }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div>
                {userList.map((user)=>{
                    return <User key={user._id} user={user}/>
                })}
            </div>
        </div>
    )
}


const User=({user})=>{
    const navigate=useNavigate();
    return (
        <div className="flex justify-between mx-4 my-2">
            <div className="flex">
                <div className="rounded-full bg-slate-200 flex justify-center h-12 w-12 mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                         {user.firstname[0].toUpperCase()}
                    </div>
                </div>
                <div className="pt-3">
                    {user.firstname} {user.lastname}
                </div>
            </div>
            
            <Button label="send money" onClick={(e)=>{
                navigate("/send?id="+user._id+"&name="+user.firstname);
            }} />
        </div>
    )
}