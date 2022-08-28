import Pdf from 'react-to-pdf';
import CurrencyFormat from 'react-currency-format';
import { React } from 'react';

function ExportPDF({ revenues }) {
    const ref = React.createRef();
    return (
        <>
            <div className="Post" ref={ref}>
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
            </div>
            <Pdf targetRef={ref} filename="revenue.pdf">
                {({ toPdf }) => (
                    <button type="submit" className="btn btn-success mr-5" onClick={toPdf}>
                        Export excel
                    </button>
                )}
            </Pdf>
        </>
    );
}

export default ExportPDF;
