import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import { admin_url } from '../../services/base_url';
import { EMPLOYEE, SUCCESS } from '../../services/constant';
import * as DepartmentService from '../../services/DepartmentService';
import * as EmployeeService from '../../services/EmployeeService';
import { employees } from '../../services/link_redirect';
import Redirect from '../../utils/Redirect';
import Toast, { toast_error, toast_success, toast_warning } from '../../utils/Toast';
function UpdateEmployee() {
    let { employeeId } = useParams();
    const [departments, setDepartments] = useState([]);
    const [data, setData] = useState({
        id: '',
        email: '',
        name: '',
        birthday: '',
        address: '',
        salary: 0,
        departmentId: '',
        status: 'true',
        roleId: 'EMPLOYEE',
    });

    const [departmentId, setDepartmentId] = useState('');

    const [isUpdate, setIsUpdate] = useState(() => {
        if (employeeId == null) {
            return false;
        } else {
            return true;
        }
    });

    useEffect(() => {
        if (employeeId != null) {
            const getOne = async () => {
                const result = await EmployeeService.getOne(employeeId);
                if (result.data.http_code == SUCCESS) {
                    setData(result.data.data);
                    setDepartmentId(result.data.data.department.id);
                }
                return result.data.data;
            };
            getOne();
        }
    }, [employeeId, isUpdate, departments]);

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const getDepartments = async () => {
            const result = await DepartmentService.getAllDepartments();
            if (result.data.http_code == SUCCESS) {
                setDepartments(result.data.data);
            }
        };
        getDepartments();
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        data.roleId = EMPLOYEE;
        if (!data.departmentId && departmentId) {
            data.departmentId = departmentId;
        }
        if (!data.departmentId && !departmentId) {
            data.departmentId = departments[0].id;
        }
        if (data.id === '') {
            Toast(toast_warning, 'Please enter id!');
            return;
        }
        if (data.email === '') {
            Toast(toast_warning, 'Please enter email!');
            return;
        }
        if (data.name === '') {
            Toast(toast_warning, 'Please enter name!');
            return;
        }
        if (data.birthday === '') {
            Toast(toast_warning, 'Please enter birthday!');
            return;
        }
        if (data.address === '') {
            Toast(toast_warning, 'Please enter address!');
            return;
        }
        if (data.salary === '') {
            Toast(toast_warning, 'Please enter salary!');
            return;
        } else {
            const url = `${admin_url}/${employees}`;
            axios
                .post(url, data)
                .then((response) => {
                    if (response.data.http_code == SUCCESS) {
                        Toast(toast_success, 'Successful!');
                        setTimeout(() => Redirect(`/${employees}`), 3000);
                    }
                })
                .catch((error) => {
                    Toast(toast_error, 'An error occurred! Please try again!');
                });
        }
    };

    const handleClickCancel = (e) => {
        e.preventDefault();
        swal({
            title: 'Cancel?',
            icon: toast_warning,
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setTimeout(() => Redirect(`/${employees}`), 1000);
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
                                            {isUpdate ? 'Cập nhập thông tin nhân viên' : 'Thêm nhân viên mới'}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="id">id</label>
                                                    <input
                                                        disabled={isUpdate ? true : false}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="id"
                                                        name="id"
                                                        value={data.id || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="name">name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="name"
                                                        name="name"
                                                        value={data.name || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        onChange={onChange}
                                                        name="birthday"
                                                        value={data.birthday || ''}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Department</label>
                                                    <select
                                                        className="form-control form-control"
                                                        name="departmentId"
                                                        onChange={onChange}
                                                    >
                                                        {departments.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                                name="departmentId"
                                                                onChange={onChange}
                                                                selected={departmentId === item.id ? true : false}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <option>{data.departmentId}</option>
                                                <div className="form-check mb-1 mt-1">
                                                    <label>status</label>
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
                                            </div>
                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="price">Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập email"
                                                        name="email"
                                                        onChange={onChange}
                                                        value={data.email || ''}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="quantity">salary</label>
                                                    <input
                                                        disabled={isUpdate ? true : false}
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Nhập lương"
                                                        name="salary"
                                                        onChange={onChange}
                                                        value={data.salary || ''}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description">address</label>
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
                                            {isUpdate ? 'Update' : 'Add'}
                                        </button>
                                        <button type="cancel" className="btn btn-danger" onClick={handleClickCancel}>
                                            Cancel
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

export default UpdateEmployee;
