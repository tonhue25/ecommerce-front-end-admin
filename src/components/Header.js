function Header() {
    return (
        <div className="main-header">
            <div className="logo-header" data-background-color="blue">
                <button
                    className="navbar-toggler sidenav-toggler ml-auto"
                    type="button"
                    data-toggle="collapse"
                    data-target="collapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon">
                        <i className="icon-menu" />
                    </span>
                </button>
                <button className="topbar-toggler more">
                    <i className="icon-options-vertical" />
                </button>
                <div className="nav-toggle">
                    <button className="btn btn-toggle toggle-sidebar">
                        <i className="icon-menu" />
                    </button>
                </div>
            </div>
            <nav className="navbar navbar-header navbar-expand-lg" data-background-color="blue2">
                <div className="container-fluid">
                    <div className="collapse" id="search-nav"></div>
                    <ul className="navbar-nav topbar-nav ml-md-auto align-items-center"></ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;
