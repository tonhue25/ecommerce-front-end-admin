import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as EmployeeService from '../services/EmployeeService';
function Sidebar() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [data, setData] = useState({});

    const [isDisplay, setIsDisplay] = useState(true);

    useEffect(() => {
        if (data && data.departmentId == 'shipping') {
            setIsDisplay(false);
        }
    }, [data]);

    useEffect(() => {
        if (accessToken) {
            let employeeId = JSON.parse(localStorage.getItem('accessToken')).id;
            const getOne = async () => {
                const result = await EmployeeService.getOne(employeeId);
                setData(result.data);
                return result.data;
            };
            getOne();
        }
    }, [accessToken]);

    const handleClickLogout = () => {
        localStorage.clear();
    };

    return (
        <div className="sidebar sidebar-style-2">
            <div className="sidebar-wrapper scrollbar scrollbar-inner">
                <div className="sidebar-content">
                    <div className="user">
                        <div className="info">
                            <a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
                                <span>
                                    {'Xin chào :' + data.name}
                                    <span className="user-level">{data.role}</span>
                                    <span className="caret" />
                                </span>
                            </a>
                            <div className="clearfix" />
                        </div>
                    </div>

                    <ul className="nav nav-primary">
                        {isDisplay ? (
                            <>
                                <li className="nav-item">
                                    <Link to={'/'}>
                                        <p>Sản phẩm</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/categories'}>
                                        <p>Danh mục</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/employees'}>
                                        <p>Nhân viên</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/customers'}>
                                        <p>Khách hàng</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/invoices'}>
                                        <p>Đơn hàng</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a data-toggle="collapse" href="#tables">
                                        <i className="fas fa-table" />
                                        <p>Thống kê</p>
                                        <span className="caret" />
                                    </a>
                                    <div className="collapse" id="tables">
                                        <ul className="nav nav-collapse">
                                            <li>
                                                <Link to={'/top-products'}>
                                                    <p>Sản phẩm bán chạy</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/revenue-statistics'}>
                                                    <p>Thống kế doanh thu</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/inventory-product'}>
                                                    <p>Sản phẩm tồn kho</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/orders'}>
                                        <p>Đặt hàng</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/imports'}>
                                        <p>Nhập hàng</p>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to={'/my-invoices'}>
                                        <p>Đơn hàng</p>
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="mx-4 mt-2">
                            <a href="/">
                                <button
                                    className="btn btn-primary btn-block"
                                    onClick={() => {
                                        localStorage.clear();
                                    }}
                                >
                                    <span className="btn-label mr-2">
                                        {' '}
                                        <i className="fas fa-sign-out-alt" />{' '}
                                    </span>
                                    Log out{' '}
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
