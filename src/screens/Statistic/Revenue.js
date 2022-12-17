import { useState, React, useRef, useEffect } from 'react';
import { PAGE_SIZE, PAGE_ONE } from '../../services/constant';
import * as RevenueService from '../../services/RevenueService';
import { ToastContainer } from 'react-toastify';
import CurrencyFormat from 'react-currency-format';
import { PDFExport } from '@progress/kendo-react-pdf';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Moment from 'moment';

function Revenue() {
    const [page, setPage] = useState(PAGE_ONE);
    const [revenues, setRevenues] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [totalPages, setTotalPages] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const getRevenue = async () => {
            const result = await RevenueService.getRevenue(
                page,
                PAGE_SIZE,
                Moment(startDate).format('YYYY-MM-DD'),
                Moment(endDate).format('YYYY-MM-DD'),
            );
            setRevenues(result.data.list);
            setTotalPages(result.data.totalPages);
            setTotalRevenue(result.data.totalRevenue);
            return result.data;
        };
        getRevenue();
    };

    const [yearStart, setYearStart] = useState();
    const [monthStart, setMonthStart] = useState();
    const [monthEnd, setMonthEnd] = useState();
    const [yearEnd, setYearEnd] = useState();
    const [count, setCount] = useState();

    useEffect(() => {
        setMonthStart(Moment(startDate).format('YYYY-MM-DD').split('-')[1]);
        setYearStart(Moment(startDate).format('YYYY-MM-DD').split('-')[0]);
    }, [startDate, endDate]);

    useEffect(() => {
        setMonthEnd(Moment(endDate).format('YYYY-MM-DD').split('-')[1]);
        setYearEnd(Moment(endDate).format('YYYY-MM-DD').split('-')[0]);
    }, [startDate, endDate]);

    const pdfExportComponent = useRef(null);
    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    function ShowData(count) {
        if (count > 0) {
            const Items = [];
            for (let i = 0; i < count; i++) {
                Items.push(
                    <>
                        <tr key={i}>
                            <td>{parseInt(monthStart) + i}</td>
                            <td>{yearStart}</td>
                        </tr>
                    </>,
                );
            }
            return Items;
        }
    }

    return (
        <div className="main-panel">
            <ToastContainer />
            <div className="content">
                <div className="page-inner">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <form onSubmit={handleSubmit}>
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <div className="col-md-4 col-lg-4">
                                                <div className="form-group">
                                                    <label>From</label>

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
                                                    <label>To</label>
                                                    <DatePicker
                                                        style={{ cursor: 'pointer' }}
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="dd/mm/yyyy"
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
                                <PDFExport ref={pdfExportComponent} paperSize="A3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-12">
                                                <div>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <h2> Revenue of Mola</h2>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <h3>
                                                            {startDate != '' && endDate != ''
                                                                ? `Revenue from ${Moment(startDate).format(
                                                                      'DD/MM/YYYY',
                                                                  )} to ${Moment(endDate).format('DD/MM/YYYY')}`
                                                                : 'Revenue'}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                        </div>
                                        <div className="table-responsive">
                                            <table className="display table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Month</th>
                                                        <th>Year</th>
                                                        <th>Revenue</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {revenues.map((item, index) => (
                                                        <tr key={index}>
                                                            <td style={{ width: '30%', justifyContent: 'center' }}>
                                                                {item.month}
                                                            </td>
                                                            <td style={{ width: '30%', justifyContent: 'center' }}>
                                                                {item.year}
                                                            </td>
                                                            <td style={{ width: '30%', justifyContent: 'center' }}>
                                                                <CurrencyFormat
                                                                    value={item.revenue}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    suffix={' đ '}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}

                                                    <tr>
                                                        <td>Total</td>
                                                        <td></td>
                                                        <td>
                                                            <CurrencyFormat
                                                                value={totalRevenue}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={' đ '}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
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
                                                                            .data.account.name
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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

export default Revenue;
