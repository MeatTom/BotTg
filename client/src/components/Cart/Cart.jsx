import React, { useState } from 'react';
import axios from 'axios';
import Button from "../Button/button";
import CartStyle from "../Cart/Cart.module.css"
import {useTelegram} from "../../hooks/telegram";

const Cart = ({ addedItems, onClose, openCart, onSuccess }) => {
    const {telegram} = useTelegram()
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:4000/order', {
                params: {
                    name,
                    phone,
                    items: addedItems.map(item => item.id),
                }
            })
            console.log(response.data);
            onSuccess()
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseCart = () => {
        telegram.MainButton.show();
        telegram.MainButton.setParams({text: 'Оформить заказ'});
        telegram.MainButton.onClick(openCart);
        onClose();
    };

    return (
        <div className={CartStyle.cart_modal}>
            <div className={CartStyle.cart_modal_content}>
        <span className={CartStyle.close} onClick={handleCloseCart}>
          &times;
        </span>
                <h1>Корзина</h1>
                {onSuccess ? (
                    <div>
                        <p>Заказ успешно оформлен!</p>
                        <button onClick={() => window.close()}>Закрыть</button>
                    </div>
                ) : (
                    <>
                        {addedItems.length === 0 && <p>Корзина пуста</p>}
                        {addedItems.length > 0 && (
                            <>
                                <div className={CartStyle.cart_products}>
                                    <h2>Заказанные товары:</h2>
                                    <ul>
                                        {addedItems.map((item) => (
                                            <li key={item.id}>{item.title}</li>
                                        ))}
                                    </ul>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <p>Для заказа товара заполните форму</p>
                                    <label className={CartStyle.cart_form_fio}>
                                        ФИО:
                                        <input
                                            placeholder={'Фамилия Имя Отчество'}
                                            type="text"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                            required
                                        />
                                    </label>
                                    <label className={CartStyle.cart_form_phone}>
                                        Номер телефона:
                                        <input
                                            pattern={'+7[0-9]{10}'}
                                            type="tel"
                                            placeholder={'+7__________'}
                                            value={phone}
                                            onChange={(event) => setPhone(event.target.value)}
                                            required
                                        />
                                    </label>
                                    <Button className={CartStyle.cart_btn} type="submit">Отправить</Button>
                                </form>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};


export default Cart;