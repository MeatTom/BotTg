import React, { useState } from 'react';
import axios from 'axios';
import Button from "../Button/button";
import InputMask from 'react-input-mask'
import Modal from 'react-bootstrap'

const Cart = ({ addedItems, onClose }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:4000/order', {
                params: {
                    name,
                    phone,
                    items: addedItems.map((item) => item.id),
                },
            });
            console.log(response.data);
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Корзина</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Номер телефона:
                                <InputMask
                                    mask="+79999999999"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    required
                                />
                            </label>
                            <Button type="submit">Отправить</Button>
                        </form>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Cart;