import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import { admin_url, public_url } from '../../services/base_url';
import { SUCCESS } from '../../services/constant';
import { categories } from '../../services/link_redirect';
import * as ProductService from '../../services/ProductService';
import Redirect from '../../utils/Redirect';
import Toast, { toast_error, toast_success, toast_warning } from '../../utils/Toast';
function UpdateProduct() {
    let { productId } = useParams();
    const [dataCategories, setDataCategories] = useState([]);

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
                setData(result.data.data);
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

    const handleUpdate = (e) => {
        e.preventDefault();
        const url = `${admin_url}/products`;
        if (data.id === '') {
            Toast(toast_warning, 'Please enter id!');
            return;
        }
        if (data.name === '') {
            Toast(toast_warning, 'Please enter name!');
            return;
        }
        if (data.price === '') {
            Toast(toast_warning, 'Please enter price!');
            return;
        }
        if (data.inventoryNumber === '') {
            Toast(toast_warning, 'Please enter inventoryNumber!');
            return;
        } else {
            axios
                .post(url, data)
                .then((response) => {
                    if (response.data.http_code == SUCCESS) {
                        console.log(response.data);
                        // if (file) {
                        //     uploadFile(response.data.id);
                        // }
                        Toast(toast_success, 'Success!');
                        setTimeout(() => Redirect(''), 5000);
                    }
                })
                .catch((e) => {
                    Toast(toast_error, 'An error occurred! Please try again!');
                });
        }
    };

    function uploadFile(id) {
        const url = `${public_url}/products/image`;
        const formData = new FormData();
        formData.append('id', id);
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios
            .post(url, formData, config)
            .then((response) => {
                // Toast('success', 'Successfully updated!!');
            })
            .catch((error) => {
                Toast(toast_error, 'Something went wrong : ' + error);
            });
    }

    const handleClickCancel = (e) => {
        e.preventDefault();
        swal({
            title: 'Hủy chỉnh sửa?',
            icon: toast_warning,
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setTimeout(() => Redirect(''), 1000);
            }
        });
    };

    const [file, setFile] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
        setFile(e.target.files[0]);
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
                                        <div
                                            className="card-title"
                                            style={{ display: 'flex', justifyContent: 'center' }}
                                        >
                                            {isUpdate ? 'Cập nhập sản phẩm' : 'Thêm mới sản phẩm'}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="id">Mã sản phẩm</label>
                                                    <input
                                                        disabled={isUpdate ? true : false}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập mã sản phẩm"
                                                        name="id"
                                                        value={data.id || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="name">Tên sản phẩm</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập tên sản phẩm"
                                                        name="name"
                                                        value={data.name || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Danh mục sản phẩm</label>
                                                    <select
                                                        className="form-control form-control"
                                                        name="categoryId"
                                                        onChange={onChange}
                                                    >
                                                        {dataCategories.map((item) => (
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
                                                    <label>Tình trạng</label>
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
                                                    <label>Sản phẩm mới ?</label>
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
                                            </div>
                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <input
                                                        type="file"
                                                        className="form-control-file"
                                                        onChange={onSelectFile}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-4 col-sm-4"></div>
                                                        <div className="col-4 col-sm-4">
                                                            {selectedFile ? (
                                                                <img
                                                                    src={preview}
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        width: '200px',
                                                                        height: '200px',
                                                                    }}
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={data.image || ''}
                                                                    alt="title"
                                                                    className=""
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        width: '200px',
                                                                        height: '200px',
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="col-4 col-sm-4"></div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="price">Giá</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Nhập giá"
                                                        name="price"
                                                        onChange={onChange}
                                                        value={data.price || ''}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="quantity">Số lượng</label>
                                                    <input
                                                        disabled={isUpdate ? true : false}
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Nhập số lượng"
                                                        name="inventoryNumber"
                                                        onChange={onChange}
                                                        value={data.inventoryNumber || ''}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <CKEditor
                                                name="description"
                                                editor={ClassicEditor}
                                                data={data.description}
                                                onChange={(event, editor) => {
                                                    data.description = editor.getData();
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="card-action" style={{ textAlign: 'center' }}>
                                        <button type="submit" className="btn btn-success mr-5" onClick={handleUpdate}>
                                            {isUpdate ? 'Cập nhập' : 'Thêm mới'}
                                        </button>
                                        <button type="cancel" className="btn btn-danger" onClick={handleClickCancel}>
                                            Hủy
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
