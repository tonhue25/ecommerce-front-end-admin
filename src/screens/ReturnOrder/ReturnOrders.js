import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_SIZE, PAGE_ONE } from '../../services/constant';
import { Pagination } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import * as ReturnOrderService from '../../services/ReturnOrderService';

import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import Moment from 'moment';
function ReturnOrders() {
    const [page, setPage] = useState(PAGE_ONE);
    const [products, setProducts] = useState([]);
    const [itemDisplay, setItemDisplay] = useState(PAGE_SIZE);

    useEffect(() => {
        const getList = async () => {
            const result = await ReturnOrderService.getList(page, itemDisplay, '');
            setProducts(result.data.data);
            return result.data;
        };
        getList();
    }, [page, itemDisplay]);

    function handleChange(page) {
        setPage(page);
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'List Return-Order',
    });

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
                                        <div
                                            className="col-md-12 col-lg-12"
                                            style={{ display: 'flex', justifyContent: 'center' }}
                                        >
                                            <h3>Return order management</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <div className="col-md-6 col-lg-4"></div>
                                        <div className="col-md-4 col-lg-6"></div>
                                        <div className="col-md-2 col-lg-2">
                                            <div className="form-group form-group-default">
                                                <div className="form-group">
                                                    <label>Items</label>
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
                                        <div className="col-md-6 col-lg-4"></div>
                                        <br />
                                        <div className="col-md-4 col-lg-4"></div>
                                        <div className="col-md-2 col-lg-2"></div>
                                        <div className="col-md-2 col-lg-2">
                                            <button
                                                onClick={() => handlePrint()}
                                                className="btn btn-primary btn-round ml-auto"
                                            >
                                                Export
                                            </button>
                                        </div>
                                        <br />
                                    </div>
                                    <div ref={componentRef}>
                                        <div className="table-responsive">
                                            <table className="display table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Create Date</th>
                                                        <th>Employee</th>
                                                        <th>Invoice Id</th>
                                                        <th>customerName</th>
                                                        <th>address</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.list ? (
                                                        products.list.map((data) => (
                                                            <tr>
                                                                <td>{data.id}</td>
                                                                <td>{Moment(data.createDate).format('YYYY-MM-DD')}</td>

                                                                <td>{data.employee ? data.employee.name : ''}</td>
                                                                <td>{data.invoice ? data.invoice.id : ''}</td>
                                                                <td>{data.cart.customerName}</td>
                                                                <td>{data.cart.customer.address}</td>
                                                                <td>{data.cart.state}</td>
                                                                <td style={{ width: '5%', justifyContent: 'center' }}>
                                                                    <div className="form-button-action">
                                                                        <Link
                                                                            to={'/detail-return-orders/' + data.cart.id}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                data-toggle="tooltip"
                                                                                title="Edit"
                                                                                className="btn btn-link btn-primary btn-lg"
                                                                                data-original-title="Edit Task"
                                                                            >
                                                                                <i className="fa fa-edit"></i>
                                                                            </button>
                                                                        </Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <></>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {products.totalPages > 1 ? (
                                            <Pagination
                                                color="primary"
                                                count={products.totalPages}
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

export default ReturnOrders;
