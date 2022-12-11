import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as CartDetailService from '../../services/CartDetailService';
import * as EmployeeService from '../../services/EmployeeService';
import * as CartService from '../../services/CartService';
import axios from 'axios';
import * as constant from '../../services/constant';
import { admin_url } from '../../services/base_url';
import CurrencyFormat from 'react-currency-format';
import Redirect from '../../utils/Redirect';
import Toast from '../../utils/Toast';
import { ToastContainer } from 'react-toastify';

import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import Moment from 'moment';
import * as InvoiceService from '../../services/InvoiceService';
import { Link } from 'react-router-dom';
function DetailReturnOrder() {
    let { id } = useParams();

    const [employees, setEmployees] = useState([]);
    const [states, setStates] = useState();
    const [isUpdate, setIsUpdate] = useState(false);
    const [cart, setCart] = useState();
    const [searchState, setSearchState] = useState();
    // useEffect(() => {
    //     const getOne = async () => {
    //         const result = await CartService.getOne(id);
    //         setCart(result.data);
    //         return result.data.deliveryId;
    //     };
    //     getOne();
    // }, []),

    const [dataCartDetails, setDataCartDetails] = useState();
    useEffect(() => {
        const getDetailCart = async () => {
            const result = await CartDetailService.getDetailCart(id);
            setDataCartDetails(result.data);
            return result.data;
        };
        getDetailCart();
    }, [isUpdate]);

    useEffect(() => {
        const getOne = async () => {
            const result = await CartService.getOne(id);
            setCart(result.data);
            return result.data;
        };
        getOne();
    }, []);

    useEffect(() => {
        const getAllEmployeeByDepartment = async () => {
            const result = await EmployeeService.getAllEmployeeByDepartment('shipping');
            setEmployees(result.data);
            return result.data;
        };
        getAllEmployeeByDepartment();
    }, []);

    const handleConfirm = (cartId, status) => {
        let statusChange;
        if (status === constant.WAIT) {
            statusChange = constant.DELIVERING;
        }
        setIsUpdate(true);
        let employeeConfirm = JSON.parse(localStorage.getItem('accessToken')).id;
        axios({
            method: 'put',
            url: `${admin_url}/carts/${id}`,
            data: {
                id: cartId,
                employeeConfirm: employeeConfirm,
                employeeDelivery: searchState,
                state: statusChange,
            },
        })
            .then(function (response) {
                setIsUpdate(true);
                Toast('success', 'Success!');
                if (JSON.parse(localStorage.getItem('accessToken')).departmentId == 'shipping') {
                    setTimeout(() => Redirect('my-invoices'), 3000);
                }
                if (JSON.parse(localStorage.getItem('accessToken')).departmentId == 'confirm') {
                    setTimeout(() => Redirect('invoices'), 3000);
                }
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
            url: `${admin_url}/return-orders`,
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
                                        <div className="col-md-6 col-lg-4"></div>
                                        <div className="col-md-4 col-lg-6"></div>
                                        <div className="col-md-2 col-lg-2">
                                            <button
                                                onClick={() => saveInvoice()}
                                                className="btn btn-primary btn-round ml-auto"
                                            >
                                                Return
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div ref={componentRef}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }} className="m-4">
                                        <h3>RETURN ORDER DETAILS</h3>
                                    </div>
                                    <div className="card-header">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            {cart ? (
                                                <>
                                                    <div className="col-md-4 col-lg-4">
                                                        <h5>Customer Name: {cart.customerName}</h5>
                                                        <h5>Email: {cart.emailRevicer}</h5>

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
                                                            {Moment(cart.dateDelivery).format('DD/MM/YYYY')}
                                                        </h5>
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
                                                            <h5>Status : {dataCartDetails.state}</h5>
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
                                                {dataCartDetails ? (
                                                    <>
                                                        <tbody>
                                                            {dataCartDetails.list.map((data, index) => (
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
                                                            ))}
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
                                                                            value={dataCartDetails.total}
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
                                        <div className="row p-3" style={{ display: 'flex', justifyContent: 'center' }}>
                                            {states == constant.WAIT &&
                                            JSON.parse(localStorage.getItem('accessToken')).departmentId ==
                                                'confirm' ? (
                                                <div>
                                                    <button
                                                        className="btn btn-primary btn-round ml-auto mr-5"
                                                        onClick={() => handleConfirm(id, states)}
                                                    >
                                                        <i className="fa fa-check" /> Xác nhận
                                                    </button>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                            {states == constant.DELIVERING &&
                                            JSON.parse(localStorage.getItem('accessToken')).departmentId ==
                                                'shipping' ? (
                                                <div>
                                                    <button
                                                        className="btn btn-primary btn-round ml-auto mr-5"
                                                        onClick={() => handleConfirm(id, states)}
                                                    >
                                                        <i className="fa fa-check" /> Đã giao
                                                    </button>
                                                </div>
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
        </div>
    );
}

export default DetailReturnOrder;
