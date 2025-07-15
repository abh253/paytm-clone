import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
export const HomePage=()=>{
    const navigate=useNavigate();
    return (
        <div>
            <div>Payme</div>
            <Button label="sign in" onClick={()=>{
                navigate("/signin");
            }}/>
        </div>
    )
}