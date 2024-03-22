import React from 'react';
import classNames from "classnames/bind";
import Styles from './Input.model.scss';

const cx = classNames.bind(Styles)


function Input({
    type,
    value,
    icon,
    name,
    onClick,
    placeholder
               }) {
    return (
        <div>
            <div className="input">
                <input type={type} value={value} name={name} placeholder={placeholder}/>
                <img src={icon} alt="" onClick={onClick}/>
            </div>
        </div>
    );
}

export default Input;