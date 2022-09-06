import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Layout from './Layout/Layout';
import Carts from './screens/Cart/Carts';
import MyCarts from './screens/Cart/MyCarts';
import CartDetails from './screens/CartDetail/CartDetails';
import CartDetailsShipping from './screens/CartDetail/CartDetailsShipping';
import Categories from './screens/Category/Categories';
import UpdateCategory from './screens/Category/UpdateCategory';
import Comments from './screens/Comment/Comments';
import Customers from './screens/Customer/Customers';
import UpdateCustomer from './screens/Customer/UpdateCustomer';
import Employees from './screens/Employee/Employees';
import UpdateEmployee from './screens/Employee/UpdateEmployee';
import DetailImport from './screens/Import/DetailImport';
import Imports from './screens/Import/Imports';
import UpdateImport from './screens/Import/UpdateImport';
import Login from './screens/Login';
import Products from './screens/Product/Products';
import UpdateProduct from './screens/Product/UpdateProduct';
import InventoryProduct from './screens/Statistic/InventoryProduct';
import Revenue from './screens/Statistic/Revenue';
import TopProduct from './screens/Statistic/TopProduct';
import ExportPDF from './utils/ExportPDF';
function App() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [isReload, setIsReload] = useState(false);

    if (!accessToken || accessToken == null) {
        return <Login setAccessToken={setAccessToken} />;
    }

    return (
        <div>
            <Header accessToken={accessToken} setAccessToken={setAccessToken} />
            <Routes>
                <Route path={'/'} element={<Layout />}>
                    <Route path={'login'} element={<Login setAccessToken={setAccessToken} />}></Route>

                    <Route path={''} element={<Products />}></Route>
                    <Route path={'update-product'} element={<UpdateProduct />}></Route>
                    <Route path={'update-product/:productId'} element={<UpdateProduct />}></Route>

                    <Route path={'comments/:productId'} element={<Comments />}></Route>

                    <Route path={'categories'} element={<Categories />}></Route>
                    <Route path={'update-category'} element={<UpdateCategory />}></Route>
                    <Route path={'update-category/:categoryId'} element={<UpdateCategory />}></Route>

                    <Route path={'employees'} element={<Employees />}></Route>
                    <Route path={'update-employee'} element={<UpdateEmployee />}></Route>
                    <Route path={'update-employee/:employeeId'} element={<UpdateEmployee />}></Route>

                    <Route path={'customers'} element={<Customers />}></Route>
                    <Route path={'update-customer'} element={<UpdateCustomer />}></Route>
                    <Route path={'update-customer/:customerId'} element={<UpdateCustomer />}></Route>

                    <Route path={'invoices'} element={<Carts />}></Route>
                    <Route path={'detail-invoices/:id'} element={<CartDetails />}></Route>
                    <Route path={'detail-shipping/:id'} element={<CartDetailsShipping />}></Route>

                    <Route path={'imports'} element={<Imports />}></Route>
                    <Route path={'update-import'} element={<UpdateImport />}></Route>
                    <Route path={'detail-import'} element={<DetailImport isReload={isReload} />}></Route>

                    <Route path={'top-products'} element={<TopProduct />}></Route>
                    <Route path={'revenue-statistics'} element={<Revenue />}></Route>
                    <Route path={'inventory-product'} element={<InventoryProduct />}></Route>

                    <Route path={'export-revenue'} element={<ExportPDF />}></Route>

                    <Route path={'my-invoices'} element={<MyCarts />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
