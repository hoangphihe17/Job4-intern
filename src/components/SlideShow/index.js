import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import Styles from "./SlideShow.model.scss";

const cx = classNames.bind(Styles);

function Slide({
    contact,
    iconL,
    iconR
               }) {
    const [current, setCurrent] = useState(0);
    const [items,setItems] = useState([]);
    const [x, setX] = useState(0);
    const [galleries,setGalleries] = useState(null);

    const setIndexItems=(data)=>{
        let items =[];
        for (let i=0;i<data.length;i++){
            items.push(i);
        }
        setItems(items);
    }

    const handleRightSlideShow = ()=> {
        if (current == galleries.length - 1) {
            setCurrent(0);
            setX(0);
        } else {
            setCurrent((prevCurrent) => prevCurrent + 1);
            setX((prevX) => prevX - 932);
        }
    }

    const handleLeftSlideShow = ()=> {
        if (current == 0) {
            setCurrent(galleries.length-1);
            setX(-932 * (galleries.length - 1));
        } else {
            setCurrent((prevCurrent) => prevCurrent - 1);
            setX((prevX) => prevX + 932);
        }
    }

    useEffect(() => {
        const request = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        };
        fetch(`https://agiletech-test-api.zeabur.app/galleries`, request)
            .then(res => res.json())
            .then(data => {
                if (data){
                    setGalleries(data);
                    setIndexItems(data);
                }

            }).catch(fail=>console.log(fail));
        const intervalId = setInterval(handleRightSlideShow, 5000);
        return () => {
            clearInterval(intervalId);
        }
    }, [current]);
    return (
        <div className="slide-container">
            <div className="slide">
                <div
                    className="slide-items"
                    style={{
                        transform: `translateX(${x}px)`,
                    }}
                >
                    {
                        galleries && galleries.map((gallerie) => (
                            <div className="item" key={gallerie.id}>
                                <div className="item-avt">
                                    <img src={gallerie.imageUrl} alt="" />
                                </div>

                                <div className="item-content">
                                    <span className="item-name">John Fang</span>
                                    <span className="item-contact">{contact}</span>
                                    <span className="item-about">{gallerie.desctiption}</span>
                                </div>
                            </div>
                        ))
                    }


                </div>

            </div>

            <div className="slide-indexs">
                {
                    items.map(item => (
                        <div className={`index ${(current==item)?'index-focus':''}`}></div>
                    ))
                }

            </div>

            <div className="slide-btn">
                <div className="btn-hover" onClick={handleLeftSlideShow}>
                    <img src={iconL} alt=""/>
                </div>

                <div className="btn-hover" onClick={handleRightSlideShow}>
                    <img src={iconR} alt=""/>
                </div>

            </div>
        </div>
    );
}

export default Slide;