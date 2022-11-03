import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as OrderService from '../../services/OrderService';
import { Pagination } from '@mui/material';
import { PAGE_SIZE } from '../../services/constant';

function Orders() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const result = await OrderService.getOrders(page, PAGE_SIZE);
            setOrders(result.data.list);
            setTotalPages(result.data.totalPages);
            return result.data.list;
        };
        getOrders();
    }, [page]);

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
                                        <div className="col-md-6 col-lg-4"></div>
                                        <div className="col-md-4 col-lg-6"></div>
                                        <div className="col-md-2 col-lg-2"></div>
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
