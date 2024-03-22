import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import Styles from "./SignIn.model.scss";
import HeaderTop from "../../components/HeaderTop";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {useNavigate} from 'react-router-dom'
const cx = classNames.bind(Styles);

function SignIn(props) {
    const navigate = useNavigate();


    const handleClick = (event) => {
        event.preventDefault();
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: event.target[0].value})
        };
        fetch('https://agiletech-test-api.zeabur.app/auth/login', request)
            .then(res => res.json())
            .then(data => {
                if (data.accessToken != null || data.accessToken !=undefined){
                    localStorage.setItem("token",JSON.stringify(data))
                    navigate("/home")
                    // console.log(data);
                }else {
                    alert("username error!")
                }

            }).catch(fail=>console.log(fail));

    };


    return (
        <div className="main">
            <div className="container">
                <HeaderTop
                    isLogin={false}
                    isInLoginPage={true}
                />
                <div className="form-signIn">
                    <form action="" className="form-container" onSubmit={handleClick}>
                        <span className="form-title">Sign In</span>
                        <span className="username">Username</span>
                        <Input type="text" name="txtUserName"/>
                        <Button
                            primary
                            type="submit"
                        >Sign In</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;