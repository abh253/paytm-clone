export const Button=({label,onClick,className})=>{
    return (
        <div className={`mt-2 ${className}`}>
            <button className="w-full text-center p-2 px-3 rounded-lg text-white bg-gray-800" onClick={onClick}>{label}</button>
        </div>
    )
}