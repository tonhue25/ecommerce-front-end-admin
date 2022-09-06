import { useEffect, useState, useRef } from 'react';
import * as ProductService from '../../services/ProductService';
import { PAGE_ONE, PAGE_SIZE } from '../../services/constant';
import { Pagination } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import TopProductItem from './TopProductItem';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { PDFExport } from '@progress/kendo-react-pdf';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'moment';
import CurrencyFormat from 'react-currency-format';

function TopProduct() {
    const [page, setPage] = useState(PAGE_ONE);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [total, setTotal] = useState();

    useEffect(() => {
        const getBestSellingProduct = async () => {
            const result = await ProductService.getBestSellingProduct(
                page,
                PAGE_SIZE,
                Moment(startDate).format('YYYY-MM-DD'),
                Moment(endDate).format('YYYY-MM-DD'),
            );
            setProducts(result.data.list);
            setTotalPages(result.data.totalPages);
            setTotal(result.data.total);
            return result.data.list;
        };
        getBestSellingProduct();
    }, [page, Moment(startDate).format('YYYY-MM-DD'), Moment(endDate).format('YYYY-MM-DD')]);

    function ShowProducts(products) {
        return products.map((item) => <TopProductItem key={item.productId} data={item} />);
    }

    function handleChange(page) {
        setPage(page);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const getBestSellingProduct = async () => {
            const result = await ProductService.getBestSellingProduct(
                page,
                PAGE_SIZE,
                Moment(startDate).format('YYYY-MM-DD'),
                Moment(endDate).format('YYYY-MM-DD'),
            );
            setProducts(result.data.list);
            console.log(result.data.list);
            setTotalPages(result.data.totalPages);
            setTotal(result.data.total);
            return result.data.list;
        };
        getBestSellingProduct();
    };

    const pdfExportComponent = useRef(null);
    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
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
                                            <h3>Top sản phẩm bán chạy</h3>
                                        </div>
                                        <div className="col-md-4 col-lg-6"></div>
                                        <div className="col-md-2 col-lg-2"></div>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <div className="col-md-4 col-lg-4">
                                                <div className="form-group">
                                                    <label>Từ ngày</label>
                                                    <DatePicker
                                                        style={{ cursor: 'pointer' }}
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="dd/mm/yyyy"
                                                        className="form-control"
                                                        selected={startDate || new Date()}
                                                        onChange={(date: Date) => setStartDate(date)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-lg-4">
                                                <div className="form-group">
                                                    <label>Đến ngày</label>
                                                    <DatePicker
                                                        style={{ cursor: 'pointer' }}
                                                        placeholderText="dd/mm/yyyy"
                                                        dateFormat="dd/MM/yyyy"
                                                        className="form-control"
                                                        selected={endDate || new Date()}
                                                        onChange={(date: Date) => setEndDate(date)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-lg-1">
                                                <button type="submit" className="btn btn-success mr-5">
                                                    Xem
                                                </button>
                                            </div>
                                            <div className="col-md-2 col-lg-1">
                                                <button
                                                    type="submit"
                                                    className="btn btn-success ml-5"
                                                    onClick={exportPDFWithComponent}
                                                >
                                                    Export pdf
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <PDFExport ref={pdfExportComponent} paperSize="A2">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-12">
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <h2> Hot product of Mola</h2>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <h3>
                                                        {startDate != '' && endDate != ''
                                                            ? `Hot product from ${Moment(startDate).format(
                                                                  'DD/MM/YYYY',
                                                              )} to ${Moment(endDate).format('DD/MM/YYYY')}`
                                                            : 'Hot product'}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="display table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th></th>
                                                        <th>Inventory quantity</th>
                                                        <th>Sold</th>
                                                        <th>Revenue</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ShowProducts(products)}
                                                    <tr>
                                                        <td>Toltal</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>
                                                            <CurrencyFormat
                                                                value={total}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={' đ '}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>
                                                            <tr>
                                                                <td>HCM, {Moment(endDate).format('DD/MM/YYYY')}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Create by</td>
                                                            </tr>
                                                            <tr style={{ margin: '30px !important' }}>
                                                                <td>
                                                                    {
                                                                        JSON.parse(localStorage.getItem('accessToken'))
                                                                            .name
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </td>
                                                    </tr>
                                                </tbody>
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
                                </PDFExport>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TopProduct;
