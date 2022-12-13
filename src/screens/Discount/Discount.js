import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_SIZE, PAGE_ONE, SUCCESS } from '../../services/constant';
import * as DiscountService from '../../services/DiscountService';
import { Pagination } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import Moment from 'moment';
import axios from 'axios';
function Discount() {
    const [page, setPage] = useState(PAGE_ONE);
    const [discounts, setDiscounts] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [itemDisplay, setItemDisplay] = useState(PAGE_SIZE);

    // useEffect(() => {
    //     const getList = async () => {
    //         const result = await DiscountService.getList(page, itemDisplay);
    //         setDiscounts(result.data.list);
    //         setTotalPages(result.data.totalPages);
    //         return result.data.list;
    //     };
    //     getList();
    // }, []);
    const [dataSubmit, setDataSubmit] = useState({
        size: PAGE_SIZE,
        page: page,
        employeeConfirm: '',
    });
    useEffect(() => {
        dataSubmit.page = page;
        const getList = async () => {
            axios
                .post(`http://localhost:8080/api/admin/discounts/list`, dataSubmit)
                .then(function (response) {
                    if (response.data.http_code == SUCCESS) {
                        setDiscounts(response.data.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getList();
    }, [dataSubmit, page]);

    function handleChange(page) {
        setPage(page);
    }

    const showData = (data) => {
        if (data.size > 0) {
            const Items = [];
            for (let i = 0; i < data.size; i++) {
                Items.push(
                    // <CustomerItem
                    //     key={data.list[i].id}
                    //     data={data.list[i]}
                    //     deleteItem={() => deleteItem(data.list[i].id, data.list[i].status)}
                    // />,
                    // {discounts.map((data) => (
                    <tr key={data.list[i].id}>
                        <td>{data.list[i].id}</td>
                        <td>{Moment(data.list[i].startDate).format('DD-MM-YYYY')}</td>
                        <td>{Moment(data.list[i].endDate).format('DD-MM-YYYY')}</td>
                        <td>{data.list[i].employee.name}</td>
                        <td>
                            <div className="form-button-action">
                                <Link to={'/update-discount/' + data.list[i].id}>
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
                    </tr>,
                );
            }
            return Items;
        }
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
                                            <tbody>{showData(discounts)}</tbody>
                                        </table>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {discounts.totalPages > 1 ? (
                                            <Pagination
                                                color="primary"
                                                count={discounts.totalPages}
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
