import React, {useState} from 'react'
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/telegram";
import ProductsStyle from './Products.module.css'
import Modal from "../ModalProduct/Modal";
import axios from 'axios';


const Products = () => {
    const {telegram} = useTelegram()
    const [products, setProducts] = useState([]);
    const [addedItems, setAddedItems] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null);

   React.useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:4000/products');
            setProducts(response.data);
        };

        fetchProducts();
    }, []);

    const onAdd = (product) => {
        const addedInCart = addedItems.find(item => item.id === product.id)
        let newItems

        if(addedInCart) {
            newItems = addedItems.filter(item => item.id !== product.id)
        } else {
            newItems = [...addedItems, product]
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            telegram.MainButton.hide()
        } else {
            telegram.MainButton.show()
            telegram.MainButton.setParams({text: 'Оформить заказ'})
        }
    }

    const onCardClickHandler = (product) => {
        setSelectedProduct(product);
    }

    const closeModal = () => {
        setSelectedProduct(null);
    }

    return (
        <div className={ProductsStyle.list}>
            {products.map(item => (
                <ProductItem key={item.id} id={item.id} product={item} onAdd={onAdd} onCardClick={onCardClickHandler} className={ProductsStyle.item}/>
            ))}
            {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
        </div>
    );
};

export default Products;