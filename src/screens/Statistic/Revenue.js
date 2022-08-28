import { useEffect, useState } from 'react';
import { PAGE_SIZE, PAGE_ONE } from '../../services/constant';
import * as RevenueService from '../../services/RevenueService';
import { Link, Pagination } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import CurrencyFormat from 'react-currency-format';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

function Revenue() {
    const [page, setPage] = useState(PAGE_ONE);
    const [revenues, setRevenues] = useState([]);
    const [totalPages, setTotalPages] = useState();

    const [data, setData] = useState({
        startDate: '2022-06',
        endDate: '2022-08',
    });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const getRevenue = async () => {
            const result = await RevenueService.getRevenue(page, PAGE_SIZE, data.startDate, data.endDate);
            setRevenues(result.data.list);
            setTotalPages(result.data.totalPages);
            return result.data;
        };
        getRevenue();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const getRevenue = async () => {
            const result = await RevenueService.getRevenue(page, PAGE_SIZE, data.startDate, data.endDate);
            setRevenues(result.data.list);
            setTotalPages(result.data.totalPages);
            return result.data;
        };
        getRevenue();
    };

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

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
                                                    <input
                                                        style={{ cursor: 'pointer' }}
                                                        className="form-control"
                                                        type="month"
                                                        onChange={onChange}
                                                        name="startDate"
                                                        value={data.startDate || ''}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-lg-4">
                                                <div className="form-group">
                                                    <input
                                                        style={{ cursor: 'pointer' }}
                                                        className="form-control"
                                                        type="month"
                                                        onChange={onChange}
                                                        name="endDate"
                                                        value={data.endDate || ''}
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
                                                    className="btn btn-success mr-5"
                                                    onClick={(e) => exportToCSV(revenues, 'revenues')}
                                                >
                                                    Export excel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4"></div>
                                        <br />
                                        <div className="col-md-4 col-lg-6"></div>
                                        <br />
                                        <div className="col-md-2 col-lg-2"></div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Tháng</th>
                                                    <th>Năm</th>
                                                    <th>Doanh thu</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {revenues.map((item) => (
                                                    <tr>
                                                        <td>{item.month}</td>
                                                        <td>{item.year}</td>
                                                        <td>
                                                            <CurrencyFormat
                                                                value={item.revenue}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={' đ '}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Revenue;
