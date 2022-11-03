import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import * as ProductService from '../../services/ProductService';
import * as SupplierService from '../../services/SupplierService';
import * as SupplyService from '../../services/SupplyService';
import { admin_url } from '../../services/base_url';
import axios from 'axios';
import Toast from '../../utils/Toast';
import swal from 'sweetalert';
import Redirect from '../../utils/Redirect';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ProductItem from '../Order/ProductItem';
import * as OrderDetailService from '../../services/OrderDetailService';
import { useParams } from 'react-router-dom';
import OrderItem from '../Order/OrderItem';
function DetailOrder() {
    let { id } = useParams();

    const [suppliers, setSuppliers] = useState([]);
    const [supplies, setSupplies] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryId, setCategoryId] = useState('balo');
    const [productId, setProductId] = useState('');
    const [isReload, setIsReload] = useState(false);
    const [data, setData] = useState([]);
    const [endDate, setEndDate] = useState(new Date());
    const [details, setDetails] = useState([]);
    const [isDisplay, setIsDisplay] = useState(false);
    const [signal, setSignal] = useState(false);

    const [dataOrder, setDataOrder] = useState({
        id: '',
        purchaseDate: '',
        supplierId: 'supplier001',
        employeeId: '',
    });

    const [dataDetailOrder, setDataDetailOrder] = useState({
        orderId: '',
        productId: '',
        quantity: '',
        price: '',
        signal: '',
    });

    useEffect(() => {
        if (id == null) {
            id = dataOrder.id;
        }
        const getListOrderDetailByOrder = async () => {
            const result = await OrderDetailService.getListOrderDetailByOrder(id, 1, 5);
            setDetails(result.data.list);
            return result.data.list;
        };
        getListOrderDetailByOrder();
    }, [id, isReload]);

    useEffect(() => {
        const getAllSuppliers = async () => {
            const result = await SupplierService.getAllSuppliers();
            setSuppliers(result.data);
            return result.data;
        };
        getAllSuppliers();
    }, []);

    useEffect(() => {
        const getSupplyBySupplier = async () => {
            const result = await SupplyService.getSupplyBySupplier(dataOrder.supplierId);
            setSupplies(result.data);
            return result.data;
        };
        getSupplyBySupplier();
    }, [dataOrder.supplierId]);

    useEffect(() => {
        const getProductByCategory = async () => {
            const result = await ProductService.getProductByCategory(categoryId);
            setProducts(result.data);
            return result.data;
        };
        getProductByCategory();
    }, [categoryId]);

    useEffect(() => {
        if (productId != null) {
            const getOne = async () => {
                const result = await ProductService.getOne(dataDetailOrder.productId);
                setData(result.data);
                return result.data;
            };
            getOne();
        }
    }, [dataDetailOrder.productId]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('dataOrder'))) {
            setIsReload(false);
        } else {
            setIsReload(true);
        }
    }, [JSON.parse(localStorage.getItem('dataOrder')), isReload]);

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        dataOrder.employeeId = JSON.parse(localStorage.getItem('accessToken')).id;
        dataOrder.purchaseDate = endDate;
        const url = `${admin_url}/orders`;
        axios
            .post(url, dataOrder)
            .then((response) => {
                setIsReload(true);
                Toast('success', 'Thêm thành công!');
                localStorage.setItem('dataOrder', JSON.stringify(response.data));
                setIsDisplay(true);
            })
            .catch((error) => {
                Toast('error', 'Có lỗi xảy ra! Vui lòng thử lại!');
            });
    };

    const handleSubmitDetailOrder = (e) => {
        e.preventDefault();
        setIsReload(true);
        if (id != null) {
            dataDetailOrder.orderId = id;
        } else {
            dataDetailOrder.orderId = JSON.parse(localStorage.getItem('dataOrder')).id;
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
                if (signal) {
                    Toast('success', 'Chỉnh sửa thành công!');
                } else {
                    Toast('success', 'Thêm thành công!');
                }
                setSignal(false);
            })
            .catch((error) => {
                Toast('error', 'Có lỗi xảy ra! Vui lòng thử lại!');
            });
        setIsReload(false);
    };

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('dataOrder'))) {
            if (id != null) {
                dataOrder.id = id;
            } else {
                dataOrder.id = JSON.parse(localStorage.getItem('dataOrder')).id;
            }
            dataOrder.purchaseDate = JSON.parse(localStorage.getItem('dataOrder')).purchaseDate;
            dataOrder.supplierId = JSON.parse(localStorage.getItem('dataOrder')).supplierId;
            dataOrder.employeeId = JSON.parse(localStorage.getItem('dataOrder')).employeeId;
        }
    }, [JSON.parse(localStorage.getItem('dataOrder')), isReload]);

    const onChange = (e) => {
        setDataOrder({ ...dataOrder, [e.target.name]: e.target.value });
    };

    const onChangeDetail = (e) => {
        setDataDetailOrder({ ...dataDetailOrder, [e.target.name]: e.target.value });
    };

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

    // allow user update info about item.
    function ShowProducts() {
        return details.map((item) => (
            <ProductItem
                updateData={() => updateData(item)}
                key={item.id}
                data={item}
                deleteProduct={() => deleteProduct(item.order.id, item.product.id)}
            />
        ));
    }

    const updateData = (data) => {
        const updateData = async () => {
            setDataDetailOrder(data);
            setSignal(true);
        };
        updateData();
    };

    const deleteProduct = (orderId, productId) => {
        const deleteItem = async () => {
            await OrderDetailService.deleteItem(orderId, productId);
            setIsReload(true);
            Toast('success', 'Đã xóa sản phẩm!!');
        };
        deleteItem();
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
                                                        disabled={isReload ? false : true}
                                                        className="form-control"
                                                        type="text"
                                                        name="id"
                                                        value={id || dataOrder.id || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="id">Purchase Date</label>
                                                    <DatePicker
                                                        style={{ cursor: 'pointer' }}
                                                        placeholderText="dd/mm/yyyy"
                                                        dateFormat="dd/MM/yyyy"
                                                        className="form-control"
                                                        selected={endDate || new Date()}
                                                        onChange={(date: Date) => setEndDate(date)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-5">
                                                <div className="form-group form-group-default">
                                                    <div className="form-group">
                                                        <label>Supplier</label>
                                                        <select
                                                            disabled={isReload ? false : true}
                                                            className="form-control form-control"
                                                            onChange={onChange}
                                                            name="supplierId"
                                                        >
                                                            {suppliers.map((item) => (
                                                                <option
                                                                    key={item.id}
                                                                    value={item.id}
                                                                    name="supplierId"
                                                                    selected={item.id === dataOrder.supplierId}
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
                                                            {supplies.map((item) => (
                                                                <option
                                                                    key={item.categoryId}
                                                                    value={item.categoryId}
                                                                    name="categoryId"
                                                                    selected={item.id === categoryId}
                                                                >
                                                                    {item.category.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-1">
                                                <button
                                                    // disabled={isUpdate ? false : true}
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
                                        <div className="d-flex align-items-center">
                                            <div className="col-md-4 col-lg-4">
                                                <div className="form-group form-group-default">
                                                    <div className="form-group">
                                                        <label>Product</label>
                                                        <select
                                                            className="form-control form-control"
                                                            // onChange={(e) => setProductId(e.target.value)}
                                                            onChange={onChangeDetail}
                                                            name="productId"
                                                        >
                                                            {products.map((item) => (
                                                                <option
                                                                    key={item.id}
                                                                    value={item.id}
                                                                    name="productId"
                                                                    // selected={item.id === productId}
                                                                    selected={item.id === dataDetailOrder.productId}
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
                                                        <tbody>{<OrderItem key={data.id} data={data} />}</tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
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
                                                        onChange={onChangeDetail}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="id">Price</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="price"
                                                        value={parseInt(dataDetailOrder.price) || ''}
                                                        onChange={onChangeDetail}
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
                                                        <tbody>{ShowProducts()}</tbody>
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
