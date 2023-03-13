import React from 'react';
import './ProductItem.css'
import Button from "../Button/button";

const ProductItem = ({product, className, onAdd}) => {
    const onAddHandler = () => {
        onAdd(product)
    }

    return (
        <div className={'product' + className}>
            <div className={'category'}>{product.category}</div>
            <div className={'img'}/>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>

        <Button className={'add_button'} onClick={onAddHandler}>Заказать</Button>
        </div>
    );
};

export default ProductItem;