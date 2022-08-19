import { Link } from 'react-router-dom';
function Sidebar() {
    return (
        <div className="sidebar sidebar-style-2">
            <div className="sidebar-wrapper scrollbar scrollbar-inner">
                <div className="sidebar-content">
                    <div className="user">
                        <div className="avatar-sm float-left mr-2">
                            <img src="../../assets/img/profile.jpg" alt="..." className="avatar-img rounded-circle" />
                        </div>
                        <div className="info">
                            <a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
                                <span>
                                    Hizrian
                                    <span className="user-level">Administrator</span>
                                    <span className="caret" />
                                </span>
                            </a>
                            <div className="clearfix" />
                            <div className="collapse in" id="collapseExample">
                                <ul className="nav">
                                    <li>
                                        <a href="#profile">
                                            <span className="link-collapse">My Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#edit">
                                            <span className="link-collapse">Edit Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#settings">
                                            <span className="link-collapse">Settings</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul className="nav nav-primary">
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
                            <Link to={'/'}>
                                <p>Nhà cung cấp</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/invoices'}>
                                <i className="fas fa-desktop" />
                                <p>Đơn hàng</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
