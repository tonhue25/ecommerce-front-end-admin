import axios from 'axios';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { admin_url, user_url } from '../../services/base_url';
import * as constant from '../../services/constant';
import Toast from '../../utils/Toast';

import Moment from 'moment';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import * as CartService from '../../services/CartService';
import * as InvoiceService from '../../services/InvoiceService';
import { employees, list } from '../../services/link_redirect';
function CartDetails() {
    let { id } = useParams();
    const [dataEmployees, setDataEmployees] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [cart, setCart] = useState();
    const [searchState, setSearchState] = useState();

    // get employees in shipping department
    useEffect(() => {
        const getEmployees = async () => {
            axios
                .post(`${admin_url}/${employees}/${list}`, {
                    departmentId: [constant.shipping],
                })
                .then(function (response) {
                    if (response.data.http_code == constant.SUCCESS) {
                        setDataEmployees(response.data.data.list);
                        setSearchState(response.data.data.list[0].id);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getEmployees();
    }, []);

    const handleClickCancel = (cartId) => {
        setIsUpdate(true);
        let employeeConfirm = JSON.parse(localStorage.getItem('accessToken')).data.account.id;
        axios({
            method: 'put',
            url: `${user_url}/carts`,
            data: {
                id: cartId,
                state: constant.CANCEL,
                dateDelivery: new Date(),
                employeeConfirmId: employeeConfirm,
            },
        })
            .then(function (response) {
                setIsUpdate(true);
                if (response.data.http_code == constant.SUCCESS) {
                    Toast('success', 'Success!');
                }
                setIsUpdate(false);
            })
            .catch(function (error) {
                setIsUpdate(false);
            });
        setIsUpdate(false);
    };

    const handleConfirm = (cartId) => {
        setIsUpdate(true);
        let employeeConfirm = JSON.parse(localStorage.getItem('accessToken')).data.account.id;
        axios({
            method: 'put',
            url: `${user_url}/carts`,
            data: {
                id: cartId,
                state: constant.DELIVERING,
                dateDelivery: new Date(),
                employeeConfirmId: employeeConfirm,
                employeeDeliveryId: searchState,
            },
        })
            .then(function (response) {
                setIsUpdate(true);
                if (response.data.http_code == constant.SUCCESS) {
                    Toast('success', 'Success!');
                }
                setIsUpdate(false);
            })
            .catch(function (error) {
                setIsUpdate(false);
            });
        setIsUpdate(false);
    };

    const handleChangeState = (e) => {
        setSearchState(e.target.value);
    };

    const [dataInvoice, setDataInvoice] = useState({
        taxCode: '',
        employeeId: '',
        cartId: '',
    });

    const componentRef = useRef();
    const saveInvoice = () => {
        dataInvoice.employeeId = JSON.parse(localStorage.getItem('accessToken')).id;
        dataInvoice.cartId = id;
        if (cart.customer.taxCode) {
            dataInvoice.taxCode = cart.customer.taxCode;
        }
        axios({
            method: 'post',
            url: `${admin_url}/invoices`,
            data: dataInvoice,
        })
            .then(function (response) {
                Toast('success', 'Success!');
                setTimeout(() => handlePrint(), 3000);
                setTimeout(() => setIsUpdate(true), 6000);
            })
            .catch(function (error) {
                Toast('error', error);
            });
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Invoice Detail',
    });

    const [invoice, setInvoice] = useState();
    useEffect(() => {
        const getOne = async () => {
            const result = await InvoiceService.getOne(id);
            setInvoice(result.data);
            return result.data;
        };
        getOne();
    }, [isUpdate]);

    useEffect(() => {
        const getOne = async () => {
            const response = await CartService.getOne(id);
            if (response.data.http_code == constant.SUCCESS) {
                setCart(response.data.data);
            }
        };
        getOne();
    }, [isUpdate]);

    const showData = (cart) => {
        if (cart.cartDetails.length > 0) {
            const Items = [];
            for (let i = 0; i < cart.cartDetails.length; i++) {
                Items.push(
                    <tr key={i}>
                        <td
                            style={{
                                width: '10%',
                                justifyContent: 'center',
                            }}
                        >
                            <p className="avatar-lg ">
                                <img src={cart.cartDetails[i].productImage} className="avatar-img rounded-circle" />
                            </p>
                        </td>
                        <td>{cart.cartDetails[i].productName}</td>
                        <td>x {cart.cartDetails[i].quantity}</td>
                        <td>
                            <CurrencyFormat
                                value={cart.cartDetails[i].price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ '}
                            />
                        </td>
                        <td>
                            <CurrencyFormat
                                value={cart.cartDetails[i].quantity * cart.cartDetails[i].price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ '}
                            />
                        </td>
                    </tr>,
                );
            }
            return Items;
        }
    };

    return (
        <div className="main-panel">
            <ToastContainer />
            <div className="content">
                <div className="page-inner">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <div className="col-md-6 col-lg-4">
                                            <div className="form-group form-group-default">
                                                {/* {cart ? ( */}
                                                <div className="form-group">
                                                    <label>Nhân viên giao hàng</label>
                                                    <select
                                                        className="form-control form-control"
                                                        onChange={handleChangeState}
                                                    >
                                                        {dataEmployees.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                                // selected={item.id === cart.deliveryId}
                                                            >
                                                                {item.id + ' - ' + item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* ) : (<></> */}
                                                {/* )} */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-6"></div>
                                        <div className="col-md-2 col-lg-2">
                                            {invoice ? (
                                                <Link to={`/invoice/${id}`} style={{ color: 'white' }}>
                                                    <button
                                                        onClick={() => saveInvoice()}
                                                        className="btn btn-primary btn-round ml-auto"
                                                    >
                                                        View Invoice
                                                    </button>
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={() => saveInvoice()}
                                                    className="btn btn-primary btn-round ml-auto"
                                                >
                                                    Export Invoice
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div ref={componentRef}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }} className="m-4">
                                        <h3>ORDER DETAILS</h3>
                                    </div>
                                    <div className="card-header">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            {cart ? (
                                                <>
                                                    <div className="col-md-4 col-lg-4">
                                                        <h5>Customer Name: {cart.customerName}</h5>
                                                        <h5>Email: {cart.emailReceiver}</h5>

                                                        <h5>Phone Number: {cart.phoneNumber}</h5>
                                                        <h5>Address: {cart.addressDelivery}</h5>
                                                    </div>
                                                    <div className="col-md-4 col-lg-4">
                                                        <h5>Confirm Employee: {cart.confirmName}</h5>
                                                        <h5>Shipper: {cart.deliveryName}</h5>
                                                        <h5>Paid: {cart.isPaid === 'true' ? 'Yes' : 'No'}</h5>
                                                        <h5>
                                                            Order date: {Moment(cart.createDate).format('DD/MM/YYYY')}
                                                        </h5>
                                                        <h5>
                                                            Delivery date:{' '}
                                                            {cart.dateDelivery ? (
                                                                Moment(cart.dateDelivery).format('DD/MM/YYYY')
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </h5>
                                                        <h5>Status : {cart.state}</h5>
                                                    </div>
                                                    {invoice ? (
                                                        <></>
                                                    ) : (
                                                        <div className="col-md-4 col-lg-4">
                                                            <h5>
                                                                Export Date :
                                                                {Moment(new Date()).format(' dddd, DD/MM/YYYY h:mm:ss')}
                                                            </h5>
                                                            <h5>
                                                                Export Employee :{' '}
                                                                {JSON.parse(localStorage.getItem('accessToken')).name}
                                                            </h5>
                                                            <h5>Status : {cart.state}</h5>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <></>
                                            )}
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
                                                {cart ? (
                                                    <>
                                                        <tbody>
                                                            {showData(cart)}
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
                                                                            value={cart.totalVND || ''}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                            suffix={' đ '}
                                                                        />
                                                                    </h3>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row p-3" style={{ display: 'flex', justifyContent: 'center' }}>
                                        {cart ? (
                                            cart.state == constant.WAIT ? (
                                                <>
                                                    <div>
                                                        <button
                                                            className="btn btn-primary btn-round ml-auto mr-5"
                                                            onClick={() => handleConfirm(id)}
                                                        >
                                                            <i className="fa fa-check" /> Xác nhận
                                                        </button>

                                                        <button
                                                            className="btn btn-danger btn-round ml-auto"
                                                            onClick={() => handleClickCancel(id)}
                                                        >
                                                            <i className="fa fa-trash" /> Hủy
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            )
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
        </div>
    );
}

export default CartDetails;
