import React, {useState} from 'react'
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/telegram";
import ProductsStyle from './Products.module.css'

const products = [
    {id:1, img:'statics/productImages/1.jpg', title: 'ЭЛЕКТРОМАГНИТНЫЙ РАСХОДОМЕР РУДНИЧНОГО ИСПОЛНЕНИЯ MERA EFM EX', category: 'Расходомеры. Рудничное исполнение', description: 'Сертифицирован в России для применения на рудниках и шахтах во взрывоопасных зонах'},
    {id:2, img:'statics/productImages/2.jpg', title: 'ЭЛЕКТРОМАГНИТНЫЙ РАСХОДОМЕР MERA EFM', category: 'Расходомеры. Общепромышленное исполнение', description: 'Широкий спектр применения и возможностей в любой сфере промышленности'},
    {id:3, img:'statics/productImages/3.jpg', title: 'ЭЛЕКТРОМАГНИТНЫЙ РАСХОДОМЕР MERA SFM', category: 'Расходомеры. Общепромышленное исполнение', description: 'Оптимальное соотношение цены и качества'},
    {id:4, img:'statics/productImages/4.png', title: 'РЕЛЕ ПОТОКА MERA FS306', category: 'Реле потока. Вода', description: 'Универсальность, DN 32 … 200, сменные лопасти из нержавеющей стали, микропереключатель для обеспечения высокой нагрузки на контакт'},
    {id:5, img:'statics/productImages/5.jpg', title: 'РЕЛЕ ПОТОКА MERA FS780', category: 'Реле потока. Вода', description: 'Простое укорачивание лопасти на необходимую длину, лопасть из нержавеющей стали, простой непосредственный монтаж в существующий трубопровод' },
    {id:6, img:'statics/productImages/6.jpg', title: 'РЕЛЕ ПОТОКА MERA FS781', category: 'Реле потока. Воздух', description: 'Фланцевое соединение, лопасть из нержавеющей стали, регулируемая точка переключения, микропереключатель для обеспечения высокой нагрузки на контакт'},
]

const Products = () => {
    const {telegram} = useTelegram()
    const [addedItems, setAddedItems] = useState([])
    const onAdd = (product) => {
        const addedInCart = addedItems.find(item => item.id === product.id)
        let newItems = []

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
            telegram.MainButton.setParams({text: 'Заказать'})
        }
    }

    return (
        <div className={ProductsStyle.list}>
            {products.map(item => (
                <ProductItem product={item} onAdd={onAdd} className={ProductsStyle.item}/>
            ))}
            
        </div>
    );
};

export default Products;