import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import * as ProductService from '../../services/ProductService';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
function InventoryItem({ data, deleteProduct }) {
    const [point, setPoint] = useState(0);
    useEffect(() => {
        const fetchApiGetPoint = async () => {
            const result = await ProductService.getPoint(data.id);
            setPoint(result.data);
            return result.data;
        };
        fetchApiGetPoint();
    }, []);

    return (
        <tr>
            <td style={{ width: '20%' }}>{data.id}</td>
            <td style={{ width: '20%', justifyContent: 'center' }}>
                <p className="avatar-lg ">
                    <img src={data.image} className="avatar-img rounded-circle" />
                </p>
            </td>
            <td style={{ width: '40%' }}>{data.name}</td>
            <td style={{ width: '20%', justifyContent: 'center' }}>
                <CurrencyFormat value={data.inventoryNumber} displayType={'text'} thousandSeparator={true} />
            </td>
            {/* <td>
                <div className="form-button-action">
                    <button
                        type="button"
                        data-toggle="tooltip"
                        title="Edit"
                        className="btn btn-link btn-primary btn-lg"
                        data-original-title="Edit Task"
                    >
                        <Link to={'/update-product/' + data.id}>
                            <i className="fa fa-edit"></i>
                        </Link>
                    </button>
                </div>
            </td> */}
        </tr>
    );
}

export default InventoryItem;
