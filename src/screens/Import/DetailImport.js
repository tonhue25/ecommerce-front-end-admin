import { ToastContainer } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import * as ProductService from '../../services/ProductService';
import * as SupplierService from '../../services/SupplierService';
import * as SupplyService from '../../services/SupplyService';
import ImportItem from './ImportItem';
import { admin_url } from '../../services/base_url';
import axios from 'axios';
import Toast from '../../utils/Toast';
import swal from 'sweetalert';
import Redirect from '../../utils/Redirect';

function DetailImport({ isReload }) {
    const [suppliers, setSuppliers] = useState([]);
    const [supplies, setSupplies] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryId, setCategoryId] = useState('balo');
    const [productId, setProductId] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [data, setData] = useState([]);
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
    });

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
            setIsUpdate(false);
        } else {
            setIsUpdate(true);
        }
    }, [JSON.parse(localStorage.getItem('dataOrder')), isReload]);

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        dataOrder.employeeId = JSON.parse(localStorage.getItem('accessToken')).id;
        const url = `${admin_url}/orders`;
        axios
            .post(url, dataOrder)
            .then((response) => {
                setIsUpdate(true);
                Toast('success', 'Thêm thành công!');
                localStorage.setItem('dataOrder', JSON.stringify(response.data));
            })
            .catch((error) => {
                Toast('error', 'Có lỗi xảy ra! Vui lòng thử lại!');
            });
    };

    const handleSubmitDetailOrder = (e) => {
        e.preventDefault();
        dataDetailOrder.orderId = JSON.parse(localStorage.getItem('dataOrder')).id;
        console.log(dataDetailOrder);
        const url = `${admin_url}/order-details`;
        axios
            .post(url, dataDetailOrder)
            .then((response) => {
                setIsUpdate(true);
                Toast('success', 'Thêm thành công!');
            })
            .catch((error) => {
                Toast('error', 'Có lỗi xảy ra! Vui lòng thử lại!');
            });
    };

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('dataOrder'))) {
            dataOrder.id = JSON.parse(localStorage.getItem('dataOrder')).id;
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
                                                        disabled={isUpdate ? false : true}
                                                        className="form-control"
                                                        type="text"
                                                        name="id"
                                                        value={dataOrder.id || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="id">Purchase Date</label>
                                                    <input
                                                        disabled={isUpdate ? false : true}
                                                        className="form-control"
                                                        type="date"
                                                        name="purchaseDate"
                                                        value={dataOrder.purchaseDate || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-5">
                                                <div className="form-group form-group-default">
                                                    <div className="form-group">
                                                        <label>Nhà cung cấp</label>
                                                        <select
                                                            disabled={isUpdate ? false : true}
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
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group form-group-default">
                                                    <div className="form-group">
                                                        <label>Danh mục</label>
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
                                                    disabled={isUpdate ? false : true}
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
                                                        <label>Danh mục</label>
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
                                                        <tbody>{<ImportItem key={data.id} data={data} />}</tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <div className="col-md-4 col-lg-4">
                                                <div className="form-group">
                                                    <label htmlFor="id">Số lượng</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="quantity"
                                                        value={dataDetailOrder.quantity || ''}
                                                        onChange={onChangeDetail}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="id">Giá</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="price"
                                                        value={dataDetailOrder.price || ''}
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
                                                        <tbody></tbody>
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

export default DetailImport;
