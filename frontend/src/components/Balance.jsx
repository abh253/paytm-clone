export const Balance = ({value})=>{
    return (
        <div className="flex font-bold text-md mx-4 my-2 text-3xl text-green-600">
            <p className="text-black">Rs. </p> {value}
        </div>
    )
}