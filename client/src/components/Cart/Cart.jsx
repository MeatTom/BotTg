import React, { useState } from 'react';
import axios from 'axios';
import Button from "../Button/button";
import CartStyle from "../Cart/Cart.module.css"


const Cart = ({ addedItems, onClose }) => {
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
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={CartStyle.cart_modal}>
            <div className={CartStyle.cart_modal_content}>
        <span className={CartStyle.close} onClick={onClose}>
          &times;
        </span>
                <h1>Корзина</h1>
                {addedItems.length === 0 && <p>Корзина пуста</p>}
                {addedItems.length > 0 && (
                    <>
                        <div>
                            <h2>Заказанные товары:</h2>
                        <ul>
                            {addedItems.map((item) => (
                                <li key={item.id}>{item.title}</li>
                            ))}
                        </ul>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <p>Для заказа товара заполните форму:</p>
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
                                    type="tel"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    required
                                />
                            </label>
                            <Button className={CartStyle.cart_btn} type="submit">Отправить</Button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;