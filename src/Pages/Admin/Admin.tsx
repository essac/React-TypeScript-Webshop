import React, { useState, useEffect, useCallback } from 'react'
import './Admin.css';

export interface IOrderAdmin {
    id: number;
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
}

export default function Admin() {
    const defaultorders: IOrderAdmin[] = [];
    const [orders, setOrders] = useState(defaultorders);

    const fetchOrders = useCallback(
        () => {
            fetch('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=777')
                .then(r => r.json())
                .then((r: IOrderAdmin[]) => {
                    setOrders(r);
                });
        },
        [],
    );

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const deleteOrder = (id: any) => {
        fetch('https://medieinstitutet-wie-products.azurewebsites.net/api/orders/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => fetchOrders());
    }

    return (
        <React.Fragment>
            <div className='admin-block'>
                <div className='Admin-block-parent'>
                    <div className='Admin-block-title'>
                        <p><i className="fa fa-list"></i> PRODUCT ORDERS:</p>
                    </div>
                    {orders.map((item: IOrderAdmin, i: number) => {
                        return (
                            <React.Fragment key={i}>
                                <div className='Admin-block-child'>
                                    <p className='order-id'><i className="fa fa-id-card"></i> ID: {item.id}</p>
                                    <p className='order-createdOn'>Created on: {item.created}</p>
                                    <p className='order-createdBy'>Created by: {item.createdBy}</p>
                                    <p className='order-payment'>Payment Method: {item.paymentMethod}</p>
                                    <p className='order-price'>Total Price: {item.totalPrice} Kr</p>
                                    <p className='order-status'>Status: {item.status}</p>

                                    <button type='button' className='btn btn-danger admin-deleteOrder' onClick={() => { deleteOrder(item.id) }}><i className="fa fa-trash"></i> DELETE ORDER!</button>
                                    <p className='admin-warning'><i className="fa fa-info-circle"></i> Once the order is removed, it can't be restored.</p>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </React.Fragment>
    );
}
