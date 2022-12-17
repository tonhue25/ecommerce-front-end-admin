import { Pagination } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_ONE, PAGE_SIZE, SUCCESS } from '../../services/constant';
function Orders() {
    const [page, setPage] = useState(PAGE_ONE);
    const [totalPages, setTotalPages] = useState();
    const [orders, setOrders] = useState([]);

    const [dataSubmit, setDataSubmit] = useState({
        size: PAGE_SIZE,
        page: page,
    });

    useEffect(() => {
        dataSubmit.page = page;
        const getOrderDetails = async () => {
            axios
                .post(`http://localhost:8080/api/admin/orders/list`, dataSubmit)
                .then(function (response) {
                    if (response.data.http_code == SUCCESS) {
                        setOrders(response.data.data.list);
                        setTotalPages(response.data.data.totalPages);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getOrderDetails();
    }, [dataSubmit, page]);

    function handleChange(page) {
        setPage(page);
    }

    const onChange = (e) => {
        setDataSubmit({ ...dataSubmit, [e.target.name]: e.target.value });
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
                                        <div className="col-md-6 col-lg-4"></div>
                                        <div className="col-md-4 col-lg-6"></div>
                                        <div className="col-md-2 col-lg-2">
                                            <div className="form-group form-group-default">
                                                <div className="form-group">
                                                    <label>Items</label>
                                                    <select name="size" onChange={onChange} className="form-control">
                                                        <option>{PAGE_SIZE}</option>
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
                                        <div className="col-md-6 col-lg-4"></div>
                                        <br />
                                        <div className="col-md-4 col-lg-6"></div>
                                        <br />
                                        <div className="col-md-2 col-lg-2">
                                            <Link to={'/detail-order'} style={{ color: 'white' }}>
                                                <button className="btn btn-primary btn-round ml-auto">
                                                    <i className="fa fa-plus " /> Thêm
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Đơn hàng</th>
                                                    <th>Ngày mua</th>
                                                    <th>Nhà cung cấp</th>
                                                    <th>Nhân viên lập</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.purchaseDate}</td>
                                                        <td>{item.supplier.name}</td>
                                                        <td>{item.employee.name}</td>
                                                        <td>
                                                            <Link to={`/detail-order/${item.id}`}>
                                                                <button className="btn btn-link btn-primary btn-lg">
                                                                    <i className="fa fa-eye"></i>
                                                                </button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
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

export default Orders;
