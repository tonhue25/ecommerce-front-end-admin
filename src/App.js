import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Layout from './Layout/Layout';
import Carts from './screens/Cart/Carts';
import CartDetails from './screens/CartDetail/CartDetails';
import Categories from './screens/Category/Categories';
import UpdateCategory from './screens/Category/UpdateCategory';
import Customers from './screens/Customer/Customers';
import UpdateCustomer from './screens/Customer/UpdateCustomer';
import Employees from './screens/Employee/Employees';
import UpdateEmployee from './screens/Employee/UpdateEmployee';
import Login from './screens/Login';
import Products from './screens/Product/Products';
import UpdateProduct from './screens/Product/UpdateProduct';
function App() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

    if (!accessToken || accessToken == null) {
        return <Login setAccessToken={setAccessToken} />;
    }

    return (
        <div>
            <Header accessToken={accessToken} setAccessToken={setAccessToken} />
            <Routes>
                <Route path={'/'} element={<Layout />}>
                    <Route path={''} element={<Products />}></Route>
                    <Route path={'categories'} element={<Categories />}></Route>
                    <Route path={'invoices'} element={<Carts />}></Route>
                    <Route path={'detail-invoices/:id'} element={<CartDetails />}></Route>
                    <Route path={'login'} element={<Login setAccessToken={setAccessToken} />}></Route>
                    <Route path={'update-product'} element={<UpdateProduct />}></Route>
                    <Route path={'update-product/:productId'} element={<UpdateProduct />}></Route>

                    <Route path={'update-category'} element={<UpdateCategory />}></Route>
                    <Route path={'update-category/:categoryId'} element={<UpdateCategory />}></Route>

                    <Route path={'employees'} element={<Employees />}></Route>
                    <Route path={'update-employee'} element={<UpdateEmployee />}></Route>
                    <Route path={'update-employee/:employeeId'} element={<UpdateEmployee />}></Route>

                    <Route path={'customers'} element={<Customers />}></Route>
                    <Route path={'update-customer'} element={<UpdateCustomer />}></Route>
                    <Route path={'update-customer/:customerId'} element={<UpdateCustomer />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
