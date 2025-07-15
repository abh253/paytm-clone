import { useSearchParams,useNavigate } from "react-router-dom"
import { useState } from "react";
import { InputBox } from "../components/InputBox";
import axios from "axios";
export const SendPage=()=>{
    const [searchParams]= useSearchParams();
    const id=searchParams.get("id");
    const name=searchParams.get("name");

    const [amount , setAmount]=useState(0);

    const navigate=useNavigate();

    return(
        <div className="w-full h-screen flex justify-center bg-slate-300 items-center">
            <div className="flex flex-col bg-white items-center justify-center rounded-lg h-70 w-80">
                <div className="text-2xl font-bold mb-8">
                    Send money
                </div>
                <div className="flex items-center">
                    <div className="rounded-full bg-green-500 text-white flex justify-center h-12 w-12 mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-xl">
                            {name[0].toUpperCase()}
                        </div>
                    </div>
                    <div>
                        {name}
                    </div>
                </div>
                <div>Amount in Rs</div>
                <input className="w-60 mt-2 px-4 py-2 bg-gray-100" type="text" id="amount" placeholder="Enter amount" onChange={(e)=>{
                    setAmount(e.target.value);
                }}/>
                <button className="border w-70 px-4 py-2 rounded-sm my-4 bg-green-500 text-white" onClick={async ()=>{
                    const response= await axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to:id,
                        amount
                    },{
                        headers:{
                            Authorization:"Bearer "+localStorage.getItem("token")
                        }
                    });
                    console.log(response);
                    if(response.status===200){
                        alert("transfer completed");
                    }else{
                        alert("transfer failed");
                    }
                    navigate("/dashboard");
                    // response.status is 200 then proceed to success case
                    // otherwise proceed to failure case.
                }}>
                    Send
                </button>
            </div>
        </div>
       
    )
}