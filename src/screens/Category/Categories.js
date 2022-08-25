import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_ONE, PAGE_SIZE } from '../../services/constant';
import * as CategoryService from '../../services/CategoryService';
import CategoryItem from '../Category/CategoryItem';
import { Pagination } from '@mui/material';
function Categories() {
    const [page, setPage] = useState(PAGE_ONE);
    const [categories, setCategories] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [itemDisplay, setItemDisplay] = useState(PAGE_SIZE);

    function ShowCategories(categories) {
        return categories.map((item) => <CategoryItem data={item} />);
    }

    useEffect(() => {
        const getListCategories = async () => {
            const result = await CategoryService.getListCategories(page, itemDisplay, searchValue);
            setCategories(result.data.list);
            setTotalPages(result.data.totalPages);
            return result.data;
        };
        getListCategories();
    }, [page, itemDisplay, searchValue]);

    function handleChange(page) {
        setPage(page);
    }

    useEffect(() => {
        if (searchValue) {
            setPage(PAGE_ONE);
        }
    }, [searchValue]);

    return (
        <div className="main-panel">
            <div className="content">
                <div className="page-inner">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="col-md-10 col-lg-10"
                                            style={{ display: 'flex', justifyContent: 'center' }}
                                        >
                                            <h3>Quản lý danh mục</h3>
                                        </div>
                                        <div className="col-md-2 col-lg-2">
                                            <div className="form-group form-group-default">
                                                <div className="form-group">
                                                    <label>Số item hiển thị</label>
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
                                                    placeholder="Nhập tên..."
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
                                            <Link to={'/update-category'} style={{ color: 'white' }}>
                                                <button className="btn btn-primary btn-round ml-auto">
                                                    <i className="fa fa-plus " /> Thêm danh mục
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Ảnh</th>
                                                    <th>Mã</th>
                                                    <th>Tên</th>
                                                </tr>
                                            </thead>
                                            <tbody>{ShowCategories(categories)}</tbody>
                                        </table>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {totalPages > 1 ? (
                                            <Pagination
                                                color="primary"
                                                count={totalPages}
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

export default Categories;
