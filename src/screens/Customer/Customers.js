import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_ONE, PAGE_SIZE } from '../../services/constant';
import CustomerItem from './../Customer/CustomerItem';
import * as CustomerService from '../../services/CustomerService';
import { Pagination } from '@mui/material';
import Toast from '../../utils/Toast';
import { ToastContainer } from 'react-toastify';
import { admin_url } from '../../services/base_url';
import axios from 'axios';
import { customers } from '../../services/link_redirect';
function Customers() {
    const [page, setPage] = useState(PAGE_ONE);
    const [isDelete, setIsDelete] = useState(false);
    const [data, setData] = useState([]);

    const [dataSubmit, setDataSubmit] = useState({
        size: PAGE_SIZE,
        page: page,
        search: '',
    });

    useEffect(() => {
        dataSubmit.page = page;
        const getList = async () => {
            axios
                .post(`${admin_url}/${customers}`, dataSubmit)
                .then(function (response) {
                    setData(response.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getList();
    }, [dataSubmit, page, isDelete]);

    const showData = (data) => {
        if (data.size > 0) {
            const Items = [];
            for (let i = 0; i < data.size; i++) {
                Items.push(
                    <CustomerItem
                        key={data.list[i].id}
                        data={data.list[i]}
                        deleteItem={() => deleteItem(data.list[i].id, data.list[i].status)}
                    />,
                );
            }
            return Items;
        }
    };

    useEffect(() => {
        if (dataSubmit.search) {
            setPage(PAGE_ONE);
        }
    }, [dataSubmit.search]);

    const onChange = (e) => {
        setDataSubmit({ ...dataSubmit, [e.target.name]: e.target.value });
    };

    const deleteItem = (id, status) => {
        if (status == 'true') {
            const deleteItem = async () => {
                const result = await CustomerService.deleteItem(id);
                setIsDelete(true);
                Toast('success', 'Đã xóa khách hàng!!');
            };
            deleteItem();
            setIsDelete(false);
        } else {
            Toast('warning', 'Khách hàng này đã xóa!!');
        }
    };

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
                                            <h3>Customer management</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4">
                                            <div className="input-icon">
                                                <input
                                                    name="search"
                                                    value={dataSubmit.search || ''}
                                                    onChange={onChange}
                                                    // value={searchValue}
                                                    // onChange={(e) => setSearchValue(e.target.value)}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nhập tên..."
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
                                            <Link to={'/update-customer'} style={{ color: 'white' }}>
                                                <button className="btn btn-primary btn-round ml-auto">
                                                    <i className="fa fa-plus " /> Thêm khách hàng
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Mã</th>
                                                    <th>Tên</th>
                                                    <th>Email</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Trạng thái</th>
                                                    <th>Địa chỉ</th>
                                                    <th>Trạng thái</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>{showData(data)}</tbody>
                                        </table>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {data.totalPages > 1 ? (
                                            <Pagination
                                                color="primary"
                                                count={data.totalPages}
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
export default Customers;
