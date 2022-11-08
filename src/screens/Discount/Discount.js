import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_SIZE, PAGE_ONE } from '../../services/constant';
import * as DiscountService from '../../services/DiscountService';
import { Pagination } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import Moment from 'moment';
function Discount() {
    const [page, setPage] = useState(PAGE_ONE);
    const [discounts, setDiscounts] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [itemDisplay, setItemDisplay] = useState(PAGE_SIZE);

    useEffect(() => {
        const getList = async () => {
            const result = await DiscountService.getList(page, itemDisplay);
            setDiscounts(result.data.list);
            setTotalPages(result.data.totalPages);
            return result.data.list;
        };
        getList();
    }, []);

    function handleChange(page) {
        setPage(page);
    }

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
                                            <h3>Discount management</h3>
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
                                        <div className="col-md-6 col-lg-4"></div>
                                        <br />
                                        <div className="col-md-4 col-lg-6"></div>
                                        <br />
                                        <div className="col-md-2 col-lg-2">
                                            <Link to={'/update-discount'} style={{ color: 'white' }}>
                                                <button className="btn btn-primary btn-round ml-auto">
                                                    <i className="fa fa-plus " /> Add
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Employee</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {discounts.map((data) => (
                                                    <tr key={data.id}>
                                                        <td>{data.id}</td>
                                                        <td>{Moment(data.startDate).format('DD-MM-YYYY')}</td>
                                                        <td>{Moment(data.endDate).format('DD-MM-YYYY')}</td>
                                                        <td>{data.employee.name}</td>
                                                        <td>
                                                            <div className="form-button-action">
                                                                <Link to={'/update-discount/' + data.id}>
                                                                    <button
                                                                        type="button"
                                                                        data-toggle="tooltip"
                                                                        title="Edit"
                                                                        className="btn btn-link btn-primary btn-lg"
                                                                    >
                                                                        <i className="fa fa-edit"></i>
                                                                    </button>
                                                                </Link>
                                                            </div>
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

export default Discount;
