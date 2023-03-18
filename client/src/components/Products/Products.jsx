import React, {useState} from 'react'
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/telegram";
import ProductsStyle from './Products.module.css'
import Modal from "../ModalProduct/Modal";
import axios from 'axios';
import Cart from "../Cart/Cart";


const Products = () => {
    const {telegram} = useTelegram()
    const [products, setProducts] = useState([]);
    const [addedItems, setAddedItems] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

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

        if (addedInCart) {
            newItems = addedItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
        } else {
            newItems = [...addedItems, { ...product, quantity: 1 }]
        }

        setAddedItems(newItems)

        if (newItems.length === 0) {
            telegram.MainButton.hide()
        } else {
            telegram.MainButton.show()
            telegram.MainButton.setParams({ text: 'Оформить заказ', onClick: openCart })
        }
    }

    const onCardClickHandler = (product) => {
        setSelectedProduct(product);
    }

    const closeModal = () => {
        setSelectedProduct(null);
    }

    const openCart = () => {
        setIsCartOpen(true);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:4000/order', {
                name,
                phone,
                items: addedItems,
            });
            closeCart();
        } catch (error) {
            console.error(error);
        }
    };

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <div className={ProductsStyle.list}>
            {products.map(item => (
                <ProductItem key={item.id} id={item.id} product={item} onAdd={onAdd} onCardClick={onCardClickHandler} className={ProductsStyle.item}/>
            ))}
            {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
            {isCartOpen && (
                <div className={ProductsStyle.cart}>
                    <Cart addedItems={addedItems} onClose={closeCart} onSubmit={handleSubmit} setName={setName} setPhone={setPhone} />
                </div>
            )}
        </div>
    );
};

export default Products;