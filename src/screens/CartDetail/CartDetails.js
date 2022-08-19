import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../services/constant';
import * as CartDetailService from '../../services/CartDetailService';
import axios from 'axios';
import * as constant from '../../services/constant';
import { user_url } from '../../services/base_url';
function CartDetails() {
    let { id } = useParams();

    const [searchState, setSearchState] = useState(0);
    const [cartDetails, setCartDetails] = useState([]);
    const [states, setStates] = useState();
    const [totals, setTotals] = useState();

    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        const getDetailCart = async () => {
            const result = await CartDetailService.getDetailCart(id);
            setCartDetails(result.data.list);
            setTotals(result.data.total);
            setStates(result.data.stateOfCart);
            return result.data.list;
        };
        getDetailCart();
    }, [searchState, isUpdate]);

    const handleConfirm = (cartId, status) => {
        let statusChange;
        if (status == constant.ACTIVE) {
            statusChange = constant.WAIT;
        } else if (status == constant.WAIT) {
            statusChange = constant.PAID;
        } else if (status == constant.PAID) {
            statusChange = constant.DELIVERING;
        } else if (status == constant.DELIVERING) {
            statusChange = constant.DELIVERED;
        }
        console.log(statusChange);
        axios({
            method: 'put',
            url: `${user_url}/cart-details/${cartId}`,
            data: {
                status,
                statusChange,
            },
        })
            .then(function (response) {
                setIsUpdate(true);
            })
            .catch(function (error) {
                console.log(error);
            });
        setIsUpdate(false);
        axios
            .put(`http://localhost:8080/api/user/carts/${cartId}?statusChange=${statusChange}`)
            .catch(function (error) {
                console.log(error);
            })
            .then(function (response) {
                setIsUpdate(true);
            })
            .catch(function (error) {
                console.log(error);
            });
        setIsUpdate(false);
    };

    const handleClickCancel = (cartId, status) => {
        let statusChange = constant.CANCEL;
        axios({
            method: 'put',
            url: `${user_url}/cart-details/${cartId}`,
            data: {
                status,
                statusChange,
            },
        })
            .then(function (response) {
                setIsUpdate(true);
            })
            .catch(function (error) {
                console.log(error);
            });
        setIsUpdate(false);
        axios
            .put(`http://localhost:8080/api/user/carts/${cartId}?statusChange=${statusChange}`)
            .catch(function (error) {
                console.log(error);
            })
            .then(function (response) {
                setIsUpdate(true);
            })
            .catch(function (error) {
                console.log(error);
            });
        setIsUpdate(false);
    };

    return (
        <div className="main-panel">
            <div className="content">
                <div className="page-inner">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
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
                                                <h4>Trạng thái : {constant.convertState(states)}</h4>
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
                                                        <td>{data.price} đ</td>
                                                        <td>{data.quantity * data.price} đ</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td></td>
                                                    <td>Tổng tiền</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>{totals} đ</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row p-3" style={{ display: 'flex', justifyContent: 'center' }}>
                                        {states < constant.DELIVERED ? (
                                            <div>
                                                <button
                                                    className="btn btn-primary btn-round ml-auto mr-5"
                                                    onClick={() => handleConfirm(id, states)}
                                                >
                                                    <i className="fa fa-check" /> Xác nhận
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-round ml-auto"
                                                    onClick={() => handleClickCancel(id, states)}
                                                >
                                                    <i className="fa fa-trash" /> Hủy
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

export default CartDetails;
