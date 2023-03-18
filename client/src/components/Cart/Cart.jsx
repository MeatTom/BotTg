import React, { useState } from 'react';
import axios from 'axios';
import Button from "../Button/button";

const Cart = ({ addedItems, onClose}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:4000/order', { name, phone, items: addedItems });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Корзина</h2>
            {addedItems.length === 0 && <p>Корзина пуста</p>}
            {addedItems.length > 0 && (
                <>
                    <ul>
                        {addedItems.map((item) => (
                            <li key={item.id}>{item.title}</li>
                        ))}
                    </ul>
                    <form onSubmit={handleSubmit}>
                        <label>
                            ФИО:
                            <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
                        </label>
                        <label>
                            Номер телефона:
                            <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required />
                        </label>
                        <Button type="submit">Отправить</Button>
                    </form>
                </>
            )}
        </div>
    );
};


export default Cart


