import React, { useState, ChangeEvent, useContext } from 'react';
import './Form.css';
import CartContext from '../../context/Cart';
import { IMovie } from '../Products/Products';

export interface IOrder {
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: IRow[];
}

export interface IRow {
    ProductId: number;
    Amount: number;
}

export default function Form() {
    const formShopCartContext = useContext(CartContext);

    const currShopCart = formShopCartContext.shopCart.slice();

    const formTotalPrice = formShopCartContext.shopCart.reduce((priceTotal: number, item: IMovie) => priceTotal + item.price, 0);

    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleChangePayment = (event: ChangeEvent<HTMLSelectElement>) => {
        setPaymentMethod(event.target.value);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const shopCartObj: IRow[] = [];

        currShopCart.forEach((item: IMovie) => {
            shopCartObj.push({ 'ProductId': item.id, 'Amount': 1 });
        });

        const FilteredCurrShopCart: IRow[] = [];

        shopCartObj.forEach((element: IRow) => {
            const checkAvailable = FilteredCurrShopCart.find((el: IRow) => {
                return el.ProductId === element.ProductId;
            });

            if (!!checkAvailable && element.ProductId === checkAvailable.ProductId) {
                const newAmount = checkAvailable.Amount + 1;

                const selectedProductItemIndex = FilteredCurrShopCart.findIndex((el: IRow) => {
                    return el.ProductId === element.ProductId;
                });
                FilteredCurrShopCart[selectedProductItemIndex] = { ...element, Amount: newAmount };
            } else {
                FilteredCurrShopCart.push(element);
            }
        });

        const postObject: IOrder = {
            companyId: 777,
            created: '0001-01-01T00:00:00',
            createdBy: email,
            paymentMethod: paymentMethod,
            totalPrice: formTotalPrice,
            status: 2,
            orderRows: FilteredCurrShopCart
        }

        fetch('http://medieinstitutet-wie-products.azurewebsites.net/api/orders', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(postObject)
        }).then(r => r.json())
            .then(data => {
                console.log(data);
                return formShopCartContext.removeShopCartItem([]);
            })
            .catch(e => console.log('Post field!'));
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <div className='form-parent'>
                    <div className='form-child'>
                        <label className='form-label-email'><i className="fa fa-envelope"></i> Email:</label>
                        <input className='form-input-email' placeholder='Email adress' type='email' name='email' value={email} onChange={handleChangeEmail} required />

                        <select className='form-select' name='options' onChange={handleChangePayment} value={paymentMethod} required>
                            <option value="PayPal">PayPal</option>
                            <option value="MasterCard">Master Card</option>
                            <option value="Visa">Visa Card</option>
                        </select>

                        <button type='submit' className='btn btn-success checkout-btn'>Check-out</button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}
