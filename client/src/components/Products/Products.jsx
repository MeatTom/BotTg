import React, {useState} from 'react'
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/telegram";
import ProductsStyle from './Products.module.css'

const products = [
    {id:1, img:'https://live.staticflickr.com/65535/52745766881_d27c97322d.jpg', title: 'ЭЛЕКТРОМАГНИТНЫЙ РАСХОДОМЕР РУДНИЧНОГО ИСПОЛНЕНИЯ MERA EFM EX', category: 'Расходомеры. Рудничное исполнение', description: 'Сертифицирован в России для применения на рудниках и шахтах во взрывоопасных зонах'},
    {id:2, img:'https://live.staticflickr.com/65535/52746184040_0c6074f8e5.jpg', title: 'ЭЛЕКТРОМАГНИТНЫЙ РАСХОДОМЕР MERA EFM', category: 'Расходомеры. Общепромышленное исполнение', description: 'Широкий спектр применения и возможностей в любой сфере промышленности'},
    {id:3, img:'https://live.staticflickr.com/65535/52745246572_9616ff75b0.jpg', title: 'ЭЛЕКТРОМАГНИТНЫЙ РАСХОДОМЕР MERA SFM', category: 'Расходомеры. Общепромышленное исполнение', description: 'Оптимальное соотношение цены и качества'},
    {id:4, img:'https://live.staticflickr.com/65535/52745246512_a5fca3cc3a.jpg', title: 'РЕЛЕ ПОТОКА MERA FS306', category: 'Реле потока. Вода', description: 'Универсальность, DN 32 … 200, сменные лопасти из нержавеющей стали, микропереключатель для обеспечения высокой нагрузки на контакт'},
    {id:5, img:'https://live.staticflickr.com/65535/52746264003_0098e1be21.jpg', title: 'РЕЛЕ ПОТОКА MERA FS780', category: 'Реле потока. Вода', description: 'Простое укорачивание лопасти на необходимую длину, лопасть из нержавеющей стали, простой непосредственный монтаж в существующий трубопровод' },
    {id:6, img:'https://live.staticflickr.com/65535/52745246482_e8c4ed96f2.jpg', title: 'РЕЛЕ ПОТОКА MERA FS781', category: 'Реле потока. Воздух', description: 'Фланцевое соединение, лопасть из нержавеющей стали, регулируемая точка переключения, микропереключатель для обеспечения высокой нагрузки на контакт'},
]

const Products = () => {
    const {telegram} = useTelegram()
    const [addedItems, setAddedItems] = useState([])
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

    return (
        <div className={ProductsStyle.list}>
            {products.map(item => (
                <ProductItem product={item} onAdd={onAdd} className={ProductsStyle.item}/>
            ))}
            
        </div>
    );
};

export default Products;