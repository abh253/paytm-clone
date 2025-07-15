import { Button } from "./Button"
import { useNavigate } from "react-router-dom"
export const Appbar=()=>{
    const navigate=useNavigate();
    return (
        <nav className="flex justify-between items-center m-4">
            <div className="text-2xl font-bold text-gray-600">
                PAYME
            </div>
            <div className="text-xl font-semibold">
                hello, {localStorage.getItem("firstname")?.charAt(0).toUpperCase() + localStorage.getItem("firstname")?.slice(1)}
            </div>
            <Button label="sign out" onClick={()=>{
                localStorage.clear("token");
                localStorage.clear("firstname");
                localStorage.clear("lastname");

                navigate("/signin");
            }}></Button>
        </nav>
    )
}