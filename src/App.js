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
import DetailDiscount from './screens/Discount/DetailDiscount';
import Discount from './screens/Discount/Discount';
import UpdateDiscount from './screens/Discount/UpdateDiscount';
import Employees from './screens/Employee/Employees';
import UpdateEmployee from './screens/Employee/UpdateEmployee';
import DetailImport from './screens/Import/DetailImport';
import Imports from './screens/Import/Imports';
import Invoice from './screens/Invoice/Invoice';
import Login from './screens/Login';
import DetailOrder from './screens/Order/DetailOrder';
import Orders from './screens/Order/Orders';
import Products from './screens/Product/Products';
import UpdateProduct from './screens/Product/UpdateProduct';
import DetailReturnOrder from './screens/ReturnOrder/DetailReturnOrder';
import ReturnOrders from './screens/ReturnOrder/ReturnOrders';
import InventoryProduct from './screens/Statistic/InventoryProduct';
import Revenue from './screens/Statistic/Revenue';
import TopProduct from './screens/Statistic/TopProduct';
import Warranty from './screens/Warranty/Warranty';
import {
    carts,
    categories,
    comments,
    customers,
    detail_cart,
    employees,
    inventory_product,
    login,
    orders,
    revenue_statistics,
    top_products,
    update_categories,
    update_customer,
    update_employees,
    update_products,
} from './services/link_redirect';
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
                    <Route path={login} element={<Login setAccessToken={setAccessToken} />}></Route>

                    <Route path={''} element={<Products />}></Route>
                    <Route path={update_products} element={<UpdateProduct />}></Route>
                    <Route path={`${update_products}/:productId`} element={<UpdateProduct />}></Route>

                    <Route path={`${comments}/:productId`} element={<Comments />}></Route>

                    <Route path={categories} element={<Categories />}></Route>
                    <Route path={update_categories} element={<UpdateCategory />}></Route>
                    <Route path={`${update_categories}/:categoryId`} element={<UpdateCategory />}></Route>

                    <Route path={employees} element={<Employees />}></Route>
                    <Route path={update_employees} element={<UpdateEmployee />}></Route>
                    <Route path={`${update_employees}/:employeeId`} element={<UpdateEmployee />}></Route>

                    <Route path={customers} element={<Customers />}></Route>
                    <Route path={update_customer} element={<UpdateCustomer />}></Route>
                    <Route path={`${update_customer}/:customerId`} element={<UpdateCustomer />}></Route>

                    <Route path={carts} element={<Carts />}></Route>
                    <Route path={`${detail_cart}/:id`} element={<CartDetails />}></Route>
                    <Route path={'detail-shipping/:id'} element={<CartDetailsShipping />}></Route>

                    <Route path={'invoice/:id'} element={<Invoice />}></Route>

                    <Route path={orders} element={<Orders />}></Route>
                    <Route path={'detail-order/:id'} element={<DetailOrder />}></Route>
                    <Route path={'detail-order'} element={<DetailOrder isReload={isReload} />}></Route>

                    <Route path={'imports'} element={<Imports />}></Route>
                    <Route path={'detail-import'} element={<DetailImport isReload={isReload} />}></Route>
                    <Route path={'detail-import/:id'} element={<DetailImport />}></Route>

                    <Route path={'return-orders'} element={<ReturnOrders />}></Route>
                    <Route path={'detail-return-orders'} element={<DetailReturnOrder isReload={isReload} />}></Route>
                    <Route path={'detail-return-orders/:id'} element={<DetailReturnOrder />}></Route>

                    <Route path={top_products} element={<TopProduct />}></Route>
                    <Route path={revenue_statistics} element={<Revenue />}></Route>
                    <Route path={inventory_product} element={<InventoryProduct />}></Route>

                    <Route path={'export-revenue'} element={<ExportPDF />}></Route>

                    <Route path={'my-invoices'} element={<MyCarts />}></Route>

                    <Route path={'warranty/:productId'} element={<Warranty />}></Route>

                    <Route path={'discounts'} element={<Discount />}></Route>

                    <Route path={'update-discount'} element={<UpdateDiscount />}></Route>
                    <Route path={'update-discount/:discountId'} element={<UpdateDiscount />}></Route>

                    <Route path={'update-discount-detail/:discountId'} element={<DetailDiscount />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
