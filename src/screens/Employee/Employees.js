import { Pagination } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { admin_url } from '../../services/base_url';
import { PAGE_ONE, PAGE_SIZE, SUCCESS, WARNING } from '../../services/constant';
import * as DepartmentService from '../../services/DepartmentService';
import * as EmployeeService from '../../services/EmployeeService';
import { employees, update_employees } from '../../services/link_redirect';
import Toast, { toast_success, toast_warning } from '../../utils/Toast';
import EmployeeItem from './../Employee/EmployeeItem';
function Employees() {
    const [page, setPage] = useState(PAGE_ONE);
    const [departments, setDepartments] = useState([]);
    const [searchDepartment, setSearchDepartment] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [data, setData] = useState([]);

    const [dataSubmit, setDataSubmit] = useState({
        size: PAGE_SIZE,
        page: page,
        search: '',
        departmentId: [],
    });

    useEffect(() => {
        dataSubmit.departmentId = [];
        if (searchDepartment.length > 0) {
            dataSubmit.departmentId = [searchDepartment];
        }
        dataSubmit.page = page;
        const getListEmployee = async () => {
            axios
                .post(`${admin_url}/${employees}/list`, dataSubmit)
                .then(function (response) {
                    if (response.data.http_code == SUCCESS) {
                        setData(response.data.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getListEmployee();
    }, [dataSubmit, searchDepartment, page, isDelete]);

    useEffect(() => {
        const getDepartments = async () => {
            const result = await DepartmentService.getAllDepartments();
            if (result.data.http_code == SUCCESS) {
                setDepartments(result.data.data);
            }
        };
        getDepartments();
    }, []);

    const deleteItem = (id, status) => {
        if (id == JSON.parse(localStorage.getItem('accessToken')).data.account.id) {
            Toast(toast_warning, 'not authorized to delete!!');
        }
        if (status == 'true' && !(id == JSON.parse(localStorage.getItem('accessToken')).data.account.id)) {
            const deleteItem = async () => {
                const result = await EmployeeService.deleteItem(id);
                setIsDelete(true);
                Toast(toast_success, 'deleted!!');
            };
            deleteItem();
            setIsDelete(false);
        }
    };

    const handleChangeDepartment = (e) => {
        setSearchDepartment(e.target.value);
    };

    function handleChange(page) {
        setPage(page);
    }

    const showData = (data) => {
        if (data.size > 0) {
            const Items = [];
            for (let i = 0; i < data.size; i++) {
                Items.push(
                    <EmployeeItem
                        key={data.list[i].id}
                        data={data.list[i]}
                        deleteItem={() => deleteItem(data.list[i].id, data.list[i].status)}
                    />,
                );
            }
            return Items;
        }
    };

    const onChange = (e) => {
        setDataSubmit({ ...dataSubmit, [e.target.name]: e.target.value });
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
                                            <h3>Employee management</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <div className="col-md-6 col-lg-4">
                                            <div className="form-group form-group-default">
                                                <div className="form-group">
                                                    <label>Bộ phận</label>
                                                    <select
                                                        className="form-control form-control"
                                                        onChange={handleChangeDepartment}
                                                        name="departmentId"
                                                    >
                                                        <option value={[]}>Tất cả</option>
                                                        {departments.map((item) => (
                                                            <option key={item.id} value={item.id} name="departmentId">
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-6"></div>
                                        <div className="col-md-2 col-lg-2">
                                            <div className="form-group form-group-default">
                                                <div className="form-group">
                                                    <label>Số item hiển thị</label>
                                                    <select name="size" onChange={onChange} className="form-control">
                                                        <option>{PAGE_SIZE}</option>
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
                                        <div className="col-md-6 col-lg-4">
                                            <div className="input-icon">
                                                <input
                                                    name="search"
                                                    value={dataSubmit.search || ''}
                                                    onChange={onChange}
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
                                            <Link to={update_employees} style={{ color: 'white' }}>
                                                <button className="btn btn-primary btn-round ml-auto">
                                                    <i className="fa fa-plus " /> Thêm nhân viên
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
                                                    <th>Ngày sinh</th>
                                                    <th>Địa chỉ</th>
                                                    <th>Bộ phận</th>
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
export default Employees;
