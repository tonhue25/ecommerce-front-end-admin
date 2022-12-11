import { useEffect, useState } from 'react';
import * as ProductService from '../../services/ProductService';
import { Link } from 'react-router-dom';
import { PAGE_SIZE, PAGE_ONE, SUCCESS, WARNING } from '../../services/constant';
import ProductItem from './ProductItem';
import * as CategoryService from '../../services/CategoryService';
import { Pagination } from '@mui/material';
import Toast, { success, toast_success, toast_warning, warning } from '../../utils/Toast';
import { ToastContainer } from 'react-toastify';

import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { public_url } from '../../services/base_url';
import axios from 'axios';
import { categories, products, update_products } from '../../services/link_redirect';
function Products() {
    const [page, setPage] = useState(PAGE_ONE);
    const [dataCategories, setDataCategories] = useState([]);
    const [searchCategory, setSearchCategory] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [data, setData] = useState([]);

    const [dataSubmit, setDataSubmit] = useState({
        size: PAGE_SIZE,
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
        const getListEmployee = async () => {
            axios
                .post(`${public_url}/${products}`, dataSubmit)
                .then(function (response) {
                    if (response.data.http_code == SUCCESS) {
                        setData(response.data.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getListEmployee();
    }, [dataSubmit, searchCategory, page, isDelete]);

    const showData = (data) => {
        if (data.size > 0) {
            const Items = [];
            for (let i = 0; i < data.size; i++) {
                Items.push(
                    <ProductItem
                        key={data.list[i].id}
                        data={data.list[i]}
                        deleteProduct={() => deleteProduct(data.list[i].id, data.list[i].status)}
                    />,
                );
            }
            return Items;
        }
    };

    useEffect(() => {
        const getCategories = async () => {
            axios
                .post(`${public_url}/${categories}`, {})
                .then(function (response) {
                    if (response.data.http_code == SUCCESS) {
                        setDataCategories(response.data.data.list);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getCategories();
    }, []);

    const deleteProduct = (id, status) => {
        if (status == 'true') {
            const deleteItem = async () => {
                const result = await ProductService.deleteItem(id);
                setIsDelete(true);
                if (result.data.http_code == SUCCESS) {
                    Toast(toast_success, 'Đã xóa sản phẩm!!');
                }
            };
            deleteItem();
            setIsDelete(false);
        } else {
            Toast(toast_warning, 'Sản phẩm đã xóa!!');
        }
    };

    const handleChangeCategory = (e) => {
        setPage(PAGE_ONE);
        setSearchCategory(e.target.value);
    };

    function handleChange(page) {
        setPage(page);
    }

    useEffect(() => {
        if (dataSubmit.search) {
            setPage(PAGE_ONE);
        }
    }, [dataSubmit.search]);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Products',
    });

    const onChange = (e) => {
        setDataSubmit({ ...dataSubmit, [e.target.name]: e.target.value });
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
                                        <div
                                            className="col-md-12 col-lg-12"
                                            style={{ display: 'flex', justifyContent: 'center' }}
                                        >
                                            <h3>Product management</h3>
                                        </div>
                                    </div>
                                </div>
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
                                                        {dataCategories.map((item) => (
                                                            <option key={item.id} value={item.id}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-6"></div>
                                        <div className="col-md-2 col-lg-2">
                                            <div className="form-group form-group-default">
                                                <div className="form-group">
                                                    <label>Items</label>
                                                    <select name="size" onChange={onChange} className="form-control">
                                                        <option>{PAGE_SIZE}</option>
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
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4">
                                            <div className="input-icon">
                                                <input
                                                    name="search"
                                                    value={dataSubmit.search || ''}
                                                    onChange={onChange}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nhập tên..."
                                                />
                                                <span className="input-icon-addon">
                                                    <i className="fa fa-search" />
                                                </span>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="col-md-4 col-lg-4"></div>
                                        <div className="col-md-2 col-lg-2">
                                            <button
                                                onClick={() => handlePrint()}
                                                className="btn btn-primary btn-round ml-auto"
                                            >
                                                Export
                                            </button>
                                        </div>
                                        <br />
                                        <div className="col-md-2 col-lg-2">
                                            <Link to={update_products} style={{ color: 'white' }}>
                                                <button className="btn btn-primary btn-round ml-auto">
                                                    <i className="fa fa-plus " /> Add
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div ref={componentRef}>
                                        <div className="table-responsive">
                                            <table className="display table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th></th>
                                                        <th>Quantity</th>
                                                        <th>Discount</th>
                                                        <th>Price</th>
                                                        <th>Status</th>
                                                        <th>Comment</th>
                                                        <th>Warranty</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>{showData(data)}</tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {data.totalPages > 1 ? (
                                            <Pagination
                                                color="primary"
                                                count={data.totalPages}
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

export default Products;
