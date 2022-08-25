import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_ONE, PAGE_SIZE } from '../../services/constant';
import * as StateService from '../../services/StateService';
import * as CartService from '../../services/CartService';
import { Pagination } from '@mui/material';
import * as constant from '../../services/constant';
function Imports() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [searchState, setSearchState] = useState(0);
    const [searchCustomer, setSearchCustomer] = useState('');
    // const [itemDisplay, setItemDisplay] = useState(PAGE_SIZE);
    const [carts, setCarts] = useState([]);
    const [states, setStates] = useState({});

    // const [isConfirm, setIsConfirm] = useState(false);

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

    // useEffect(() => {
    //     const getAllCarts = async () => {
    //         const result = await CartService.getAllCarts(page, PAGE_SIZE, searchState, searchCustomer);
    //         setCarts(result.data.list);
    //         setTotalPages(result.data.totalPages);
    //         return result.data.list;
    //     };
    //     getAllCarts();
    // }, [searchState, page]);

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

    function handleChange(page) {
        setPage(page);
    }

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
                                        <div className="col-md-2 col-lg-2"></div>
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
                                                <Link to={'/detail-import'} style={{ color: 'white' }}>
                                                    <i className="fa fa-plus " /> Add
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Đơn hàng</th>
                                                    <th>Khách hàng</th>
                                                    <th>Ngày mua</th>
                                                    <th>Ngày giao</th>
                                                    <th>Xác nhận</th>
                                                    <th>Vận chuyển</th>
                                                    <th>Địa chỉ</th>
                                                    <th>Trạng thái</th>
                                                    <th>Sản phẩm</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* {carts.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.customerName}</td>
                                                        <td>{item.createDate}</td>
                                                        <td>{item.dateDelivery}</td>
                                                        <td>{item.confirmName}</td>
                                                        <td>{item.deliveryName}</td>
                                                        <td>{item.addressDelivery}</td>
                                                        <td>{constant.convertState(item.status)}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                data-toggle="tooltip"
                                                                title="Edit"
                                                                className="btn btn-link btn-primary btn-lg"
                                                                data-original-title="Edit Task"
                                                            >
                                                                <Link to={`/detail-invoices/${item.id}`}>
                                                                    <i className="fa fa-eye"></i>
                                                                </Link>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))} */}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {totalPages > 1 ? (
                                            <Pagination
                                                color="primary"
                                                count={totalPages}
                                                size="large"
                                                page={page}
                                                showFirstButton
                                                showLastButton
                                                onChange={(e, page) => handleChange(page)}
                                            />
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

export default Imports;
