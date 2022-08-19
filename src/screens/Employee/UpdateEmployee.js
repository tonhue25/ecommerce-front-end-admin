import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import { admin_url } from '../../services/base_url';
import axios from 'axios';
import Toast from '../../utils/Toast';
import Redirect from '../../utils/Redirect';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import * as EmployeeService from '../../services/EmployeeService';
import * as DepartmentService from '../../services/DepartmentService';
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
        departmentId: 'confirm',
        status: 'true',
    });

    useEffect(() => {
        if (employeeId != null) {
            const getOne = async () => {
                const result = await EmployeeService.getOne(employeeId);
                setData(result.data);
                return result.data;
            };
            getOne();
        }
    }, []);

    const [isUpdate, setIsUpdate] = useState(() => {
        if (employeeId == null) {
            return false;
        } else {
            return true;
        }
    });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const getAllDepartments = async () => {
            const result = await DepartmentService.getAllDepartments();
            setDepartments(result.data);
            return result.data;
        };
        getAllDepartments();
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        data.roleId = 'employee';
        const url = `${admin_url}/employees`;
        axios
            .post(url, data)
            .then((response) => {
                if (isUpdate) {
                    Toast('success', 'Chỉnh sửa thành công!');
                } else {
                    Toast('success', 'Thêm mới thành công!');
                }
                setTimeout(() => Redirect('employees'), 3000);
            })
            .catch((error) => {
                Toast('error', 'Có lỗi xảy ra! Vui lòng thử lại!');
            });
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
                setTimeout(() => Redirect('employees'), 1000);
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
                                        <div className="card-title">Add new employee</div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="id">employee id</label>
                                                    <input
                                                        disabled={isUpdate ? true : false}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter id"
                                                        name="id"
                                                        value={data.id || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter name"
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
                                                                selected={item.id === data.departmentId}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-check mb-1 mt-1">
                                                    <label>Status</label>
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
                                                        placeholder="Enter price"
                                                        name="email"
                                                        onChange={onChange}
                                                        value={data.email || ''}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="quantity">Salary</label>
                                                    <input
                                                        disabled={isUpdate ? true : false}
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter quantity"
                                                        name="salary"
                                                        onChange={onChange}
                                                        value={data.salary || ''}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description">Address</label>
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
