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
import Toast from '../../utils/Toast';
import ProductItem from '../Order/ProductItem';
function DetailOrder() {
    let { id } = useParams();

    const [products, setProducts] = useState([]);
    const [isReload, setIsReload] = useState(false);
    const [endDate, setEndDate] = useState(new Date());

    const [categoryId, setCategoryId] = useState();

    const [dataDetailOrder, setDataDetailOrder] = useState({
        orderId: id,
        productId: '',
        quantity: '',
        price: '',
        signal: '',
    });
    // get order and order detail.
    const [data, setData] = useState();
    useEffect(() => {
        const getOrderDetails = async () => {
            axios
                .get(`http://localhost:8080/api/admin/orders/${id}`)
                .then(function (response) {
                    if (response.data.http_code == SUCCESS) {
                        setData(response.data.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getOrderDetails();
    }, [isReload, id]);

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
        };
        getSuppliers();
    }, [data]);

    // get category by supplier
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (data) {
            const getCategoryBySupplier = async () => {
                axios
                    .get(`http://localhost:8080/api/admin/suppliers/${data.supplier.id}`)
                    .then(function (response) {
                        setCategories(response.data);
                        setCategoryId(response.data[0].categoryId);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            };
            getCategoryBySupplier();
        }
    }, [suppliers]);

    // get product of category.
    useEffect(() => {
        if (categories && categoryId) {
            const getProductByCategory = async () => {
                axios
                    .get(`http://localhost:8080/api/public/categories/${categoryId}`)
                    .then(function (response) {
                        setProducts(response.data.data.products);
                        dataDetailOrder.productId = response.data.data.products[0].id;
                    })
                    .catch(function (error) {
                        console.log(error);
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
        const deleteItem = async () => {
            await OrderDetailService.deleteItem(orderId, productId);
            setIsReload(true);
            Toast('success', 'Đã xóa sản phẩm!!');
        };
        deleteItem();
    };

    const onChangedataDetailOrder = (e) => {
        setDataDetailOrder({ ...dataDetailOrder, [e.target.name]: e.target.value });
    };
    const [signal, setSignal] = useState(false);
    const handleSubmitDetailOrder = (e) => {
        e.preventDefault();
        console.log(dataDetailOrder);
        if (id != null) {
            dataDetailOrder.orderId = id;
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
                setIsReload(true);
                Toast('success', 'Chỉnh sửa thành công!');
            })
            .catch((error) => {
                Toast('error', 'Có lỗi xảy ra! Vui lòng thử lại!');
            });
        setIsReload(false);
    };

    const updateData = (data) => {
        const updateData = async () => {
            setDataDetailOrder(data);
            setSignal(true);
        };
        updateData();
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
                                                        value={data ? data.id : ''}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="id">Purchase Date</label>
                                                    <DatePicker
                                                        style={{ cursor: 'pointer' }}
                                                        placeholderText="dd/mm/yyyy"
                                                        dateFormat="dd/MM/yyyy"
                                                        className="form-control"
                                                        value={data ? data.purchaseDate : new Date()}
                                                        onChange={(date: Date) => setEndDate(date)}
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
                                                        >
                                                            {suppliers.map((item) => (
                                                                <option
                                                                    key={item.id}
                                                                    value={item.id}
                                                                    name="supplierId"
                                                                    selected={
                                                                        data ? item.id === data.supplier.id : <></>
                                                                    }
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
                                                    // onClick={handleSubmitOrder}
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
