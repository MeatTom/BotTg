import React from 'react';
import Button from "../button/button";

const Header = () => {

    const telegram = window.Telegram.WebApp;
    const onClose = () => {
        telegram.Close()
    }

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {telegram.initDataUnsafe?.user.username}
            </span>
        </div>
    );
};

export default Header;