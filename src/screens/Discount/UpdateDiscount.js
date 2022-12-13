import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import * as DiscountService from '../../services/DiscountService';
import { admin_url } from '../../services/base_url';
import axios from 'axios';
import Toast from '../../utils/Toast';
import Redirect from '../../utils/Redirect';
import { useParams, Link } from 'react-router-dom';
import swal from 'sweetalert';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import { SUCCESS } from '../../services/constant';
function UpdateDiscount() {
    let { discountId } = useParams();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [discount, setDiscount] = useState(discountId);

    const [isReload, setIsReload] = useState(false);

    const [data, setData] = useState({
        id: '',
        startDate: Moment(startDate).format('YYYY-MM-DD'),
        endDate: Moment(endDate).format('YYYY-MM-DD'),
        employeeId: JSON.parse(localStorage.getItem('accessToken')).id,
        description: '',
    });

    useEffect(() => {
        if (discountId != null) {
            const getOne = async () => {
                const result = await DiscountService.getOne(discountId);
                if (result.data.http_code == SUCCESS) {
                    setData(result.data.data);
                }
            };
            getOne();
        }
    }, [isReload]);

    const [isUpdate, setIsUpdate] = useState(() => {
        if (discountId == null) {
            return false;
        } else {
            return true;
        }
    });

    const handleUpdate = (e) => {
        setIsReload(true);
        e.preventDefault();
        data.startDate = Moment(startDate).format('YYYY-MM-DD');
        data.endDate = Moment(endDate).format('YYYY-MM-DD');
        data.employeeId = JSON.parse(localStorage.getItem('accessToken')).data.account.id;
        const url = `http://localhost:8080/api/admin/discounts`;
        console.log(data);
        if (data.id === '') {
            Toast('warning', 'Please enter id!');
            return;
        }
        if (data.startDate > data.endDate) {
            Toast('warning', 'Please enter startDate < endDate!');
            return;
        }
        if (data.description === '') {
            Toast('warning', 'Please enter description!');
            return;
        } else {
            axios
                .post(url, {
                    id: data.id,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    description: data.description,
                    employeeId: JSON.parse(localStorage.getItem('accessToken')).data.account.id,
                })
                .then((response) => {
                    if (response.data.http_code == SUCCESS) {
                        Toast('success', 'Successful!');
                        discountId = response.data.id;
                        setDiscount(response.data.id);
                        setIsReload(false);
                    }
                })
                .catch((error) => {
                    Toast('error', 'An error occurred! Please try again!');
                });
        }
    };

    const handleClickCancel = (e) => {
        e.preventDefault();
        swal({
            title: 'Cancel?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setTimeout(() => Redirect(''), 1000);
            }
        });
    };

    const handleChangeEndDate = (e) => {
        setEndDate(e);
        data.endDate = e;
    };

    const handleChangeStartDate = (e) => {
        setStartDate(e);
        data.startDate = e;
    };

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setDiscount(e);
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
                                            {isUpdate ? 'Update' : 'Add'}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6 col-lg-4"></div>
                                            <br />
                                            <div className="col-md-4 col-lg-6"></div>
                                            <br />
                                            <div className="col-md-2 col-lg-2">
                                                <Link
                                                    to={'/update-discount-detail/' + discount}
                                                    style={{ color: 'white' }}
                                                >
                                                    <button className="btn btn-primary btn-round ml-auto">
                                                        <i className="fa fa-plus " /> {isUpdate ? 'Update' : 'Add'}
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="id">Id</label>
                                                    <input
                                                        disabled={isUpdate ? true : false}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder=""
                                                        name="id"
                                                        value={data.id || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Start Date</label>
                                                    <DatePicker
                                                        style={{ cursor: 'pointer' }}
                                                        placeholderText="dd/mm/yyyy"
                                                        dateFormat="dd/MM/yyyy"
                                                        className="form-control"
                                                        selected={Date.parse(data.startDate) || new Date()}
                                                        onChange={(date: Date) => handleChangeStartDate(date)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>End Date</label>
                                                    <DatePicker
                                                        style={{ cursor: 'pointer' }}
                                                        placeholderText="dd/mm/yyyy"
                                                        dateFormat="dd/MM/yyyy"
                                                        className="form-control"
                                                        selected={Date.parse(data.endDate) || new Date()}
                                                        onChange={(date: Date) => handleChangeEndDate(date)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-6">
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

export default UpdateDiscount;
