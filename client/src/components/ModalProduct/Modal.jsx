import React from 'react';
import ModalStyle from './Modal.module.css';
import axios from "axios";

const Modal = ({ product, onClose, showModal }) => {

    const [productInfo, setProductInfo] = React.useState(null);

   React.useEffect(() => {
        const getProductInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/products/${product.id}`);
                console.log(response)
                setProductInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProductInfo();
    }, [product.id]);

    return (
        <div className={ModalStyle.modal} style={{display: showModal ? 'none' : 'block'}}>
            <div className={ModalStyle.modal_content}>
        <span className={ModalStyle.close} onClick={onClose}>
          &times;
        </span>
                {productInfo ? (
                    <>
                <h2>{productInfo.title}</h2>
                <img src={productInfo.img} alt={productInfo.title} />
                        <ul className={ModalStyle.desc}>
                            {productInfo.desc_full.split(';').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
            </>
            ) : (
            <p>Loading...</p>
            )}
            </div>
        </div>
    );
};

export default Modal;