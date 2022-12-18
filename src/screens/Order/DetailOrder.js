import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import { admin_url } from '../../services/base_url';
import { SUCCESS } from '../../services/constant';
import * as OrderDetailService from '../../services/OrderDetailService';
import * as SupplierService from '../../services/SupplierService';
import Redirect from '../../utils/Redirect';
import Toast, { toast_error, toast_success } from '../../utils/Toast';
import ProductItem from '../Order/ProductItem';
import Moment from 'moment';
function DetailOrder() {
    let { id } = useParams();

    const [products, setProducts] = useState([]);
    const [isReload, setIsReload] = useState(false);
    const [endDate, setEndDate] = useState(new Date());

    const [categoryId, setCategoryId] = useState();
    const [supplierId, setSupplierId] = useState();

    // create or update detail order
    const [dataDetailOrder, setDataDetailOrder] = useState({
        orderId: id,
        productId: '',
        quantity: '',
        price: '',
        signal: '',
    });
    // create or update order
    const [dataOrder, setDataOrder] = useState({
        id: '',
        purchaseDate: '',
        employeeId: '',
        supplierId: '',
    });
    // get order and order detail. => update.
    const [data, setData] = useState();
    useEffect(() => {
        if (id || dataOrder.id) {
            const getOrderDetails = async () => {
                axios
                    .get(`http://localhost:8080/api/admin/orders/${id || dataOrder.id}`)
                    .then(function (response) {
                        if (response.data.http_code == SUCCESS) {
                            setData(response.data.data);
                            setDataOrder(response.data.data);
                        } else {
                            Toast(toast_error, 'An error occurred! Please try again!');
                        }
                    })
                    .catch(function (error) {
                        Toast(toast_error, 'An error occurred! Please try again!');
                    });
            };
            getOrderDetails();
        }
    }, [isReload, id, dataOrder.id]);

    // display order and order detail.
    const showData = (data) => {
        if (data) {
            const Items = [];
            for (let i = 0; i < data.orderDetails.length; i++) {
                Items.push(
                    <ProductItem
                        updateData={() => updateData(data.orderDetails[i])}
                        key={data.orderDetails[i].id}
                        data={data.orderDetails[i]}
                        deleteProduct={() =>
                            deleteProduct(data.orderDetails[i].order.id, data.orderDetails[i].product.id)
                        }
                    />,
                );
            }
            return Items;
        }
    };

    // get all suppliers
    const [suppliers, setSuppliers] = useState([]);
    useEffect(() => {
        const getSuppliers = async () => {
            const result = await SupplierService.getAllSuppliers();
            setSuppliers(result.data);
            if (data) {
                setSupplierId(data.supplierId);
            } else {
                setSupplierId(result.data[0].id);
            }
        };
        getSuppliers();
    }, [data]);

    // get category by supplier
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (suppliers && supplierId) {
            const getCategoryBySupplier = async () => {
                axios
                    .get(`http://localhost:8080/api/admin/suppliers/${supplierId}`)
                    .then(function (response) {
                        setCategories(response.data);
                        setCategoryId(response.data[0].categoryId);
                    })
                    .catch(function (error) {
                        Toast(toast_error, 'An error occurred! Please try again!');
                    });
            };
            getCategoryBySupplier();
        }
    }, [suppliers, supplierId]);

    // get product of category.
    useEffect(() => {
        if (categories && categoryId) {
            const getProductByCategory = async () => {
                axios
                    .get(`http://localhost:8080/api/public/categories/${categoryId}`)
                    .then(function (response) {
                        if (response.data.http_code == SUCCESS) {
                            setProducts(response.data.data.products);
                            dataDetailOrder.productId = response.data.data.products[0].id;
                        } else {
                            Toast(toast_error, 'An error occurred! Please try again!');
                        }
                    })
                    .catch(function (error) {
                        Toast(toast_error, 'An error occurred! Please try again!');
                    });
            };
            getProductByCategory();
        }
    }, [categories, categoryId]);

    const handleClickCancel = (e) => {
        e.preventDefault();
        swal({
            title: 'Hủy chỉnh sửa?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem('dataOrder');
                setTimeout(() => Redirect('imports'), 1000);
            }
        });
    };

    const deleteProduct = (orderId, productId) => {
        setIsReload(true);
        const deleteItem = async () => {
            setIsReload(false);
            await OrderDetailService.deleteItem(orderId, productId);
            setIsReload(true);
            Toast('success', 'Đã xóa sản phẩm!!');
            setIsReload(false);
        };
        deleteItem();
        setIsReload(true);
    };

    const onChangedataDetailOrder = (e) => {
        setDataDetailOrder({ ...dataDetailOrder, [e.target.name]: e.target.value });
    };

    const onChangedataOrder = (e) => {
        setDataOrder({ ...dataOrder, [e.target.name]: e.target.value });
    };

    const [signal, setSignal] = useState(false);
    const handleSubmitDetailOrder = (e) => {
        setIsReload(true);
        e.preventDefault();
        if (id != null) {
            dataDetailOrder.orderId = id;
        }
        if (dataOrder.id) {
            dataDetailOrder.orderId = dataOrder.id;
        }
        if (signal) {
            dataDetailOrder.signal = 'update';
        } else {
            dataDetailOrder.signal = 'add';
        }
        const url = `${admin_url}/order-details`;
        axios
            .post(url, dataDetailOrder)
            .then((response) => {
                if (response.data.http_code == SUCCESS) {
                    setIsReload(true);
                    Toast(toast_success, 'Success!');
                    setIsReload(false);
                } else {
                    setIsReload(true);
                    Toast(toast_error, 'An error occurred! Please try again!');
                    setIsReload(false);
                }
            })
            .catch((error) => {
                setIsReload(true);
                Toast(toast_error, 'An error occurred! Please try again!');
                setIsReload(false);
            });
    };

    const updateData = (data) => {
        const updateData = async () => {
            setDataDetailOrder(data);
            setSignal(true);
        };
        updateData();
    };

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        if (id) {
            dataOrder.id = id;
        }
        if (!dataOrder.supplierId) {
            dataOrder.supplierId = supplierId;
        }
        dataOrder.employeeId = JSON.parse(localStorage.getItem('accessToken')).data.account.id;
        dataOrder.purchaseDate = endDate;
        console.log(dataOrder);
        const url = `${admin_url}/orders`;
        axios
            .post(url, dataOrder)
            .then((response) => {
                if (response.data.http_code == SUCCESS) {
                    Toast(toast_success, 'Success!');
                    id = response.data.data.id;
                    setDataOrder(response.data.data);
                    dataDetailOrder.orderId = response.data.data.id;
                } else {
                    Toast(toast_error, 'An error occurred! Please try again!');
                }
            })
            .catch((error) => {
                Toast(toast_error, 'An error occurred! Please try again!');
            });
    };

    return (
        <div className="main-panel">
            <ToastContainer />
            <div className="content">
                <div className="page-inner">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <form>
                                        <div className="d-flex align-items-center">
                                            <div className="col-md-6 col-lg-5">
                                                <div className="form-group">
                                                    <label htmlFor="id">Order Id</label>
                                                    <input
                                                        // disabled={isReload ? false : true}
                                                        className="form-control"
                                                        type="text"
                                                        name="id"
                                                        value={id || dataOrder.id || ''}
                                                        onChange={onChangedataOrder}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        name="purchaseDate"
                                                        defaultValue={dataOrder.purchaseDate || ''}
                                                        onChange={(e) => setEndDate(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-5">
                                                <div className="form-group form-group-default">
                                                    <div className="form-group">
                                                        <label>Supplier</label>
                                                        <select
                                                            // disabled={isReload ? false : true}
                                                            className="form-control form-control"
                                                            name="supplierId"
                                                            onChange={(e) => setSupplierId(e.target.value)}
                                                        >
                                                            {suppliers.map((item) => (
                                                                <option
                                                                    key={item.id}
                                                                    value={item.id}
                                                                    name="supplierId"
                                                                    // selected={
                                                                    //     data ? item.id === data.supplier.id : <></>
                                                                    // }
                                                                    selected={item.id == supplierId ? true : false}
                                                                >
                                                                    {item.id + ' - ' + item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group form-group-default">
                                                    <div className="form-group">
                                                        <label>Category</label>
                                                        <select
                                                            className="form-control form-control"
                                                            onChange={(e) => setCategoryId(e.target.value)}
                                                        >
                                                            {categories.map((item) => (
                                                                <option
                                                                    key={item.categoryId}
                                                                    value={item.categoryId}
                                                                    name="categoryId"
                                                                    // selected={item.id === categoryId}
                                                                >
                                                                    {item.category ? item.category.name : ''}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-1">
                                                <button
                                                    type="submit"
                                                    className="btn btn-success"
                                                    onClick={handleSubmitOrder}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <form>
                                    <div className="card-header">
                                        {/* {dataSupply.categoryId ? ( */}
                                        <>
                                            <div className="d-flex align-items-center">
                                                <div className="col-md-4 col-lg-4">
                                                    <div className="form-group form-group-default">
                                                        <div className="form-group">
                                                            <label>Product</label>
                                                            <select
                                                                className="form-control form-control"
                                                                name="productId"
                                                                onChange={onChangedataDetailOrder}
                                                            >
                                                                {products.map((item) => (
                                                                    <option
                                                                        key={item.id}
                                                                        value={item.id}
                                                                        name="productId"
                                                                        // selected={item.id === productId}
                                                                        // selected={item.id === dataDetailOrder.productId}
                                                                    >
                                                                        {item.id + ' - ' + item.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-8">
                                                    <div className="table-responsive">
                                                        <table className="display table table-striped table-hover">
                                                            {/* <tbody>{<OrderItem key={data.id} data={data} />}</tbody> */}
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        {/* ) : (
                                            <></>
                                        )} */}
                                    </div>
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <div className="col-md-4 col-lg-4">
                                                <div className="form-group">
                                                    <label htmlFor="id">Quantity</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="quantity"
                                                        value={parseInt(dataDetailOrder.quantity) || ''}
                                                        onChange={onChangedataDetailOrder}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="id">Price</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="price"
                                                        onChange={onChangedataDetailOrder}
                                                        value={parseInt(dataDetailOrder.price) || ''}
                                                        // onChange={onChangeDetail}
                                                    />
                                                </div>
                                                <div className="card-action" style={{ textAlign: 'center' }}>
                                                    <button
                                                        onClick={handleSubmitDetailOrder}
                                                        type="submit"
                                                        className="btn btn-success mr-5"
                                                    >
                                                        Add
                                                    </button>
                                                    <button
                                                        type="cancel"
                                                        className="btn btn-danger"
                                                        onClick={handleClickCancel}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-lg-8">
                                                <div className="table-responsive">
                                                    <table className="display table table-striped table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Id</th>
                                                                <th>Image</th>
                                                                <th>Name</th>
                                                                <th>Quantity</th>
                                                                <th>Price</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>{showData(data)}</tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailOrder;
