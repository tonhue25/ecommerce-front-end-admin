import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import * as CategoryService from '../../services/CategoryService';
import * as ProductService from '../../services/ProductService';
import { admin_url } from '../../services/base_url';
import axios from 'axios';
import Toast from '../../utils/Toast';
import Redirect from '../../utils/Redirect';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
function UpdateProduct() {
    let { productId } = useParams();
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({
        id: '',
        name: '',
        price: '',
        inventoryNumber: '',
        description: '',
        categoryId: 'balo',
        isNew: 'true',
        status: 'true',
        image: '',
    });

    useEffect(() => {
        if (productId != null) {
            const getOne = async () => {
                const result = await ProductService.getOne(productId);
                setData(result.data);
                return result.data;
            };
            getOne();
        }
    }, []);

    const [isUpdate, setIsUpdate] = useState(() => {
        if (productId == null) {
            return false;
        } else {
            return true;
        }
    });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const getAllCategories = async () => {
            const result = await CategoryService.getAllCategories();
            setCategories(result.data);
            return result.data;
        };
        getAllCategories();
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        const url = `${admin_url}/products`;
        axios
            .post(url, data)
            .then((response) => {
                if (isUpdate) {
                    Toast('success', 'Chỉnh sửa thành công!');
                } else {
                    Toast('success', 'Thêm mới thành công!');
                }
                setTimeout(() => Redirect(''), 3000);
            })
            .catch((error) => {
                Toast('error', 'Có lỗi xảy ra! Vui lòng thử lại!');
            });
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
                setTimeout(() => Redirect(''), 1000);
            }
        });
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
                                        <div className="card-title">Add new product</div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="id">Product Id</label>
                                                    <input
                                                        disabled={isUpdate ? true : false}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter id"
                                                        name="id"
                                                        value={data.id || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter name"
                                                        name="name"
                                                        value={data.name || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Category</label>
                                                    <select
                                                        className="form-control form-control"
                                                        name="categoryId"
                                                        onChange={onChange}
                                                    >
                                                        {categories.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                                name="categoryId"
                                                                selected={item.id === data.categoryId}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-check mb-1 mt-1">
                                                    <label>Status</label>
                                                    <br />
                                                    <div style={{ textAlign: 'center' }}>
                                                        <div name="status" onChange={onChange}>
                                                            <label className="form-radio-label mr-5 cursor_pointer">
                                                                <input
                                                                    className="form-radio-input mr-2 cursor_pointer"
                                                                    type="radio"
                                                                    value="true"
                                                                    name="status"
                                                                    onChange={onChange}
                                                                    checked={data.status === 'true'}
                                                                />
                                                                Active
                                                            </label>
                                                            <label className="form-radio-label mr-5 cursor_pointer">
                                                                <input
                                                                    className="form-radio-input mr-2 cursor_pointer"
                                                                    type="radio"
                                                                    value="false"
                                                                    name="status"
                                                                    onChange={onChange}
                                                                    checked={data.status === 'false'}
                                                                />
                                                                Inactive
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-check mb-1 mt-1">
                                                    <label>Is New</label>
                                                    <br />
                                                    <div style={{ textAlign: 'center' }}>
                                                        <div name="isNew" onChange={onChange}>
                                                            <label className="form-radio-label mr-5 cursor_pointer">
                                                                <input
                                                                    className="form-radio-input mr-2 cursor_pointer"
                                                                    type="radio"
                                                                    value="true"
                                                                    name="isNew"
                                                                    onChange={onChange}
                                                                    checked={data.isNew === 'true'}
                                                                />
                                                                Yes
                                                            </label>
                                                            <label className="form-radio-label mr-5 cursor_pointer">
                                                                <input
                                                                    className="form-radio-input mr-2 cursor_pointer"
                                                                    type="radio"
                                                                    value="false"
                                                                    name="isNew"
                                                                    onChange={onChange}
                                                                    checked={data.isNew === 'false'}
                                                                />
                                                                No
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="file"
                                                        className="form-control-file"
                                                        // onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-4 col-sm-4"></div>
                                                        <div className="col-4 col-sm-4">
                                                            {/* <img
                                                        src={image || ''}
                                                        alt="title"
                                                        className=""
                                                        style={{ textAlign: 'center', width: '200px', height: '200px' }}
                                                    /> */}
                                                        </div>
                                                        <div className="col-4 col-sm-4"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="price">Price</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter price"
                                                        name="price"
                                                        onChange={onChange}
                                                        value={data.price || ''}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="quantity">Quantity</label>
                                                    <input
                                                        disabled={isUpdate ? true : false}
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter quantity"
                                                        name="inventoryNumber"
                                                        onChange={onChange}
                                                        value={data.inventoryNumber || ''}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description">Description</label>
                                                    <textarea
                                                        className="form-control"
                                                        id="description"
                                                        rows={8}
                                                        name="description"
                                                        onChange={onChange}
                                                        value={data.description || ''}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-action" style={{ textAlign: 'center' }}>
                                        <button type="submit" className="btn btn-success mr-5" onClick={handleUpdate}>
                                            {isUpdate ? 'Update' : 'Add'}
                                        </button>
                                        <button type="cancel" className="btn btn-danger" onClick={handleClickCancel}>
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

export default UpdateProduct;
