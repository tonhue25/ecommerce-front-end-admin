import Header from './components/Header';
import Products from './screens/Product/Products';
import Layout from './Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Categories from './screens/Category/Categories';
import Carts from './screens/Cart/Carts';
// import Suppliers from './screens/Supplier/Suppliers';
function App() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    return (
        <div>
            <Header accessToken={accessToken} setAccessToken={setAccessToken} />
            <Routes>
                <Route path={'/'} element={<Layout />}>
                    <Route path={''} element={<Products />}></Route>
                    <Route path={'danh-muc'} element={<Categories />}></Route>
                    <Route path={'don-hang'} element={<Carts />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
