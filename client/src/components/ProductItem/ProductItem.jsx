import React from 'react';
import Button from "../Button/button";
import ProductItemStyle from './ProductItem.module.css'

const ProductItem = ({product,onAdd}) => {
    const onAddHandler = () => {
        onAdd(product)
    }

    return (
        <div className={ProductItemStyle.product}>
            <div className={ProductItemStyle.category}>{product.category}</div>
            <div>
                <img src = {product.img} alt={product.title}/>
            </div>
            <div className={ProductItemStyle.title}>{product.title}</div>
            <div className={ProductItemStyle.description}>{product.description}</div>

        <Button className={ProductItemStyle.add_button} onClick={onAddHandler}>
            Заказать
        </Button>
        </div>
    );
};

export default ProductItem;