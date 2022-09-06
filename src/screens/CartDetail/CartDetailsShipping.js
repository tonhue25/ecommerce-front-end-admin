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
import Moment from 'moment';
function CartDetailsShipping() {
    let { id } = useParams();
    const [employees, setEmployees] = useState([]);
    const [cartDetails, setCartDetails] = useState([]);
    const [states, setStates] = useState();
    const [totals, setTotals] = useState();
    const [isUpdate, setIsUpdate] = useState(false);

    const [searchState, setSearchState] = useState(
        useEffect(() => {
            const getOne = async () => {
                const result = await CartService.getOne(id);
                setCart(result.data);
                return result.data.deliveryId;
            };
            getOne();
        }, []),
    );
    const [cart, setCart] = useState();

    useEffect(() => {
        const getDetailCart = async () => {
            const result = await CartDetailService.getDetailCart(id);
            setCartDetails(result.data.list);
            setTotals(result.data.total);
            setStates(result.data.state);
            return result.data.list;
        };
        getDetailCart();
    }, [isUpdate]);

    useEffect(() => {
        const getOne = async () => {
            const result = await CartService.getOne(id);
            setCart(result.data);
            console.log(result.data);
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
        if (status === constant.DELIVERING) {
            statusChange = constant.DELIVERED;
        }
        setIsUpdate(true);
        let employeeDelivery = JSON.parse(localStorage.getItem('accessToken')).id;
        axios({
            method: 'put',
            url: `${admin_url}/carts/${id}`,
            data: {
                id: cartId,
                employeeConfirm: cart.confirmId,
                employeeDelivery: employeeDelivery,
                state: statusChange,
            },
        })
            .then(function (response) {
                setIsUpdate(true);
                Toast('success', 'Cập nhật thành công!');
                setTimeout(() => Redirect('my-invoices'), 3000);
            })
            .catch(function (error) {
                setIsUpdate(false);
            });
        setIsUpdate(false);
    };

    const handleChangeState = (e) => {
        setSearchState(e.target.value);
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
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <h3>THÔNG TIN ĐƠN HÀNG</h3>
                                    </div>
                                </div>
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        {cart ? (
                                            <>
                                                <div className="col-md-6 col-lg-6">
                                                    <h5>Tên khách hàng: {cart.customerName}</h5>
                                                    <h5>Email: {cart.emailRevicer}</h5>

                                                    <h5>Số điện thoại: {cart.phoneNumber}</h5>
                                                    <h5>Địa chỉ: {cart.addressDelivery}</h5>
                                                </div>
                                                <div className="col-md-6 col-lg-6">
                                                    <h5>Nhân viên xác nhận: {cart.confirmName}</h5>
                                                    <h5>Nhân viên vận chuyển: {cart.deliveryName}</h5>
                                                    <h5>
                                                        Đã thanh toán:{' '}
                                                        {cart.isPaid === 'true' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                                    </h5>
                                                    <h5>Ngày đặt: {Moment(cart.createDate).format('DD/MM/YYYY')}</h5>
                                                    <h5>Ngày giao: {Moment(cart.dateDelivery).format('DD/MM/YYYY')}</h5>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row p-3">
                                        <div
                                            className="col-md-6 col-lg-6"
                                            style={{ display: 'flex', justifyContent: 'flex-start' }}
                                        >
                                            <br />
                                            <div className="input-icon">
                                                <h3>Danh sách sản phẩm</h3>
                                            </div>
                                        </div>
                                        <div
                                            className="col-md-6 col-lg-6"
                                            style={{ display: 'flex', justifyContent: 'space-around' }}
                                        >
                                            <br />
                                            <div className="input-icon">
                                                <h4>Trạng thái: {states}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Ảnh</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Số lượng</th>
                                                    <th>Giá</th>
                                                    <th>Tổng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartDetails.map((data, index) => (
                                                    <tr key={index}>
                                                        <td style={{ width: '10%', justifyContent: 'center' }}>
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
                                                    <td>Tổng tiền</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <CurrencyFormat
                                                            value={totals}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={' đ '}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row p-3" style={{ display: 'flex', justifyContent: 'center' }}>
                                        {states == constant.DELIVERING ? (
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

export default CartDetailsShipping;
