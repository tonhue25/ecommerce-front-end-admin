import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import * as ProductService from '../../services/ProductService';
import * as DiscountDetailService from '../../services/DiscountDetailService';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
function ProductItem({ data, deleteProduct }) {
    const [point, setPoint] = useState(0);
    useEffect(() => {
        const fetchApiGetPoint = async () => {
            const result = await ProductService.getPoint(data.id);
            setPoint(result.data);
            return result.data;
        };
        fetchApiGetPoint();
    }, []);

    // lấy thông tin giảm giá.
    const [discount, setDiscount] = useState();
    useEffect(() => {
        const getOne = async () => {
            const result = await DiscountDetailService.getOne(data.id);
            setDiscount(result.data);
            return result.data;
        };
        getOne();
    }, []);

    return (
        <tr>
            <td>{data.id}</td>
            <td style={{ width: '10%', justifyContent: 'center' }}>
                <p className="avatar-lg ">
                    <img src={data.image} className="avatar-img rounded-circle" />
                </p>
            </td>
            <td style={{ width: '30%', justifyContent: 'center' }}>{data.name}</td>
            <td style={{ width: '10%', justifyContent: 'center' }}>
                {point > 0 ? (
                    <Rating precision={0.25} name="size-large" value={point || 0} size="small" readOnly />
                ) : (
                    <span></span>
                )}
            </td>
            <td style={{ width: '10%', justifyContent: 'center' }}>
                <CurrencyFormat value={data.inventoryNumber} displayType={'text'} thousandSeparator={true} />
            </td>
            <td>{discount > 0 ? discount + ' %' : ''} </td>
            <td style={{ width: '20%', justifyContent: 'center' }}>
                <CurrencyFormat value={data.price} displayType={'text'} thousandSeparator={true} suffix={' đ '} />
            </td>
            <td style={{ width: '5%', justifyContent: 'center' }}>
                <button
                    type="button"
                    className={
                        data.status === 'true' ? 'btn-primary btn btn-link btn-lg' : 'btn-danger btn btn-link btn-lg'
                    }
                >
                    {data.status === 'true' ? <i class="fa fa-check"></i> : <i className="fa fa-times" />}
                </button>
            </td>
            <td style={{ width: '5%', justifyContent: 'center' }}>
                <Link to={`/comments/${data.id}`}>
                    <button
                        type="button"
                        data-toggle="tooltip"
                        title="Edit"
                        className="btn btn-link btn-primary btn-lg"
                        data-original-title="Edit Task"
                    >
                        <i className="fa fa-eye"></i>
                    </button>
                </Link>
            </td>

            <td style={{ width: '5%', justifyContent: 'center' }}>
                <Link to={`/warranty/${data.id}`}>
                    <button type="button" className="btn btn-link btn-primary btn-lg">
                        <i class="fa fa-lock" aria-hidden="true"></i>
                    </button>
                </Link>
            </td>
            <td style={{ width: '5%', justifyContent: 'center' }}>
                <div className="form-button-action">
                    <Link to={'/update-product/' + data.id}>
                        <button
                            type="button"
                            data-toggle="tooltip"
                            title="Edit"
                            className="btn btn-link btn-primary btn-lg"
                            data-original-title="Edit Task"
                        >
                            <i className="fa fa-edit"></i>
                        </button>
                    </Link>
                    {data.status === 'true' ? (
                        <button
                            onClick={() => deleteProduct(data.id)}
                            type="button"
                            data-toggle="tooltip"
                            title="Remove"
                            className="btn btn-link btn-danger"
                            data-original-title="Remove"
                        >
                            <i className="fa fa-times" />
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </td>
        </tr>
    );
}

export default ProductItem;
