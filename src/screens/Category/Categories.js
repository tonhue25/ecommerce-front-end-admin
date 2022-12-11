import { Pagination } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { public_url } from '../../services/base_url';
import { PAGE_ONE, PAGE_SIZE, SUCCESS } from '../../services/constant';
import { categories, update_categories } from '../../services/link_redirect';
import CategoryItem from '../Category/CategoryItem';
function Categories() {
    const [page, setPage] = useState(PAGE_ONE);
    const [dataSubmit, setDataSubmit] = useState({
        size: PAGE_SIZE,
        page: page,
        search: '',
    });
    const [data, setData] = useState([]);
    useEffect(() => {
        dataSubmit.page = page;
        const getCategories = async () => {
            axios
                .post(`${public_url}/${categories}`, dataSubmit)
                .then(function (response) {
                    if (response.data.http_code == SUCCESS) {
                        setData(response.data.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getCategories();
    }, [dataSubmit, page]);
    const showData = (data) => {
        if (data.size > 0) {
            const Items = [];
            for (let i = 0; i < data.size; i++) {
                Items.push(<CategoryItem data={data.list[i]} />);
            }
            return Items;
        }
    };

    function handleChange(page) {
        setPage(page);
    }

    useEffect(() => {
        if (dataSubmit.search | dataSubmit.size) {
            setPage(PAGE_ONE);
        }
    }, [dataSubmit]);

    const onChange = (e) => {
        setDataSubmit({ ...dataSubmit, [e.target.name]: e.target.value });
    };

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
                                            <h3>Category management</h3>
                                        </div>
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
                                                    type="text"
                                                    name="search"
                                                    value={dataSubmit.search || ''}
                                                    onChange={onChange}
                                                    className="form-control"
                                                    placeholder="Enter search..."
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
                                            <Link to={update_categories} style={{ color: 'white' }}>
                                                <button className="btn btn-primary btn-round ml-auto">
                                                    <i className="fa fa-plus " /> Add
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Id</th>
                                                    <th>Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>{showData(data)}</tbody>
                                        </table>
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

export default Categories;
