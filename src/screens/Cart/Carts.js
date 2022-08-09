import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_SIZE } from '../../services/constant';
import * as StateService from '../../services/StateService';
import Paging from '../../components/Paging';
import * as CartService from '../../services/CartService';
import axios from 'axios';
import CartItem from './CartItem';
function Carts() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [searchState, setSearchState] = useState(0);
    const [itemDisplay, setItemDisplay] = useState(PAGE_SIZE);
    const [carts, setCarts] = useState([]);
    const [states, setStates] = useState({});
    const [length, setLength] = useState();

    const [isConfirm, setIsConfirm] = useState(false);

    useEffect(() => {
        const getAllStates = async () => {
            const result = await StateService.getAllStates();
            setStates(result.data);
            return result.data;
        };
        getAllStates();
    }, []);

    const handleChangeState = (e) => {
        setSearchState(e.target.value);
    };

    useEffect(() => {
        const getAllCarts = async () => {
            const result = await CartService.getAllCarts(searchState);
            setCarts(result.data);
            setLength(result.data.length);
            return result.data;
        };
        getAllCarts();
    }, [searchState, isConfirm]);

    const showState = () => {
        const Items = [];
        for (let i = 0; i < Object.keys(states).length; ++i) {
            Items.push(
                <option
                    onClick={() => setSearchState(Object.keys(states)[i])}
                    key={Object.keys(states)[i]}
                    value={Object.keys(states)[i]}
                >
                    {Object.values(states)[i]}
                </option>,
            );
        }
        return Items;
    };

    // xac nhan don hang.
    // cartid => status.

    const handleClickConfirm = (cartId, status) => {
        let stateChange;
        if (status == 1) {
            stateChange = 2;
        } else if (status == 2) {
            stateChange = 3;
        } else if (status == 3) {
            stateChange = 4;
        } else if (status == 4) {
            stateChange = 5;
        } else if (status == 5) {
            stateChange = 6;
        } else if (status == 6) {
            stateChange = 7;
        } else if (status == 7) {
            stateChange = 8;
        }
        setIsConfirm(true);
        axios
            .put(`http://localhost:8080/api/user/cart-details/${cartId}?status=${status}&statusChange=${stateChange}`)
            .catch(function (error) {
                console.log(error);
            });
        setIsConfirm(false);
        axios.put(`http://localhost:8080/api/user/carts/${cartId}?statusChange=${stateChange}`).catch(function (error) {
            console.log(error);
        });
        setIsConfirm(true);
    };

    const handleClickCancel = (cartId, status) => {
        let stateChange = 7;
        setIsConfirm(true);
        axios
            .put(`http://localhost:8080/api/user/cart-details/${cartId}?status=${status}&statusChange=${stateChange}`)
            .catch(function (error) {
                console.log(error);
            });
        setIsConfirm(false);
        axios.put(`http://localhost:8080/api/user/carts/${cartId}?statusChange=${stateChange}`).catch(function (error) {
            console.log(error);
        });
        setIsConfirm(true);
    };

    const showCart = () => {
        if (length > 0) {
            const Items = [];
            for (let i = 0; i < carts.length; ++i) {
                for (let j = 0; j < carts[i].list.length; ++j) {
                    Items.push(
                        <CartItem
                            key={carts[i].list[j].productId + '' + carts[i].list[j].cartId}
                            data={carts[i].list[j]}
                        />,
                    );
                }
                Items.push(
                    <>
                        <tr>
                            <td>Tổng tiền</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{carts[i].total} đ</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button
                                    className={
                                        carts[i].list[0].status >= 6 || carts[i].list[0].status == 1
                                            ? 'btn btn-primary btn-round ml-auto disabled'
                                            : 'btn btn-primary btn-round ml-auto active'
                                    }
                                    key={carts[i].list[0].cartId + '' + carts[i].list[0].productId}
                                    onClick={() => handleClickConfirm(carts[i].list[0].cartId, carts[i].list[0].status)}
                                >
                                    <i /> Xác nhận
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleClickCancel(carts[i].list[0].cartId, carts[i].list[0].status)}
                                    className={
                                        carts[i].list[0].status >= 6 || carts[i].list[0].status == 1
                                            ? 'btn btn-danger btn-round ml-auto disabled'
                                            : 'btn btn-danger btn-round ml-auto active'
                                    }
                                >
                                    <i /> Hủy
                                </button>
                            </td>
                        </tr>
                    </>,
                );
            }
            return Items;
        }
    };

    return (
        <div className="main-panel">
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
                                                    <label>Danh mục</label>
                                                    <select
                                                        className="form-control form-control"
                                                        onChange={handleChangeState}
                                                    >
                                                        <option value="">Tất cả</option>
                                                        {showState()}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-6"></div>
                                        <div className="col-md-2 col-lg-2">
                                            <div className="form-group form-group-default">
                                                <div className="form-group">
                                                    <label>Số sản phẩm</label>
                                                    <select
                                                        className="form-control"
                                                        onChange={(e) => setItemDisplay(e.target.value)}
                                                    >
                                                        <option>5</option>
                                                        <option>10</option>
                                                        <option>15</option>
                                                        <option>20</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4">
                                            <div className="input-icon">
                                                <input
                                                    value={searchValue}
                                                    onChange={(e) => setSearchValue(e.target.value)}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nhập tên sản phẩm..."
                                                />
                                                <span className="input-icon-addon">
                                                    <i className="fa fa-search" />
                                                </span>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="col-md-4 col-lg-6"></div>
                                        <br />
                                        <div className="col-md-2 col-lg-2">
                                            <button className="btn btn-primary btn-round ml-auto">
                                                <Link to={'/update-product'} style={{ color: 'white' }}>
                                                    <i className="fa fa-plus " /> Add
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Tên khách hàng</th>
                                                    <th>Ảnh</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Số lượng</th>
                                                    <th>Giá</th>
                                                    <th>Trạng thái</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>{showCart()}</tbody>
                                        </table>
                                    </div>
                                    {/* {Paging(page, totalPages, handleClickPageNext)} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carts;
