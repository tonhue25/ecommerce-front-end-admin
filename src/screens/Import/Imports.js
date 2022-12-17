import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ImportService from '../../services/ImportService';
import { Pagination } from '@mui/material';
import { PAGE_SIZE } from '../../services/constant';
import Moment from 'moment';
function Orders() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [imports, setImports] = useState([]);

    useEffect(() => {
        const getImports = async () => {
            const result = await ImportService.getImports(page, PAGE_SIZE);
            setImports(result.data.list);
            console.log(result.data.list);
            setTotalPages(result.data.totalPages);
            return result.data.list;
        };
        getImports();
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
                                            <Link to={'/detail-import'} style={{ color: 'white' }}>
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
                                                    <th>ID</th>
                                                    <th>Order ID</th>
                                                    <th>Create Date</th>
                                                    <th>Employee</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {imports.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.order.id}</td>
                                                        <td>{item.createDate}</td>
                                                        <td>{item.employee.name}</td>
                                                        <td>
                                                            <Link to={`/detail-import/${item.id}`}>
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
