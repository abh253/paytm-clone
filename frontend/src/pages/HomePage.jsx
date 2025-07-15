import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
export const HomePage=()=>{
    const navigate=useNavigate();
    return (
        <div className="bg-slate-300 flex flex-col w-full h-screen justify-center items-center">
            <div className="flex flex-col justify-center items-center rounded-lg w-100 h-60 bg-white">

                <div className="text-lg font-light mt-4">welcome to </div>
                <div className="text-2xl font-bold mb-4">Payme</div>
                <Button className="w-50" label="sign in" onClick={()=>{
                    navigate("/signin");
                }}/>
            </div>
           
        </div>
    )
}