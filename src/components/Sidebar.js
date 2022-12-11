import { Link } from 'react-router-dom';
function Sidebar() {
    return (
        <div className="sidebar sidebar-style-2">
            <div className="sidebar-wrapper scrollbar scrollbar-inner">
                <div className="sidebar-content">
                    <div className="user">
                        <div className="info">
                            <a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
                                <span>
                                    {'Welcome : ' + JSON.parse(localStorage.getItem('accessToken')).data.account.name}
                                    <span className="user-level">
                                        {JSON.parse(localStorage.getItem('accessToken')).data.roles}
                                    </span>
                                    <span className="caret" />
                                </span>
                            </a>
                            <div className="clearfix" />
                        </div>
                    </div>

                    <ul className="nav nav-primary">
                        <>
                            <li className="nav-item">
                                <Link to={'/'}>
                                    <p>Product</p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={'/categories'}>
                                    <p>Category</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/discounts'}>
                                    <p>Discount</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/employees'}>
                                    <p>Employee</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/customers'}>
                                    <p>Customer</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/invoices'}>
                                    <p>Customer Order</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/return-orders'}>
                                    <p>Return Order</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a data-toggle="collapse" href="#tables">
                                    <i className="fas fa-table" />
                                    <p>Statistic</p>
                                    <span className="caret" />
                                </a>
                                <div className="collapse" id="tables">
                                    <ul className="nav nav-collapse">
                                        <li>
                                            <Link to={'/top-products'}>
                                                <p>Best seller</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/revenue-statistics'}>
                                                <p>Revenue</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/inventory-product'}>
                                                <p>Inventory</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link to={'/orders'}>
                                    <p>Supplier Order</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/imports'}>
                                    <p>Import</p>
                                </Link>
                            </li>
                        </>
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
