import Moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as CartDetailService from '../../services/CartDetailService';
import * as InvoiceService from '../../services/InvoiceService';
import CurrencyFormat from 'react-currency-format';
function Invoice() {
    let { id } = useParams();
    const [data, setData] = useState();
    useEffect(() => {
        const getOne = async () => {
            const result = await InvoiceService.getOne(id);
            setData(result.data);
            return result.data;
        };
        getOne();
    }, []);

    const [cartDetails, setCartDetails] = useState([]);
    useEffect(() => {
        const getDetailCart = async () => {
            const result = await CartDetailService.getDetailCart(id);
            setCartDetails(result.data);
            return result.data;
        };
        getDetailCart();
    }, [id]);

    return (
        <div className="main-panel">
            <ToastContainer />
            <div className="content">
                <div className="page-inner">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }} className="m-4">
                                        <h3>INVOICE DETAILS</h3>
                                    </div>
                                    {data ? (
                                        <>
                                            <div className="card-header">
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <div className="col-md-4 col-lg-4">
                                                        <h5>Customer Name: {data.cart.customerName}</h5>
                                                        <h5>Email: {data.cart.emailRevicer}</h5>

                                                        <h5>Phone Number: {data.cart.phoneNumber}</h5>
                                                        <h5>Address: {data.cart.addressDelivery}</h5>
                                                    </div>
                                                    <div className="col-md-4 col-lg-4">
                                                        <h5>Confirm Employee: {data.cart.confirmName}</h5>
                                                        <h5>Shipper: {data.cart.deliveryName}</h5>
                                                        <h5>Paid: {data.cart.isPaid === 'true' ? 'Yes' : 'No'}</h5>
                                                        <h5>
                                                            Order date:{' '}
                                                            {Moment(data.cart.createDate).format('DD/MM/YYYY')}
                                                        </h5>
                                                        <h5>
                                                            Delivery date:{' '}
                                                            {Moment(data.cart.dateDelivery).format('DD/MM/YYYY')}
                                                        </h5>
                                                    </div>
                                                    <div className="col-md-4 col-lg-4">
                                                        <h5>
                                                            Export Date :
                                                            {Moment(data.createDate).format(
                                                                ' dddd, DD/MM/YYYY h:mm:ss',
                                                            )}
                                                        </h5>
                                                        <h5>Export Employee : {data.employee.name}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table className="display table table-striped table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Image</th>
                                                                <th>Name</th>
                                                                <th>Quantity</th>
                                                                <th>Price</th>
                                                                <th>Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cartDetails.list.map((data, index) => (
                                                                <tr key={index}>
                                                                    <td
                                                                        style={{
                                                                            width: '10%',
                                                                            justifyContent: 'center',
                                                                        }}
                                                                    >
                                                                        <p className="avatar-lg ">
                                                                            <img
                                                                                src={data.productImage}
                                                                                className="avatar-img rounded-circle"
                                                                            />
                                                                        </p>
                                                                    </td>
                                                                    <td>{data.productName}</td>
                                                                    <td>x {data.quantity}</td>
                                                                    <td>
                                                                        <CurrencyFormat
                                                                            value={data.price}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                            suffix={' đ '}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <CurrencyFormat
                                                                            value={data.quantity * data.price}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                            suffix={' đ '}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}{' '}
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    <h3 style={{ fontWeight: 'bolder' }}>Total</h3>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>
                                                                    <h3 style={{ fontWeight: 'bolder' }}>
                                                                        <CurrencyFormat
                                                                            value={cartDetails.total}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                            suffix={' đ '}
                                                                        />
                                                                    </h3>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Invoice;
