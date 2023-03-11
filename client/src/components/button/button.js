import React from 'react';
import './button.css'

const Button = (props) => {
    return (
        <button {...props} className={'button' + props.className}/>
    );
};

export default Button;