import React, { useState,useEffect } from "react";
import Login from "../Login/login";
import Profile from "../Profile";

const MainPage = (props) => {
    const [islogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState({});

    useEffect(()=>{
        console.log("userData", userData)

    }, [userData])
    const formSubmitted = (data) => {
        data && setUserData(data);
        data.username && setIsLogin(!islogin)
    }
    const logout = () => {
        console.log("i m clicked")
        setIsLogin(true)
    }
    return (
        <div className="main-wrapper">
            {
                islogin ?
                <Login formData={formSubmitted}/>
                :
                <Profile userData={userData} logout={logout}/>
            }
        </div>
    )
}
export default MainPage;