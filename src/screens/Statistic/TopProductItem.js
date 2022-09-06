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
            <td style={{ width: '10%' }}>{values.id}</td>
            <td style={{ width: '10%', justifyContent: 'center' }}>
                <p className="avatar-lg ">
                    <img src={values.image} className="avatar-img rounded-circle" />
                </p>
            </td>
            <td style={{ width: '20%' }}>{values.name}</td>
            <td style={{ width: '10%' }}>
                {point > 0 ? (
                    <Rating precision={0.25} name="size-large" value={point || 0} size="small" readOnly />
                ) : (
                    <span></span>
                )}
            </td>
            <td style={{ width: '15%' }}>
                <CurrencyFormat value={values.inventoryNumber} displayType={'text'} thousandSeparator={true} />
            </td>

            <td style={{ width: '15%' }}>
                <CurrencyFormat value={data.quantity} displayType={'text'} thousandSeparator={true} />
            </td>
            <td style={{ width: '20%' }}>
                <CurrencyFormat value={data.total} displayType={'text'} thousandSeparator={true} suffix={' đ '} />
            </td>
        </tr>
    );
}

export default TopProductItem;
