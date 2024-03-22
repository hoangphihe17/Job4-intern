import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.model.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    small = false,
    large = false,
    disabled = false,
    rounded = false,
    text = false,
    type,
    leftIcon,
    rightIcon,
    className,
    children,
    onClick,
    ...passProps}) {
    let Comp = 'Button';

    const props = {
        onClick,
        ...passProps
    };



    if(to) {
        props.to = to;
        Comp = Link;
    } else if(href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        [className] : className,
        primary,
        outline,
        small,
        text,
        disabled,
        rounded,
        large
    });
    return (
        <Comp className={classes} {...props} style={{display: `${disabled?'none':'block'}`}} type={type}>
            <span className={cx('title')} >{children}</span>
        </Comp>
    );
}

export default Button;