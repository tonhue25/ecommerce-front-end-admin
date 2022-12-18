// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import * as CartDetailService from '../../services/CartDetailService';
// import * as EmployeeService from '../../services/EmployeeService';
// import * as CartService from '../../services/CartService';
// import axios from 'axios';
// import * as constant from '../../services/constant';
// import { admin_url } from '../../services/base_url';
// import CurrencyFormat from 'react-currency-format';
// import Redirect from '../../utils/Redirect';
// import Toast from '../../utils/Toast';
// import { ToastContainer } from 'react-toastify';
// import Moment from 'moment';
// function CartDetailsShipping() {
//     let { id } = useParams();
//     const [employees, setEmployees] = useState([]);
//     const [cartDetails, setCartDetails] = useState([]);
//     const [states, setStates] = useState();
//     const [totals, setTotals] = useState();
//     const [isUpdate, setIsUpdate] = useState(false);

//     const [searchState, setSearchState] = useState(
//         useEffect(() => {
//             const getOne = async () => {
//                 const result = await CartService.getOne(id);
//                 setCart(result.data);
//                 return result.data.deliveryId;
//             };
//             getOne();
//         }, []),
//     );
//     const [cart, setCart] = useState();

//     useEffect(() => {
//         const getDetailCart = async () => {
//             const result = await CartDetailService.getDetailCart(id);
//             setCartDetails(result.data.list);
//             setTotals(result.data.total);
//             setStates(result.data.state);
//             return result.data.list;
//         };
//         getDetailCart();
//     }, [isUpdate]);

//     useEffect(() => {
//         const getOne = async () => {
//             const result = await CartService.getOne(id);
//             setCart(result.data);
//             console.log(result.data);
//             return result.data;
//         };
//         getOne();
//     }, []);

//     useEffect(() => {
//         const getAllEmployeeByDepartment = async () => {
//             const result = await EmployeeService.getAllEmployeeByDepartment('shipping');
//             setEmployees(result.data);
//             return result.data;
//         };
//         getAllEmployeeByDepartment();
//     }, []);

//     const handleConfirm = (cartId, status) => {
//         let statusChange;
//         if (status === constant.DELIVERING) {
//             statusChange = constant.DELIVERED;
//         }
//         setIsUpdate(true);
//         let employeeDelivery = JSON.parse(localStorage.getItem('accessToken')).id;
//         axios({
//             method: 'put',
//             url: `${admin_url}/carts/${id}`,
//             data: {
//                 id: cartId,
//                 employeeConfirm: cart.confirmId,
//                 employeeDelivery: employeeDelivery,
//                 state: statusChange,
//             },
//         })
//             .then(function (response) {
//                 setIsUpdate(true);
//                 Toast('success', 'Cập nhật thành công!');
//                 setTimeout(() => Redirect('my-invoices'), 3000);
//             })
//             .catch(function (error) {
//                 setIsUpdate(false);
//             });
//         setIsUpdate(false);
//     };

//     const handleChangeState = (e) => {
//         setSearchState(e.target.value);
//     };

//     return (
//         <div className="main-panel">
//             <ToastContainer />
//             <div className="content">
//                 <div className="page-inner">
//                     <div className="row">
//                         <div className="col-md-12">
//                             <div className="card">
//                                 <div className="card-header">
//                                     <div style={{ display: 'flex', justifyContent: 'center' }}>
//                                         <h3>THÔNG TIN ĐƠN HÀNG</h3>
//                                     </div>
//                                 </div>
//                                 <div className="card-header">
//                                     <div className="d-flex align-items-center">
//                                         {cart ? (
//                                             <>
//                                                 <div className="col-md-6 col-lg-6">
//                                                     <h5>Tên khách hàng: {cart.customerName}</h5>
//                                                     <h5>Email: {cart.emailRevicer}</h5>

//                                                     <h5>Số điện thoại: {cart.phoneNumber}</h5>
//                                                     <h5>Địa chỉ: {cart.addressDelivery}</h5>
//                                                 </div>
//                                                 <div className="col-md-6 col-lg-6">
//                                                     <h5>Nhân viên xác nhận: {cart.confirmName}</h5>
//                                                     <h5>Nhân viên vận chuyển: {cart.deliveryName}</h5>
//                                                     <h5>
//                                                         Đã thanh toán:{' '}
//                                                         {cart.isPaid === 'true' ? 'Đã thanh toán' : 'Chưa thanh toán'}
//                                                     </h5>
//                                                     <h5>Ngày đặt: {Moment(cart.createDate).format('DD/MM/YYYY')}</h5>
//                                                     <h5>Ngày giao: {Moment(cart.dateDelivery).format('DD/MM/YYYY')}</h5>
//                                                 </div>
//                                             </>
//                                         ) : (
//                                             <></>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="card-body">
//                                     <div className="row p-3">
//                                         <div
//                                             className="col-md-6 col-lg-6"
//                                             style={{ display: 'flex', justifyContent: 'flex-start' }}
//                                         >
//                                             <br />
//                                             <div className="input-icon">
//                                                 <h3>Danh sách sản phẩm</h3>
//                                             </div>
//                                         </div>
//                                         <div
//                                             className="col-md-6 col-lg-6"
//                                             style={{ display: 'flex', justifyContent: 'space-around' }}
//                                         >
//                                             <br />
//                                             <div className="input-icon">
//                                                 <h4>Trạng thái: {states}</h4>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="table-responsive">
//                                         <table className="display table table-striped table-hover">
//                                             <thead>
//                                                 <tr>
//                                                     <th>Ảnh</th>
//                                                     <th>Tên sản phẩm</th>
//                                                     <th>Số lượng</th>
//                                                     <th>Giá</th>
//                                                     <th>Tổng</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {cartDetails.map((data, index) => (
//                                                     <tr key={index}>
//                                                         <td style={{ width: '10%', justifyContent: 'center' }}>
//                                                             <p className="avatar-lg ">
//                                                                 <img
//                                                                     src={data.productImage}
//                                                                     className="avatar-img rounded-circle"
//                                                                 />
//                                                             </p>
//                                                         </td>
//                                                         <td>{data.productName}</td>
//                                                         <td>x {data.quantity}</td>
//                                                         <td>
//                                                             <CurrencyFormat
//                                                                 value={data.price}
//                                                                 displayType={'text'}
//                                                                 thousandSeparator={true}
//                                                                 suffix={' đ '}
//                                                             />
//                                                         </td>
//                                                         <td>
//                                                             <CurrencyFormat
//                                                                 value={data.quantity * data.price}
//                                                                 displayType={'text'}
//                                                                 thousandSeparator={true}
//                                                                 suffix={' đ '}
//                                                             />
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                                 <tr>
//                                                     <td></td>
//                                                     <td>Tổng tiền</td>
//                                                     <td></td>
//                                                     <td></td>
//                                                     <td>
//                                                         <CurrencyFormat
//                                                             value={totals}
//                                                             displayType={'text'}
//                                                             thousandSeparator={true}
//                                                             suffix={' đ '}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                     <div className="row p-3" style={{ display: 'flex', justifyContent: 'center' }}>
//                                         {states == constant.DELIVERING ? (
//                                             <div>
//                                                 <button
//                                                     className="btn btn-primary btn-round ml-auto mr-5"
//                                                     onClick={() => handleConfirm(id, states)}
//                                                 >
//                                                     <i className="fa fa-check" /> Xác nhận
//                                                 </button>
//                                             </div>
//                                         ) : (
//                                             <></>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CartDetailsShipping;

import axios from 'axios';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { admin_url, user_url } from '../../services/base_url';
import * as constant from '../../services/constant';
import Toast from '../../utils/Toast';

import Moment from 'moment';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import * as CartService from '../../services/CartService';
import * as InvoiceService from '../../services/InvoiceService';
import { employees, list } from '../../services/link_redirect';
function CartDetailsShipping() {
    let { id } = useParams();
    const [dataEmployees, setDataEmployees] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [cart, setCart] = useState();
    const [searchState, setSearchState] = useState();

    // get employees in shipping department
    useEffect(() => {
        const getEmployees = async () => {
            axios
                .post(`${admin_url}/${employees}/${list}`, {
                    departmentId: [constant.shipping],
                })
                .then(function (response) {
                    if (response.data.http_code == constant.SUCCESS) {
                        setDataEmployees(response.data.data.list);
                        setSearchState(response.data.data.list[0].id);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getEmployees();
    }, []);

    const handleClickCancel = (cartId) => {
        setIsUpdate(true);
        let employeeConfirm = JSON.parse(localStorage.getItem('accessToken')).data.account.id;
        axios({
            method: 'put',
            url: `${user_url}/carts`,
            data: {
                id: cartId,
                state: constant.CANCEL,
                dateDelivery: new Date(),
                employeeConfirmId: employeeConfirm,
            },
        })
            .then(function (response) {
                setIsUpdate(true);
                if (response.data.http_code == constant.SUCCESS) {
                    Toast('success', 'Success!');
                }
                setIsUpdate(false);
            })
            .catch(function (error) {
                setIsUpdate(false);
            });
        setIsUpdate(false);
    };

    const handleConfirm = (cartId) => {
        setIsUpdate(true);
        let employeeConfirm = JSON.parse(localStorage.getItem('accessToken')).data.account.id;
        let employeeDeliveryId = JSON.parse(localStorage.getItem('accessToken')).data.account.id;
        axios({
            method: 'put',
            url: `${user_url}/carts`,
            data: {
                id: cartId,
                state: constant.DELIVERED,
                dateDelivery: new Date(),
                employeeConfirmId: employeeConfirm,
                employeeDeliveryId: employeeDeliveryId,
                isPaid: 1,
                methodPayment: 'PAYMENT_ON_DELIVERY',
            },
        })
            .then(function (response) {
                setIsUpdate(true);
                if (response.data.http_code == constant.SUCCESS) {
                    Toast('success', 'Success!');
                }
                setIsUpdate(false);
            })
            .catch(function (error) {
                setIsUpdate(false);
            });
        setIsUpdate(false);
    };

    const handleChangeState = (e) => {
        setSearchState(e.target.value);
    };

    const [dataInvoice, setDataInvoice] = useState({
        taxCode: '',
        employeeId: '',
        cartId: '',
    });

    const componentRef = useRef();
    const saveInvoice = () => {
        dataInvoice.employeeId = JSON.parse(localStorage.getItem('accessToken')).id;
        dataInvoice.cartId = id;
        if (cart.customer.taxCode) {
            dataInvoice.taxCode = cart.customer.taxCode;
        }
        axios({
            method: 'post',
            url: `${admin_url}/invoices`,
            data: dataInvoice,
        })
            .then(function (response) {
                Toast('success', 'Success!');
                setTimeout(() => handlePrint(), 3000);
                setTimeout(() => setIsUpdate(true), 6000);
            })
            .catch(function (error) {
                Toast('error', error);
            });
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Invoice Detail',
    });

    const [invoice, setInvoice] = useState();
    useEffect(() => {
        const getOne = async () => {
            const result = await InvoiceService.getOne(id);
            setInvoice(result.data);
            return result.data;
        };
        getOne();
    }, [isUpdate]);

    useEffect(() => {
        const getOne = async () => {
            const response = await CartService.getOne(id);
            if (response.data.http_code == constant.SUCCESS) {
                setCart(response.data.data);
            }
        };
        getOne();
    }, [isUpdate]);

    const showData = (cart) => {
        if (cart.cartDetails.length > 0) {
            const Items = [];
            for (let i = 0; i < cart.cartDetails.length; i++) {
                Items.push(
                    <tr key={i}>
                        <td
                            style={{
                                width: '10%',
                                justifyContent: 'center',
                            }}
                        >
                            <p className="avatar-lg ">
                                <img src={cart.cartDetails[i].productImage} className="avatar-img rounded-circle" />
                            </p>
                        </td>
                        <td>{cart.cartDetails[i].productName}</td>
                        <td>x {cart.cartDetails[i].quantity}</td>
                        <td>
                            <CurrencyFormat
                                value={cart.cartDetails[i].price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ '}
                            />
                        </td>
                        <td>
                            <CurrencyFormat
                                value={cart.cartDetails[i].quantity * cart.cartDetails[i].price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ '}
                            />
                        </td>
                    </tr>,
                );
            }
            return Items;
        }
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
                                    <div className="d-flex align-items-center">
                                        <div className="col-md-6 col-lg-4">
                                            <div className="form-group form-group-default">
                                                {/* {cart ? ( */}
                                                <div className="form-group">
                                                    <label>Nhân viên giao hàng</label>
                                                    <select
                                                        className="form-control form-control"
                                                        onChange={handleChangeState}
                                                        disabled={true}
                                                    >
                                                        {dataEmployees.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                                // selected={item.id === cart.deliveryId}
                                                            >
                                                                {item.id + ' - ' + item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* ) : (<></> */}
                                                {/* )} */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-6"></div>
                                        <div className="col-md-2 col-lg-2">
                                            {/* {invoice ? (
                                                <Link to={`/invoice/${id}`} style={{ color: 'white' }}>
                                                    <button
                                                        onClick={() => saveInvoice()}
                                                        className="btn btn-primary btn-round ml-auto"
                                                    >
                                                        View Invoice
                                                    </button>
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={() => saveInvoice()}
                                                    className="btn btn-primary btn-round ml-auto"
                                                >
                                                    Export Invoice
                                                </button>
                                            )} */}
                                        </div>
                                    </div>
                                </div>
                                <div ref={componentRef}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }} className="m-4">
                                        <h3>ORDER DETAILS</h3>
                                    </div>
                                    <div className="card-header">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            {cart ? (
                                                <>
                                                    <div className="col-md-4 col-lg-4">
                                                        <h5>Customer Name: {cart.customerName}</h5>
                                                        <h5>Email: {cart.emailReceiver}</h5>

                                                        <h5>Phone Number: {cart.phoneNumber}</h5>
                                                        <h5>Address: {cart.addressDelivery}</h5>
                                                    </div>
                                                    <div className="col-md-4 col-lg-4">
                                                        <h5>Confirm Employee: {cart.confirmName}</h5>
                                                        <h5>Shipper: {cart.deliveryName}</h5>
                                                        <h5>Paid: {cart.isPaid === 'true' ? 'Yes' : 'No'}</h5>
                                                        <h5>
                                                            Order date: {Moment(cart.createDate).format('DD/MM/YYYY')}
                                                        </h5>
                                                        <h5>
                                                            Delivery date:{' '}
                                                            {cart.dateDelivery ? (
                                                                Moment(cart.dateDelivery).format('DD/MM/YYYY')
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </h5>
                                                        <h5>Status : {cart.state}</h5>
                                                    </div>
                                                    {invoice ? (
                                                        <></>
                                                    ) : (
                                                        <div className="col-md-4 col-lg-4">
                                                            <h5>
                                                                Export Date :
                                                                {Moment(new Date()).format(' dddd, DD/MM/YYYY h:mm:ss')}
                                                            </h5>
                                                            <h5>
                                                                Export Employee :{' '}
                                                                {JSON.parse(localStorage.getItem('accessToken')).name}
                                                            </h5>
                                                            <h5>Status : {cart.state}</h5>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="display table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                {cart ? (
                                                    <>
                                                        <tbody>
                                                            {showData(cart)}
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    <h3 style={{ fontWeight: 'bolder' }}>Total</h3>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>
                                                                    <h3 style={{ fontWeight: 'bolder' }}>
                                                                        <CurrencyFormat
                                                                            value={cart.totalVND || ''}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                            suffix={' đ '}
                                                                        />
                                                                    </h3>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row p-3" style={{ display: 'flex', justifyContent: 'center' }}>
                                        {cart ? (
                                            cart.state == constant.DELIVERING ? (
                                                <>
                                                    <div>
                                                        <button
                                                            className="btn btn-primary btn-round ml-auto mr-5"
                                                            onClick={() => handleConfirm(id)}
                                                        >
                                                            <i className="fa fa-check" /> Xác nhận
                                                        </button>

                                                        <button
                                                            className="btn btn-danger btn-round ml-auto"
                                                            onClick={() => handleClickCancel(id)}
                                                        >
                                                            <i className="fa fa-trash" /> Hủy
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            )
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

export default CartDetailsShipping;
