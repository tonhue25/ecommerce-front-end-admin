import axios from 'axios';
import Moment from 'moment';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import { admin_url } from '../../services/base_url';
import Redirect from '../../utils/Redirect';
import Toast from '../../utils/Toast';

function Warranty() {
    let { productId } = useParams();

    const [startDay, setStartDay] = useState();
    const [endDay, setEndDay] = useState();

    const [warrantyData, setWarrantyData] = useState({
        id: '',
        startDay: Moment(startDay).format('YYYY-MM-DD'),
        endDay: Moment(endDay).format('YYYY-MM-DD'),
        employeeId: JSON.parse(localStorage.getItem('accessToken')).id,
        productId: productId,
        product: {},
    });

    useEffect(() => {
        axios
            .get(`${admin_url}/warranties?productId=${productId}`)
            .then(function (response) {
                if (response.data.http_code == 'SUCCESS') {
                    setWarrantyData(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [productId]);

    const handleUpdate = (e) => {
        e.preventDefault();
        warrantyData.startDay = Moment(startDay).format('YYYY-MM-DD');
        warrantyData.endDay = Moment(endDay).format('YYYY-MM-DD');
        warrantyData.employeeId = JSON.parse(localStorage.getItem('accessToken')).data.account.id;
        warrantyData.productId = productId;
        const url = `${admin_url}/warranties`;
        if (warrantyData.id === '') {
            Toast('warning', 'Please enter id!');
            return;
        }
        if (warrantyData.startDay >= warrantyData.endDay) {
            Toast('warning', 'Please enter startDay < endDay!');
            return;
        }
        if (warrantyData.id) {
            console.log(warrantyData);
            axios
                .post(url, warrantyData)
                .then((response) => {
                    Toast('success', 'Successful!');
                    setTimeout(() => Redirect(''), 5000);
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

    const onChange = (e) => {
        setWarrantyData({ ...warrantyData, [e.target.name]: e.target.value });
    };

    const handleChangeEndDay = (e) => {
        setEndDay(e);
        warrantyData.endDay = e;
    };

    const handleChangeStartDay = (e) => {
        setStartDay(e);
        warrantyData.startDay = e;
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
                                            {warrantyData.id ? 'Update ' : 'Add '}
                                            warranty information
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            {warrantyData.product ? (
                                                <>
                                                    <div className="col-md-6 col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="id">Mã sản phẩm</label>
                                                            <input
                                                                disabled={true}
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Nhập mã sản phẩm"
                                                                name="id"
                                                                value={warrantyData.product.id || ''}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="name">Tên sản phẩm</label>
                                                            <input
                                                                disabled={true}
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Nhập tên sản phẩm"
                                                                name="name"
                                                                value={warrantyData.product.name || ''}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="row">
                                                                <div className="col-4 col-sm-4"></div>
                                                                <div className="col-4 col-sm-4">
                                                                    <img
                                                                        src={warrantyData.product.image || ''}
                                                                        alt="title"
                                                                        className=""
                                                                        style={{
                                                                            textAlign: 'center',
                                                                            width: '200px',
                                                                            height: '200px',
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-4 col-sm-4"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            <div className="col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="id">Warranty Id</label>
                                                    <input
                                                        // disabled={warrantyData.id ? true : false}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter warrantyId"
                                                        name="id"
                                                        value={warrantyData.id || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Start Date</label>
                                                    {/* <DatePicker
                                                        style={{ cursor: 'pointer' }}
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="dd/mm/yyyy"
                                                        className="form-control"
                                                        selected={
                                                            Date.parse(warrantyData.startDay) ||
                                                            startDay ||
                                                            new Date() ||
                                                            ''
                                                        }
                                                        onChange={(date: Date) => setStartDay(date)}
                                                    /> */}
                                                    <DatePicker
                                                        style={{ cursor: 'pointer' }}
                                                        placeholderText="dd/mm/yyyy"
                                                        dateFormat="dd/MM/yyyy"
                                                        className="form-control"
                                                        selected={Date.parse(warrantyData.startDay) || new Date()}
                                                        onChange={(date: Date) => handleChangeStartDay(date)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>End Date</label>
                                                    <DatePicker
                                                        style={{ cursor: 'pointer' }}
                                                        placeholderText="dd/mm/yyyy"
                                                        dateFormat="dd/MM/yyyy"
                                                        className="form-control"
                                                        selected={Date.parse(warrantyData.endDay) || new Date()}
                                                        onChange={(date: Date) => handleChangeEndDay(date)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-action" style={{ textAlign: 'center' }}>
                                        <button type="submit" className="btn btn-success mr-5" onClick={handleUpdate}>
                                            {warrantyData.id ? 'Update' : 'New'}
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

export default Warranty;
