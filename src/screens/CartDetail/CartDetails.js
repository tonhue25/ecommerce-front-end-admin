import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../services/constant';
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
function CartDetails() {
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
        } else if (status === constant.DELIVERING) {
            statusChange = constant.DELIVERED;
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
                Toast('success', 'Cập nhật thành công!');
                setTimeout(() => Redirect('invoices'), 3000);
            })
            .catch(function (error) {
                setIsUpdate(false);
            });
        setIsUpdate(false);
    };

    // console.log(searchState);
    // useEffect(() => {
    //     if (cart) {
    //         setSearchState(cart.deliveryId);
    //     } else {
    //         setSearchState('shipping001');
    //     }
    // }, [id]);

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
                                    <div className="d-flex align-items-center">
                                        <div className="col-md-6 col-lg-4">
                                            <div className="form-group form-group-default">
                                                <div className="form-group">
                                                    <label>Nhân viên giao hàng</label>
                                                    <select
                                                        className="form-control form-control"
                                                        onChange={handleChangeState}
                                                    >
                                                        {employees.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                                selected={item.id === cart.deliveryId}
                                                            >
                                                                {item.id + ' - ' + item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-6"></div>
                                        <div className="col-md-2 col-lg-2"></div>
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
                                                <h3>Thông tin đơn hàng</h3>
                                            </div>
                                        </div>
                                        <div
                                            className="col-md-6 col-lg-6"
                                            style={{ display: 'flex', justifyContent: 'space-around' }}
                                        >
                                            <br />
                                            <div className="input-icon">
                                                <h4>Trạng thái : {states}</h4>
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
                                        {states != constant.DELIVERED ? (
                                            <div>
                                                <button
                                                    className="btn btn-primary btn-round ml-auto mr-5"
                                                    onClick={() => handleConfirm(id, states)}
                                                >
                                                    <i className="fa fa-check" /> Xác nhận
                                                </button>

                                                {/* <button
                                                className="btn btn-danger btn-round ml-auto"
                                                onClick={() => handleClickCancel(id, states)}
                                            >
                                                <i className="fa fa-trash" /> Hủy
                                            </button> */}
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

export default CartDetails;
