import React from 'react';
import Button from "../Button/button";
import ProductItemStyle from './ProductItem.module.css'
import axios from "axios";

const ProductItem = ({product, onAdd, onCardClick}) => {
    /*const onAddHandler = () => {
        onAdd(product)
    }*/

    const onCardClickHandler = () => {
        onCardClick(product)
    }

    const addToCart = async (product) => {
        try {
            const response = await axios.post(`http://localhost:4000/cart/${product.id}`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addToCartHandler = () => {
        addToCart(product);
    };

    return (
        <div className={ProductItemStyle.product}>
            <div onClick={onCardClickHandler}>
            <div className={ProductItemStyle.category}>{product.category}</div>
            <div className={ProductItemStyle.item}>
                <img src = {product.img} alt={product.title}/>
            </div>
            <div className={ProductItemStyle.title}>{product.title}</div>
            <div className={ProductItemStyle.description}>{product.description}</div>
            </div>
        <Button className={ProductItemStyle.add_button} onClick={addToCartHandler}>
            Заказать
        </Button>
        </div>
    );
};

export default ProductItem;