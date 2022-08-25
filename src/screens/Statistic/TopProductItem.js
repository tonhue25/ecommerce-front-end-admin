import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import * as ProductService from '../../services/ProductService';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
function TopProductItem({ data }) {
    const [values, setValues] = useState({});
    const [point, setPoint] = useState(0);
    useEffect(() => {
        if (data != null) {
            const getOne = async () => {
                const result = await ProductService.getOne(data.productId);
                setValues(result.data);
                return result.data;
            };
            getOne();
        }
    }, []);

    useEffect(() => {
        const fetchApiGetPoint = async () => {
            const result = await ProductService.getPoint(data.productId);
            setPoint(result.data);
            return result.data;
        };
        fetchApiGetPoint();
    }, []);

    return (
        <tr>
            <td>{values.id}</td>
            <td style={{ width: '10%', justifyContent: 'center' }}>
                <p className="avatar-lg ">
                    <img src={values.image} className="avatar-img rounded-circle" />
                </p>
            </td>
            <td>{values.name}</td>
            <td>
                {point > 0 ? (
                    <Rating precision={0.25} name="size-large" value={point || 0} size="small" readOnly />
                ) : (
                    <span></span>
                )}
            </td>
            <td>
                <CurrencyFormat value={values.inventoryNumber} displayType={'text'} thousandSeparator={true} />
            </td>

            <td>
                <CurrencyFormat value={data.quantity} displayType={'text'} thousandSeparator={true} />
            </td>
            <td>
                <CurrencyFormat value={data.total} displayType={'text'} thousandSeparator={true} suffix={' đ '} />
            </td>
            <td>
                <button
                    type="button"
                    data-toggle="tooltip"
                    title="Edit"
                    className="btn btn-link btn-primary btn-lg"
                    data-original-title="Edit Task"
                >
                    <Link to={`/comments/${data.productId}`}>
                        <i className="fa fa-eye"></i>
                    </Link>
                </button>
            </td>
        </tr>
    );
}

export default TopProductItem;
