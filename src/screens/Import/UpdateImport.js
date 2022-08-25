import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import * as ProductService from '../../services/ProductService';
import * as SupplierService from '../../services/SupplierService';
import * as SupplyService from '../../services/SupplyService';
import ImportItem from './ImportItem';
import { admin_url } from '../../services/base_url';
import axios from 'axios';
import Toast from '../../utils/Toast';
import { Link } from 'react-router-dom';

function UpdateImport() {
    const [suppliers, setSuppliers] = useState([]);
    const [supplies, setSupplies] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryId, setCategoryId] = useState('balo');
    const [productId, setProductId] = useState('');

    const [data, setData] = useState([]);

    const [dataOrder, setDataOrder] = useState({
        id: '',
        purchaseDate: '',
        supplierId: 'supplier001',
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
            console.log(result.data);
            return result.data;
        };
        getProductByCategory();
    }, [categoryId]);

    useEffect(() => {
        if (productId != null) {
            const getOne = async () => {
                const result = await ProductService.getOne(productId);
                setData(result.data);
                return result.data;
            };
            getOne();
        }
    }, [productId]);

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        dataOrder.employeeId = JSON.parse(localStorage.getItem('accessToken')).id;
        const url = `${admin_url}/orders`;
        axios
            .post(url, dataOrder)
            .then((response) => {
                Toast('success', 'Thêm thành công!');
            })
            .catch((error) => {
                Toast('error', 'Có lỗi xảy ra! Vui lòng thử lại!');
            });
    };

    const onChange = (e) => {
        setDataOrder({ ...dataOrder, [e.target.name]: e.target.value });
    };

    return (
        <div className="main-panel">
            <ToastContainer />
            <div className="content">
                <div className="page-inner">
                    <div className="row" style={{ textAlign: 'left' }}>
                        <div className="col-md-12">
                            <form>
                                <div className="card">
                                    <div className="card-header">
                                        {/* <div className="card-title">Add New Order</div>
                                    </div>
                                    <div className="card-body"> */}
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="id">id</label>
                                                    <input
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
                                                        className="form-control"
                                                        type="date"
                                                        name="purchaseDate"
                                                        value={dataOrder.purchaseDate || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group form-group-default">
                                                    <div className="form-group">
                                                        <label>Nhà cung cấp</label>
                                                        <select
                                                            name="supplierId"
                                                            className="form-control form-control"
                                                            onChange={onChange}
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
                                        </div>
                                    </div>

                                    <div className="card-action" style={{ textAlign: 'center' }}>
                                        <button
                                            type="submit"
                                            className="btn btn-success mr-5"
                                            onClick={handleSubmitOrder}
                                        >
                                            Add
                                        </button>
                                        <Link to={'/detail-import'}>
                                            <button type="cancel" className="btn btn-success mr-5">
                                                Add detail
                                            </button>
                                        </Link>
                                        <button type="cancel" className="btn btn-danger mr-5">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdateImport;
