import React, { useState } from 'react';
import axios from 'axios';
import Button from "../Button/button";
import CartStyle from "../Cart/Cart.module.css"
import {useTelegram} from "../../hooks/telegram";

const Cart = ({ addedItems, onClose, openCart }) => {
    const {telegram} = useTelegram()
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isOrderSuccess, setIsOrderSuccess] = useState(false); // добавляем состояние для отображения сообщения об успешной покупке

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
            setIsOrderSuccess(true); // устанавливаем состояние "isOrderSuccess" в "true" при успешной отправке запроса
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
            {isOrderSuccess ? ( // если заказ успешен, то отображаем только сообщение об успешной покупке и кнопку закрытия приложения
                <div className={CartStyle.cart_success}>
                    <p>Ваш заказ успешно оформлен! Ожидайте звонка в ближайшее время</p>
                    <Button onClick={() => telegram.close()}>Закрыть каталог</Button>
                </div>
            ) : ( // в противном случае отображаем содержимое корзины
                <div className={CartStyle.cart_modal_content}>
          <span className={CartStyle.close} onClick={handleCloseCart}>
            &times;
          </span>
                    <h1>Корзина</h1>
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
                </div>
            )}
        </div>
    );
};


export default Cart;