import React from 'react';
import Styles from './Card.model.scss';
import classNames from "classnames/bind";
import images from "../../assets/images";

const cx = classNames.bind(Styles);

function Card({
    title,
    content,
    img,
    bg
              }) {
    const image = bg ;
    return (
        <div className="card" style={{
            background: `url(${image}) top right / contain no-repeat`,
            }}>
            <div className="card-img">
                <img src={img}/>
            </div>
            <div className="card-content" >
                <div className="card-title">
                    <span>{title}</span>
                </div>

                <div className="card-note">
                    <span>{content}</span>
                </div>

                <div className="card-links">
                    <a>Learn more</a>
                    <img src={images.iconArrowRight}/>
                </div>
            </div>
        </div>
    );
}

export default Card;