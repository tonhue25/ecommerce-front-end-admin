import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import { user_url } from '../../services/base_url';
import * as CustomerService from '../../services/CustomerService';
import { customers } from '../../services/link_redirect';
import Redirect from '../../utils/Redirect';
import Toast, { toast_error, toast_success, toast_warning } from '../../utils/Toast';
import { CUSTOMER, SUCCESS } from '../../services/constant';
function UpdateCustomer() {
    let { customerId } = useParams();
    const [data, setData] = useState({
        id: '',
        email: '',
        name: '',
        address: '',
        phoneNumber: '',
        taxCode: '',
        accountId: '',
        roleId: CUSTOMER,
        status: 'true',
        password: '',
    });

    useEffect(() => {
        if (customerId != null) {
            const getOne = async () => {
                const result = await CustomerService.getOne(customerId);
                setData(result.data.data);
                return result.data;
            };
            getOne();
        }
    }, []);

    const [isUpdate, setIsUpdate] = useState(() => {
        if (customerId == null) {
            return false;
        } else {
            return true;
        }
    });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        data.roleId = CUSTOMER;
        data.password = '';
        const url = `${user_url}/${customers}`;
        if (data.id === '') {
            Toast(toast_warning, 'Vui lòng nhập chứng minh nhân dân!');
            return;
        }
        if (data.email === '') {
            Toast(toast_warning, 'Vui lòng nhập email!');
            return;
        }
        if (data.name === '') {
            Toast(toast_warning, 'Vui lòng nhập tên!');
            return;
        }
        if (data.address === '') {
            Toast(toast_warning, 'Vui lòng nhập địa chỉ!');
            return;
        }
        if (data.phoneNumber === '') {
            Toast(toast_warning, 'Vui lòng nhập số điện thoại!');
            return;
        } else {
            axios
                .put(url, data)
                .then((response) => {
                    if (response.data.http_code == SUCCESS) {
                        Toast(toast_success, 'success!');
                        setTimeout(() => Redirect(`/${customers}`), 3000);
                    }
                })
                .catch((error) => {
                    Toast(toast_error, 'opps!');
                });
        }
    };

    const handleClickCancel = (e) => {
        e.preventDefault();
        swal({
            title: 'Hủy chỉnh sửa?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setTimeout(() => Redirect(`/${customers}`), 3000);
            }
        });
    };

    return (
        <div className="main-panel">
            <ToastContainer />
            <div className="content">
                <div className="page-inner">
                    <div className="row" style={{ textAlign: 'left' }}>
                        <div className="col-md-12">
                            <form>
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">
                                            {isUpdate ? 'Cập nhật thông tin' : 'Thêm khách hàng mới'}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="id">ID</label>
                                                    <input
                                                        disabled={isUpdate ? true : false}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập chứng minh nhân dân"
                                                        name="id"
                                                        value={data.id || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="name">Tên khách hàng</label>
                                                    <input
                                                        disabled={isUpdate ? true : false}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập tên"
                                                        name="name"
                                                        value={data.name || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-check mb-1 mt-1">
                                                    <label>Trạng thái</label>
                                                    <br />
                                                    <div style={{ textAlign: 'center' }}>
                                                        <div name="status" onChange={onChange}>
                                                            <label className="form-radio-label mr-5 cursor_pointer">
                                                                <input
                                                                    className="form-radio-input mr-2 cursor_pointer"
                                                                    type="radio"
                                                                    value="true"
                                                                    name="status"
                                                                    onChange={onChange}
                                                                    checked={data.status === 'true'}
                                                                />
                                                                Active
                                                            </label>
                                                            <label className="form-radio-label mr-5 cursor_pointer">
                                                                <input
                                                                    className="form-radio-input mr-2 cursor_pointer"
                                                                    type="radio"
                                                                    value="false"
                                                                    name="status"
                                                                    onChange={onChange}
                                                                    checked={data.status === 'false'}
                                                                />
                                                                Inactive
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập email"
                                                        name="email"
                                                        onChange={onChange}
                                                        value={data.email || ''}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="quantity">Số điện thoại</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập số điện thoại"
                                                        name="phoneNumber"
                                                        onChange={onChange}
                                                        value={data.phoneNumber || ''}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="taxCode">Mã số thuế</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập mã số thuế"
                                                        name="taxCode"
                                                        onChange={onChange}
                                                        value={data.taxCode || ''}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="address">Địa chỉ</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={8}
                                                        name="address"
                                                        onChange={onChange}
                                                        value={data.address || ''}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-action" style={{ textAlign: 'center' }}>
                                        <button type="submit" className="btn btn-success mr-5" onClick={handleUpdate}>
                                            {isUpdate ? 'Cập nhập' : 'Thêm'}
                                        </button>
                                        <button type="cancel" className="btn btn-danger" onClick={handleClickCancel}>
                                            Hủy
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateCustomer;
