import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as OrderDetailService from '../../services/OrderDetailService';
import Toast, { toast_error } from '../../utils/Toast';

import axios from 'axios';
import { admin_url } from '../../services/base_url';

import Moment from 'moment';
import { SUCCESS } from '../../services/constant';
function DetailImport() {
    let { id } = useParams();
    const [isReload, setIsReload] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [endDate, setEndDate] = useState(new Date());

    const [dataImport, setDataImport] = useState({
        id: '',
        createDate: endDate,
        employeeId: '',
        orderId: '',
    });

    const [dataDetailImport, setDataDetailImport] = useState({
        importId: '',
        productId: '',
        quantity: 0,
        price: 0,
    });

    useEffect(() => {
        const getOrderDetails = async () => {
            axios
                .post(`http://localhost:8080/api/admin/orders/list`, {})
                .then(function (response) {
                    if (response.data.http_code == SUCCESS) {
                        setOrders(response.data.data.list);
                        setOrderId(response.data.data.list[0].id);
                    } else {
                        Toast(toast_error, 'An error occurred! Please try again!');
                    }
                })
                .catch(function (error) {
                    Toast(toast_error, 'An error occurred! Please try again!');
                });
        };
        getOrderDetails();
    }, []);

    const onChangeDetail = (e) => {
        setDataImport({ ...dataImport, [e.target.name]: e.target.value });
        // setOrderId(e.target.value);
    };

    const onChange = (e) => {
        setDataDetailImport({ ...dataDetailImport, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const getDetailOrders = async () => {
            axios
                .get(`http://localhost:8080/api/admin/orders/${orderId}`)
                .then(function (response) {
                    if (response.data.http_code == SUCCESS) {
                        setProducts(response.data.data.orderDetails);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getDetailOrders();
    }, [orderId]);

    const handleSubmitImport = (e) => {
        e.preventDefault();
        dataImport.employeeId = JSON.parse(localStorage.getItem('accessToken')).data.account.id;
        dataImport.createDate = Moment(endDate).format('YYYY-MM-DD');
        dataImport.orderId = orderId;
        const url = `http://localhost:8080/api/admin/imports`;
        console.log(dataImport);
        axios
            .post(url, dataImport)
            .then((response) => {
                if (response.data.http_code == SUCCESS) {
                    setIsReload(true);
                    Toast('success', 'Successful!');
                }
            })
            .catch((error) => {
                Toast('error', 'An error occurred! Please try again!');
            });
    };

    const handleSubmitDetailImport = (e) => {
        setIsReload(true);
        e.preventDefault();
        dataDetailImport.importId = dataImport.id;
        const url = `${admin_url}/import-details`;
        axios
            .post(url, dataDetailImport)
            .then((response) => {
                if (response.data.http_code == SUCCESS) {
                    setIsReload(true);
                    Toast('success', 'Successful!');
                } else {
                    Toast('error', 'An error occurred! Please try again!');
                }
            })
            .catch((error) => {
                Toast('error', 'An error occurred! Please try again!');
            });
        setIsReload(false);
    };

    const [detailImports, setDetailImports] = useState([]);
    useEffect(() => {
        const getDetailOrders = async () => {
            axios
                .get(`http://localhost:8080/api/admin/imports/${dataImport.id || id}`)
                .then(function (response) {
                    if (response.data.http_code == SUCCESS) {
                        setDetailImports(response.data.data.importDetails);
                    }
                })
                .catch(function (error) {});
        };
        getDetailOrders();
    }, [id, isReload]);

    return (
        <div className="main-panel">
            <ToastContainer />
            <div className="content">
                <div className="page-inner">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <form>
                                        <div className="d-flex align-items-center">
                                            <div className="col-md-6 col-lg-3">
                                                <div className="form-group">
                                                    <label htmlFor="id">Import Id</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="id"
                                                        value={id || dataImport.id || ''}
                                                        onChange={onChangeDetail}
                                                    />
                                                </div>
                                            </div>
                                            {id ? (
                                                <></>
                                            ) : (
                                                <>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="form-group">
                                                            <label htmlFor="id">Create Date</label>
                                                            <DatePicker
                                                                style={{ cursor: 'pointer' }}
                                                                placeholderText="dd/mm/yyyy"
                                                                dateFormat="dd/MM/yyyy"
                                                                className="form-control"
                                                                selected={endDate || new Date()}
                                                                onChange={(date: Date) => setEndDate(date)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="form-group form-group-default">
                                                            <div className="form-group">
                                                                <label>Order</label>
                                                                <select
                                                                    className="form-control form-control"
                                                                    name="orderId"
                                                                    onChange={(e) => setOrderId(e.target.value)}
                                                                >
                                                                    {orders.map((item) => (
                                                                        <option
                                                                            key={item.id}
                                                                            value={item.id}
                                                                            name="orderId"
                                                                            selected={item.id === orderId}
                                                                        >
                                                                            {item.id}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-success"
                                                            onClick={handleSubmitImport}
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </form>
                                </div>
                                <form>
                                    {id ? (
                                        <></>
                                    ) : (
                                        <>
                                            <div className="card-header">
                                                <div className="d-flex align-items-center">
                                                    <div className="col-md-4 col-lg-4">
                                                        <div className="form-group">
                                                            <label htmlFor="id">ProductId</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="productId"
                                                                value={dataDetailImport.productId || ''}
                                                                onChange={onChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="id">Quantity</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="quantity"
                                                                value={parseInt(dataDetailImport.quantity) || ''}
                                                                onChange={onChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="id">Price</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="price"
                                                                value={parseInt(dataDetailImport.price) || ''}
                                                                onChange={onChange}
                                                            />
                                                        </div>
                                                        <div className="card-action" style={{ textAlign: 'center' }}>
                                                            <button
                                                                onClick={handleSubmitDetailImport}
                                                                type="submit"
                                                                className="btn btn-success mr-5"
                                                            >
                                                                Add
                                                            </button>
                                                            <button
                                                                type="cancel"
                                                                className="btn btn-danger"
                                                                // onClick={handleClickCancel}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8 col-lg-8">
                                                        <div className="table-responsive">
                                                            <table className="display table table-striped table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Id</th>
                                                                        <th>Image</th>
                                                                        <th>Name</th>
                                                                        <th>Quantity</th>
                                                                        <th>Price</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {products.map((item) => (
                                                                        <tr
                                                                            style={{ cursor: 'pointer' }}
                                                                            onClick={() => {
                                                                                setDataDetailImport(item);
                                                                            }}
                                                                        >
                                                                            <td
                                                                                style={{
                                                                                    width: '15%',
                                                                                    justifyContent: 'center',
                                                                                }}
                                                                            >
                                                                                {item.product.id}
                                                                            </td>

                                                                            <td
                                                                                style={{
                                                                                    width: '15%',
                                                                                    justifyContent: 'center',
                                                                                }}
                                                                            >
                                                                                <p className="avatar-lg ">
                                                                                    <img
                                                                                        src={item.product.image}
                                                                                        className="avatar-img rounded-circle"
                                                                                    />
                                                                                </p>
                                                                            </td>
                                                                            <td>{item.product.name}</td>
                                                                            <td>
                                                                                <CurrencyFormat
                                                                                    value={item.quantity}
                                                                                    displayType={'text'}
                                                                                    thousandSeparator={true}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <CurrencyFormat
                                                                                    value={item.price}
                                                                                    displayType={'text'}
                                                                                    thousandSeparator={true}
                                                                                    suffix={' đ '}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <div className="col-md-12 col-lg-12">
                                                <div className="table-responsive">
                                                    <table className="display table table-striped table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Id</th>
                                                                <th>Image</th>
                                                                <th>Name</th>
                                                                <th>Quantity</th>
                                                                <th>Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {detailImports.map((item) => (
                                                                <tr style={{ cursor: 'pointer' }}>
                                                                    <td
                                                                        style={{
                                                                            width: '15%',
                                                                            justifyContent: 'center',
                                                                        }}
                                                                    >
                                                                        {item.product.id}
                                                                    </td>

                                                                    <td
                                                                        style={{
                                                                            width: '15%',
                                                                            justifyContent: 'center',
                                                                        }}
                                                                    >
                                                                        <p className="avatar-lg ">
                                                                            <img
                                                                                src={item.product.image}
                                                                                className="avatar-img rounded-circle"
                                                                            />
                                                                        </p>
                                                                    </td>
                                                                    <td>{item.product.name}</td>
                                                                    <td>
                                                                        <CurrencyFormat
                                                                            value={item.quantity}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <CurrencyFormat
                                                                            value={item.price}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                            suffix={' đ '}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailImport;
