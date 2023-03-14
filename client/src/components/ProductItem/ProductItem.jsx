import React from 'react';
import Button from "../Button/button";
import ProductItemStyle from './ProductItem.module.css'

const ProductItem = ({product, onAdd, onCardClick}) => {
    const onAddHandler = () => {
        onAdd(product)
    }

    const onCardClickHandler = () => {
        onCardClick(product)
    }

    return (
        <div className={ProductItemStyle.product}>
            <div onClick={onCardClickHandler}>
            <div className={ProductItemStyle.category}>{product.category}</div>
            <div>
                <img src = {product.img} alt={product.title}/>
            </div>
            <div className={ProductItemStyle.title}>{product.title}</div>
            <div className={ProductItemStyle.description}>{product.description}</div>
            </div>
        <Button className={ProductItemStyle.add_button} onClick={onAddHandler}>
            Заказать
        </Button>
        </div>
    );
};

export default ProductItem;