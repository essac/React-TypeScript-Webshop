import React, { useContext } from 'react';
import './ShowCart.css';
import CartContext from '../../context/Cart';
import { IMovie } from '../../components/Products/Products';
import Form from '../../components/Form/Form';

export default function ShowCart() {

    const shopCartContext = useContext(CartContext);

    const totalPrice = shopCartContext.shopCart.reduce((priceTotal: number, item: IMovie) => priceTotal + item.price, 0);

    const removeItem = (index: number) => {
        const currentShopCart = shopCartContext.shopCart.slice();
        currentShopCart.splice(index, 1);
        shopCartContext.removeShopCartItem(currentShopCart);
    }

    return (
        <div className='ShowCartBlock'>
            <React.Fragment>
                {shopCartContext.shopCart.map((item: IMovie, i: number) => {
                    return (
                        <div className='ShowCartBlock-child' key={i}>
                            <span className='ShowCartBlock-info'><i className="fa fa-tag"></i> Title: {item.name} - Price: <span className='span-price'>{item.price} Kr</span> </span>
                            <button type="button" className="btn btn-danger cartremove-btn" onClick={() => { removeItem(i) }}><i className="fa fa-trash"></i> Remove</button>
                        </div>
                    );
                })}

                <div className='ShowCartBlock-total'>
                    <p className='cart-totalprice'><i className="fa fa-shopping-cart"></i> Cart - Total Price: <span className='span-totalprice'>{totalPrice} Kr</span></p>

                    <p className='availablePayment'><i className="fa fa-info-circle"></i> We support the following payment methods: <i className='fa fa-cc-visa'></i> <i className='fa fa-cc-mastercard'></i> <i className='fa fa-paypal'></i></p>

                    <p className='details'><i className="fa fa-info-circle"></i> Fill out the fields below to complete your order:</p>

                    < Form />
                </div>
            </React.Fragment>
        </div >
    );
}
