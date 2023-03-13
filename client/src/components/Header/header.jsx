import React from 'react';
import Button from "../Button/button";
import {useTelegram} from "../../hooks/telegram";
import HeaderStyle from './header.module.css'

const Header = () => {
    const {onClose} = useTelegram()

    return (
        <div className={HeaderStyle.header}>
            <Button onClick={onClose}>Закрыть</Button>
        </div>
    );
};

export default Header;