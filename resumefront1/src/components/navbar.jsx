import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutuser = () =>{
        navigate('/')
        dispatch(logout())
    }
  return (
    <div className=" bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 px-10">
        <nav className=" flex items-center justify-between max-w-7x1 mx-auto px-4 py-3.5 text-slate-800 transition-all">
            
               <h1 className="text-xl">RESUME BUILDER</h1>
            
            <div className="flex items-center gap-4 text-sm">
                <p className="max-sm:hidden">Hi, {user?.name}</p>
                <button onClick={logoutuser} className="bg-white hover:bg-slate-50 border border-grey-300 px-7 py-1.5 rounded-full active:scale-95 transition-all">logout</button>
            </div>
        </nav>  
    </div>
  );
}
export default Navbar;