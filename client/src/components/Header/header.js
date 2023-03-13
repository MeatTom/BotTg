import React from 'react';
import Button from "../Button/button";
import {useTelegram} from "../../hooks/telegram";
import './header.css'

const Header = () => {
    const {user, onClose} = useTelegram()

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <p className={'username'}>
                Пользователь: {user?.username}
            </p>
        </div>
    );
};

export default Header;