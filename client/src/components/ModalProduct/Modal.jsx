import React from 'react';
import ModalStyle from './Modal.module.css';

const Modal = ({ product, onClose, showModal }) => {
    return (
        <div className={ModalStyle.modal} style={{display: showModal ? 'none' : 'block'}}>
            <div className={ModalStyle.modal_content}>
        <span className={ModalStyle.close} onClick={onClose}>
          &times;
        </span>
                <h2>{product.title}</h2>
                <img src={product.img} alt={product.title} />
                <ul className={ModalStyle.desc}>
                    {product.full_desc.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Modal;