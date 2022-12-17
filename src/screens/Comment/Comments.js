import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as CommentService from '../../services/CommentService';
import * as ProductService from '../../services/ProductService';
import Toast from '../../utils/Toast';
import CommentItem from '../Comment/CommentItem';
import axios from 'axios';
import { PAGE_SIZE } from '../../services/constant';
import { public_url } from '../../services/base_url';
function Comments() {
    let { productId } = useParams();
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [state, setState] = useState([]);
    const [product, setProduct] = useState([]);
    const [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        const getComments = async () => {
            axios
                .post(`${public_url}/comments`, {
                    page: page,
                    size: PAGE_SIZE,
                    productId: productId,
                    status: 1,
                    points: state,
                })
                .then(function (response) {
                    if (response.data.http_code) {
                        setData(response.data.data);
                        if (response.data.data.object) {
                            setProduct(response.data.data.object);
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getComments();
    }, [page, isDelete, state]);

    const ShowComments = (data) => {
        if (data.size > 0) {
            const Items = [];
            for (let i = 0; i < data.size; i++) {
                Items.push(
                    <CommentItem
                        key={data.list[i].id}
                        data={data.list[i]}
                        deleteItem={() => deleteItem(data.list[i].id, data.list[i].status)}
                    />,
                );
            }
            return Items;
        }
    };

    const deleteItem = (id) => {
        const deleteItem = async () => {
            const result = await CommentService.deleteItem(id);
            setIsDelete(true);
            Toast('success', 'Đã xóa bình luận!!');
        };
        deleteItem();
        setIsDelete(false);
    };

    function handleChange(page) {
        setPage(page);
    }

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
                                        <div className="col-md-1 col-lg-1">
                                            <p className="avatar-lg ">
                                                <img src={product.image} className="avatar-img rounded-circle" />
                                            </p>
                                        </div>
                                        <div className="col-md-4 col-lg-6">{product.name}</div>
                                        <div className="col-md-2 col-lg-4"></div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12">
                                            <div className="form-button-action mr-5">
                                                <button
                                                    type="button"
                                                    className={
                                                        state.length == 0
                                                            ? 'btn btn-primary'
                                                            : 'btn btn-outline-primary'
                                                    }
                                                    onClick={() => setState([])}
                                                >
                                                    Tất cả
                                                </button>
                                            </div>
                                            <div className="form-button-action mr-5">
                                                <button
                                                    type="button"
                                                    className={
                                                        state == 1 ? 'btn btn-primary' : 'btn btn-outline-primary'
                                                    }
                                                    onClick={() => setState([1])}
                                                >
                                                    1 sao
                                                </button>
                                            </div>
                                            <div className="form-button-action mr-5">
                                                <button
                                                    type="button"
                                                    className={
                                                        state == 2 ? 'btn btn-primary' : 'btn btn-outline-primary'
                                                    }
                                                    onClick={() => setState([2])}
                                                >
                                                    2 sao
                                                </button>
                                            </div>
                                            <div className="form-button-action mr-5">
                                                <button
                                                    type="button"
                                                    className={
                                                        state == 3 ? 'btn btn-primary' : 'btn btn-outline-primary'
                                                    }
                                                    onClick={() => setState([3])}
                                                >
                                                    3 sao
                                                </button>
                                            </div>
                                            <div className="form-button-action mr-5">
                                                <button
                                                    type="button"
                                                    className={
                                                        state == 4 ? 'btn btn-primary' : 'btn btn-outline-primary'
                                                    }
                                                    onClick={() => setState([4])}
                                                >
                                                    4 sao
                                                </button>
                                            </div>
                                            <div className="form-button-action mr-5">
                                                <button
                                                    type="button"
                                                    className={
                                                        state == 5 ? 'btn btn-primary' : 'btn btn-outline-primary'
                                                    }
                                                    onClick={() => setState([5])}
                                                >
                                                    5 sao
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Khách hàng</th>
                                                    <th></th>
                                                    <th>Nhận xét</th>
                                                    <th>Ngày bình luận</th>
                                                    <th>Ngày chỉnh sửa</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>{ShowComments(data)}</tbody>
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

export default Comments;
