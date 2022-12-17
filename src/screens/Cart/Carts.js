import { Pagination } from '@mui/material';
import axios from 'axios';
import Moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { user_url } from '../../services/base_url';
import { CANCEL, DELIVERED, DELIVERING, PAGE_ONE, PAGE_SIZE, SUCCESS, WAIT } from '../../services/constant';
import { carts, detail_cart, list } from '../../services/link_redirect';
import * as StateService from '../../services/StateService';
function Carts() {
    const [page, setPage] = useState(PAGE_ONE);
    const [totalPages, setTotalPages] = useState();
    const [searchState, setSearchState] = useState([]);
    const [dataCarts, setDataCarts] = useState([]);
    const [states, setStates] = useState({});

    useEffect(() => {
        const getStates = async () => {
            const response = await StateService.getAllStates();
            if (response.data.http_code == SUCCESS) {
                setStates(response.data.data);
            }
        };
        getStates();
    }, []);

    const handleChangeState = (e) => {
        setSearchState(e.target.value);
    };

    const [dataSubmitCart, setDataSubmitCart] = useState({
        states: [],
        size: PAGE_SIZE,
        page: page,
    });

    useEffect(() => {
        dataSubmitCart.states = [searchState];
        if (searchState.length == 0) {
            dataSubmitCart.states = [WAIT, DELIVERING, DELIVERED, CANCEL];
        }
        dataSubmitCart.page = page;
        axios
            .post(`${user_url}/${carts}/${list}`, dataSubmitCart)
            .then(function (response) {
                if (response.data.http_code == SUCCESS) {
                    setDataCarts(response.data.data.list);
                    setTotalPages(response.data.data.totalPages);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [dataSubmitCart, searchState, page]);

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
                                        <div
                                            className="col-md-12 col-lg-12"
                                            style={{ display: 'flex', justifyContent: 'center' }}
                                        >
                                            <h3>Customer-Order management</h3>
                                        </div>
                                    </div>
                                </div>
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
                                    <div className="table-responsive">
                                        <table className="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '10px' }}>ID</th>
                                                    <th>Customer</th>
                                                    <th>Order date</th>
                                                    <th>Delivery date</th>
                                                    <th>Confirm</th>
                                                    <th>Shipper</th>
                                                    <th>Address</th>
                                                    <th>Paid?</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataCarts.map((item) => (
                                                    <tr key={item.id}>
                                                        <td style={{ width: '10px' }}>{item.id}</td>
                                                        <td>{item.customerName}</td>
                                                        <td>{Moment(item.createDate).format('DD/MM/YYYY')}</td>
                                                        <td>
                                                            {item.dateDelivery
                                                                ? Moment(item.dateDelivery).format('DD/MM/YYYY')
                                                                : ''}
                                                        </td>
                                                        <td>{item.confirmName}</td>
                                                        <td>{item.deliveryName}</td>
                                                        <td>{item.addressDelivery}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className={
                                                                    item.isPaid === 'true'
                                                                        ? 'btn-primary btn btn-link btn-lg'
                                                                        : 'btn-danger btn btn-link btn-lg'
                                                                }
                                                            >
                                                                {item.isPaid === 'true' ? (
                                                                    <i className="fa fa-check"></i>
                                                                ) : (
                                                                    <i className="fa fa-times" />
                                                                )}
                                                            </button>
                                                        </td>
                                                        <td>{item.state}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                title="View"
                                                                className="btn btn-link btn-primary btn-lg"
                                                            >
                                                                <Link to={`${detail_cart}/${item.id}`}>
                                                                    <i className="fa fa-eye"></i>
                                                                </Link>
                                                            </button>
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

export default Carts;
