function Breadcrumb() {
    return (
        <div className="page-header">
            <h4 className="page-title">DataTables.Net</h4>
            <ul className="breadcrumbs">
                <li className="nav-home">
                    <a href="#">
                        <i className="flaticon-home" />
                    </a>
                </li>
                <li className="separator">
                    <i className="flaticon-right-arrow" />
                </li>
                <li className="nav-item">
                    <a href="#">Tables</a>
                </li>
                <li className="separator">
                    <i className="flaticon-right-arrow" />
                </li>
                <li className="nav-item">
                    <a href="#">Datatables</a>
                </li>
            </ul>
        </div>
    );
}

export default Breadcrumb;
