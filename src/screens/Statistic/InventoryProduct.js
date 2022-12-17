import { useEffect, useState, useRef } from 'react';
import * as ProductService from '../../services/ProductService';
import { PAGE_SIZE, PAGE_ONE } from '../../services/constant';
import * as CategoryService from '../../services/CategoryService';
import { Pagination } from '@mui/material';
import Toast from '../../utils/Toast';
import { ToastContainer } from 'react-toastify';
import InventoryItem from './InventoryItem';

import { PDFExport } from '@progress/kendo-react-pdf';
import 'react-datepicker/dist/react-datepicker.css';
import { public_url } from '../../services/base_url';
import axios from 'axios';
function InventoryProduct() {
    const [page, setPage] = useState(PAGE_ONE);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');
    const [itemDisplay, setItemDisplay] = useState(PAGE_SIZE);

    const [dataSubmit, setDataSubmit] = useState({
        size: itemDisplay,
        page: page,
        search: '',
        categoryId: [],
    });

    useEffect(() => {
        dataSubmit.categoryId = [];
        if (searchCategory.length > 0) {
            dataSubmit.categoryId = [searchCategory];
        }
        dataSubmit.page = page;
        dataSubmit.size = itemDisplay;
        const getListEmployee = async () => {
            axios
                .post(`${public_url}/products`, dataSubmit)
                .then(function (response) {
                    if (response.data.http_code == 'SUCCESS') {
                        setProducts(response.data.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getListEmployee();
    }, [dataSubmit, searchCategory, page, itemDisplay]);

    // function ShowProducts(products) {
    //     return products.map((item) => <InventoryItem key={item.id} data={item} />);
    // }

    const ShowProducts = (products) => {
        if (products.size > 0) {
            const Items = [];
            for (let i = 0; i < products.size; i++) {
                Items.push(<InventoryItem key={products.list[i].id} data={products.list[i]} />);
            }
            return Items;
        }
    };

    useEffect(() => {
        const getCategories = async () => {
            axios
                .post(`${public_url}/categories`, {})
                .then(function (response) {
                    if (response.data.http_code == 'SUCCESS') {
                        setCategories(response.data.data.list);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getCategories();
    }, []);

    const handleChangeCategory = (e) => {
        setSearchCategory(e.target.value);
    };

    function handleChange(page) {
        setPage(page);
    }

    const pdfExportComponent = useRef(null);
    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
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
                                    <div className="d-flex align-items-center">
                                        <div className="col-md-6 col-lg-4">
                                            <div className="form-group form-group-default">
                                                <div className="form-group">
                                                    <label>Danh mục</label>
                                                    <select
                                                        className="form-control form-control"
                                                        onChange={handleChangeCategory}
                                                    >
                                                        <option value="">Tất cả</option>
                                                        {categories.map((item) => (
                                                            <option key={item.id} value={item.id}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-6">
                                            <button
                                                type="submit"
                                                className="btn btn-success ml-5"
                                                onClick={exportPDFWithComponent}
                                            >
                                                Export pdf
                                            </button>
                                        </div>
                                        <div className="col-md-2 col-lg-2">
                                            <div className="form-group form-group-default">
                                                <div className="form-group">
                                                    <label>Số sản phẩm</label>
                                                    <select
                                                        className="form-control"
                                                        onChange={(e) => setItemDisplay(e.target.value)}
                                                    >
                                                        <option>5</option>
                                                        <option>10</option>
                                                        <option>15</option>
                                                        <option>20</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <PDFExport ref={pdfExportComponent} paperSize="A3">
                                        <div className="row mt-5">
                                            <div className="col-md-12 col-lg-12">
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <h2>Inventory products</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="display table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: '20%' }}>Id</th>
                                                        <th style={{ width: '20%' }}>Image</th>
                                                        <th style={{ width: '40%' }}>Name</th>
                                                        <th style={{ width: '20%' }}>Inventory quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>{ShowProducts(products)}</tbody>
                                            </table>
                                        </div>
                                    </PDFExport>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {products.totalPages > 1 ? (
                                            <Pagination
                                                color="primary"
                                                count={products.totalPages}
                                                size="large"
                                                page={page}
                                                showFirstButton
                                                showLastButton
                                                onChange={(e, page) => handleChange(page)}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InventoryProduct;
