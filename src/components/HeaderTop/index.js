import React from 'react';
import images from "../../assets/images";
import Button from "../Button";
import Styles from './HeaderTop.model.scss';
import classNames from "classnames/bind";
import {useNavigate} from "react-router-dom";

const cx = classNames.bind(Styles);

function HeaderTop({
    isLogin,
    isInLoginPage,
    href,

                   }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        if(isLogin){
            const token= JSON.parse(localStorage.getItem('token'));
            const request = {
                method: 'DELETE',
                headers: {
                    'accept': '*/*',
                    'authorization': 'Bearer '+ token.accessToken
                },
            };
            fetch(`https://agiletech-test-api.zeabur.app/auth/logout`, request)
                .then(res => res.text())
                .then(data => {
                    navigate("/");
                    localStorage.removeItem("token");
                }).catch(fail=>console.log(fail));
        }else {
            navigate("/login");
        }
    }
    return (
        <div className="header-top">
            <div className="logo">
                <img src={images.logo} alt="logo"/>

            </div>
            <div className={`btn ${isInLoginPage? 'dp-none': ''} ${!isLogin?'only':''}`}>
                <Button
                    primary
                    disabled={!isLogin}
                    href={"/profile"}
                >Profile</Button>
                <Button
                    primary
                    onClick={handleLogout}
                >{isLogin?'Log out':'Sign In'}</Button>
            </div>

        </div>

    );
}


export default HeaderTop;