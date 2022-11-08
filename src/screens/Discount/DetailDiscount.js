import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as DiscountDetailService from '../../services/DiscountDetailService';
import * as ProductService from '../../services/ProductService';
import axios from 'axios';
import { admin_url } from '../../services/base_url';
import swal from 'sweetalert';
import Redirect from '../../utils/Redirect';
import Toast from '../../utils/Toast';
function DetailDiscount() {
    let { discountId } = useParams();
    const [isReload, setIsReload] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState();
    const [dataSubmit, setDataSubmit] = useState({
        productId: '',
        discountId: '',
        percentDiscount: '',
        name: '',
    });

    useEffect(() => {
        if (discountId == null) {
            discountId = 'all';
        }
        const getListForDiscountProduct = async () => {
            const result = await ProductService.getListForDiscountProduct(discountId);
            setCategories(result.data);
            return result.data;
        };
        getListForDiscountProduct();
    }, [isReload]);

    useEffect(() => {
        const getListDiscountDetail = async () => {
            const result = await DiscountDetailService.getListDiscountDetail(discountId);
            setProducts(result.data);
        };
        getListDiscountDetail();
    }, [isReload, discountId]);

    const handleSubmit = (e) => {
        setIsReload(true);
        e.preventDefault();
        const url = `${admin_url}/discount-details`;
        dataSubmit.discountId = discountId;
        axios
            .post(url, dataSubmit)
            .then(() => {
                Toast('success', 'Successful!');
                setIsReload(false);
                setName('');
                setDataSubmit((dataSubmit.percentDiscount = ''));
            })
            .catch((error) => {
                Toast('error', 'An error occurred! Please try again!');
            });
    };

    const onChange = (e) => {
        setDataSubmit({ ...dataSubmit, [e.target.name]: e.target.value });
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

    const handleSetData = (data) => {
        setDataSubmit(data);
        setName(data.product.name);
    };

    const deleteItem = (data) => {
        setIsReload(true);
        const url = `${admin_url}/discount-details`;
        axios
            .put(url, data)
            .then(() => {
                Toast('success', 'Successful!');
                setIsReload(false);
            })
            .catch((error) => {
                Toast('error', 'An error occurred! Please try again!');
            });
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
                                    <div className="card-title" style={{ display: 'flex', justifyContent: 'center' }}>
                                        Update
                                    </div>
                                </div>
                                <form>
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <div className="col-md-4 col-lg-4"></div>
                                            <div className="col-md-4 col-lg-4">
                                                <div className="form-group">
                                                    <label>Product</label>
                                                    <select
                                                        className="form-control form-control"
                                                        name="productId"
                                                        onChange={onChange}
                                                    >
                                                        {name ? (
                                                            <option
                                                                key={dataSubmit.productId}
                                                                value={dataSubmit.productId}
                                                                name="productId"
                                                            >
                                                                {dataSubmit.productId + ' - ' + name}
                                                            </option>
                                                        ) : (
                                                            <>
                                                                {categories.map((item) => (
                                                                    <option
                                                                        key={item.id}
                                                                        value={item.id}
                                                                        name="productId"
                                                                    >
                                                                        {item.id + ' - ' + item.name}
                                                                    </option>
                                                                ))}
                                                            </>
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>Percent Discount</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="percentDiscount"
                                                        value={dataSubmit.percentDiscount || ''}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="card-action" style={{ textAlign: 'center' }}>
                                                    <button
                                                        onClick={handleSubmit}
                                                        type="submit"
                                                        className="btn btn-success mr-5"
                                                    >
                                                        Add
                                                    </button>
                                                    <button
                                                        type="cancel"
                                                        className="btn btn-danger"
                                                        onClick={handleClickCancel}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-lg-4"></div>
                                        </div>
                                    </div>
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <div className="col-md-12 col-lg-12">
                                                <div className="table-responsive">
                                                    <table className="display table table-striped table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Id</th>
                                                                <th>Image</th>
                                                                <th>Name</th>
                                                                <th>Percent Discount</th>
                                                                <th>Price</th>
                                                                <th>Delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {products.map((item) => (
                                                                <tr
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => {
                                                                        handleSetData(item);
                                                                    }}
                                                                >
                                                                    <td
                                                                        style={{
                                                                            width: '15%',
                                                                            justifyContent: 'center',
                                                                        }}
                                                                    >
                                                                        {item.product.id}
                                                                    </td>

                                                                    <td
                                                                        style={{
                                                                            width: '15%',
                                                                            justifyContent: 'center',
                                                                        }}
                                                                    >
                                                                        <p className="avatar-lg ">
                                                                            <img
                                                                                src={item.product.image}
                                                                                className="avatar-img rounded-circle"
                                                                            />
                                                                        </p>
                                                                    </td>
                                                                    <td>{item.product.name}</td>
                                                                    <td>
                                                                        <CurrencyFormat
                                                                            value={item.percentDiscount}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                            suffix={' % '}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <CurrencyFormat
                                                                            value={item.product.price}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                            suffix={' đ '}
                                                                        />
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            width: '5%',
                                                                            justifyContent: 'center',
                                                                        }}
                                                                    >
                                                                        <div className="form-button-action">
                                                                            <button
                                                                                onClick={() => deleteItem(item)}
                                                                                type="button"
                                                                                data-toggle="tooltip"
                                                                                title="Remove"
                                                                                className="btn btn-link btn-danger"
                                                                            >
                                                                                <i className="fa fa-times" />
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailDiscount;
