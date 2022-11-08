import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_SIZE } from '../../services/constant';
import CustomerItem from './../Customer/CustomerItem';
import * as CustomerService from '../../services/CustomerService';
import { Pagination } from '@mui/material';
import Toast from '../../utils/Toast';
import { ToastContainer } from 'react-toastify';
function Customers() {
    const [page, setPage] = useState(1);
    const [customers, setCustomers] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [itemDisplay, setItemDisplay] = useState(PAGE_SIZE);
    const [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        const getListCustomers = async () => {
            const result = await CustomerService.getListCustomers(page, itemDisplay, searchValue, 'false');
            setCustomers(result.data.list);
            setTotalPages(result.data.totalPages);
            return result.data;
        };
        getListCustomers();
    }, [page, itemDisplay, searchValue, isDelete]);

    function ShowCustomers(customers) {
        return customers.map((item) => (
            <CustomerItem key={item.cardId} data={item} deleteItem={() => deleteItem(item.cardId, item.status)} />
        ));
    }

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
                                                    value={searchValue}
                                                    onChange={(e) => setSearchValue(e.target.value)}
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
                                            <tbody>{ShowCustomers(customers)}</tbody>
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
export default Customers;
