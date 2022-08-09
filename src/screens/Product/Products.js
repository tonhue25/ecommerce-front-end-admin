import { useEffect, useState } from 'react';
import * as ProductService from '../../services/ProductService';
import { Link } from 'react-router-dom';
import { PAGE_SIZE } from '../../services/constant';
import ProductItem from './ProductItem';
import * as CategoryService from '../../services/CategoryService';
import Paging from '../../components/Paging';
function Products() {
    const [page, setPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [itemDisplay, setItemDisplay] = useState(PAGE_SIZE);
    const [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        const getListProduct = async () => {
            const result = await ProductService.getListProduct(page, itemDisplay, 0, searchValue, searchCategory);
            setProducts(result.data.list);
            setTotalPages(result.data.totalPages);
            return result.data;
        };
        getListProduct();
    }, [page, itemDisplay, searchValue, searchCategory]);

    function ShowProducts(products) {
        return products.map((item) => (
            <ProductItem key={item.id} data={item} deleteProduct={() => deleteProduct(item.id, item.status)} />
        ));
    }

    useEffect(() => {
        const getAllCategories = async () => {
            const result = await CategoryService.getAllCategories();
            setCategories(result.data);
            return result.data;
        };
        getAllCategories();
    }, []);

    const deleteProduct = (id, status) => {
        if (status == 1) {
            const deleteItem = async () => {
                const result = await ProductService.deleteItem(id);
                setIsDelete(true);
                // Toast('success', 'Successfully deleted!!');
            };
            deleteItem();
            setIsDelete(false);
        } else {
            // Toast('warning', 'Product was deleted!!');
        }
    };

    const handleChangeCategory = (e) => {
        setSearchCategory(e.target.value);
    };

    function handleClickPageNext(page) {
        setPage(page);
    }

    return (
        <div className="main-panel">
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
                                        <div className="col-md-4 col-lg-6"></div>
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
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4">
                                            <div className="input-icon">
                                                <input
                                                    value={searchValue}
                                                    onChange={(e) => setSearchValue(e.target.value)}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nhập tên sản phẩm..."
                                                />
                                                <span className="input-icon-addon">
                                                    <i className="fa fa-search" />
                                                </span>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="col-md-4 col-lg-6"></div>
                                        <br />
                                        <div className="col-md-2 col-lg-2">
                                            <button className="btn btn-primary btn-round ml-auto">
                                                <Link to={'/update-product'} style={{ color: 'white' }}>
                                                    <i className="fa fa-plus " /> Add
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Mã</th>
                                                    <th>Ảnh</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Số lượng tôn</th>
                                                    <th>Giá</th>
                                                    <th>Trạng thái</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>{ShowProducts(products)}</tbody>
                                        </table>
                                    </div>
                                    {Paging(page, totalPages, handleClickPageNext)}
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
