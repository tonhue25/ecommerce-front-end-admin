import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
function Layout() {
    return (
        <div className="App">
            <div className="wrapper">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
