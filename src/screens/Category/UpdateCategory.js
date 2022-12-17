import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import { admin_url, public_url } from '../../services/base_url';
import * as CategoryService from '../../services/CategoryService';
import { SUCCESS } from '../../services/constant';
import { categories } from '../../services/link_redirect';
import Redirect from '../../utils/Redirect';
import Toast, { toast_error, toast_success, toast_warning } from '../../utils/Toast';
function UpdateCategory() {
    let { categoryId } = useParams();

    const [data, setData] = useState({
        id: '',
        name: '',
        image: '',
    });

    const [isUpdate, setIsUpdate] = useState(() => {
        if (categoryId == null) {
            return false;
        } else {
            return true;
        }
    });

    useEffect(() => {
        if (categoryId != null) {
            const getOne = async () => {
                const response = await CategoryService.getOne(categoryId);
                if (response.data.http_code == SUCCESS) {
                    setData(response.data.data);
                }
            };
            getOne();
        }
    }, []);

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (file) {
            uploadFile(e);
        } else {
            createOrUpdate(data.image);
        }
    };

    const createOrUpdate = (urlImage) => {
        data.image = urlImage;
        const url = `${admin_url}/${categories}`;
        if (data.id === '') {
            Toast(toast_warning, 'Please enter id!');
            return;
        }
        if (data.name === '') {
            Toast(toast_warning, 'Please enter name!');
            return;
        } else {
            axios
                .post(url, data)
                .then((response) => {
                    if (response.data.http_code == 'SUCCESS') {
                        Toast(toast_success, 'Successful!');
                        setTimeout(() => Redirect(`/${categories}`), 3000);
                    } else {
                        Toast(toast_error, 'An error occurred! Please try again!');
                    }
                })
                .catch((e) => {
                    Toast(toast_error, 'An error occurred! Please try again!');
                });
        }
    };

    const handleClickCancel = (e) => {
        e.preventDefault();
        swal({
            title: 'Cancel?',
            icon: toast_warning,
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setTimeout(() => Redirect(categories), 1000);
            }
        });
    };

    function uploadFile() {
        const url = `${public_url}/upload-files`;
        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios
            .post(url, formData, config)
            .then((response) => {
                if (response.data.http_code == SUCCESS) {
                    createOrUpdate(response.data.data);
                }
            })
            .catch((e) => {
                Toast(toast_error, 'Something went wrong : ' + e);
            });
    }

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
                            <form onSubmit={handleUpdate}>
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">{isUpdate ? data.name : 'Thêm mới danh mục'} </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-3 col-lg-3"></div>
                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="name">Mã danh mục</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập mã"
                                                        name="id"
                                                        value={data.id || ''}
                                                        disabled={isUpdate ? true : false}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="name">Tên danh mục</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập tên"
                                                        name="name"
                                                        value={data.name || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
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
                                            </div>
                                            <div className="col-md-3 col-lg-3"></div>
                                        </div>
                                    </div>

                                    <div className="card-action" style={{ textAlign: 'center' }}>
                                        <button type="submit" className="btn btn-success mr-5" onClick={handleUpdate}>
                                            {isUpdate ? 'Cập nhập' : 'Thêm'}
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

export default UpdateCategory;
