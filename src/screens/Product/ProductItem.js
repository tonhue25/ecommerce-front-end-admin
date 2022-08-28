import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import * as ProductService from '../../services/ProductService';
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

    return (
        <tr>
            <td>{data.id}</td>
            <td style={{ width: '10%', justifyContent: 'center' }}>
                <p className="avatar-lg ">
                    <img src={data.image} className="avatar-img rounded-circle" />
                </p>
            </td>
            <td>{data.name}</td>
            <td>
                {point > 0 ? (
                    <Rating precision={0.25} name="size-large" value={point || 0} size="small" readOnly />
                ) : (
                    <span></span>
                )}
            </td>
            <td>
                <CurrencyFormat value={data.inventoryNumber} displayType={'text'} thousandSeparator={true} />
            </td>
            <td>
                <CurrencyFormat value={data.price} displayType={'text'} thousandSeparator={true} suffix={' đ '} />
            </td>
            {/* <td>{data.status === 'true' ? 'active' : 'Hết hàng'}</td> */}
            <td>
                <button
                    type="button"
                    className={
                        data.status === 'true' ? 'btn-primary btn btn-link btn-lg' : 'btn-danger btn btn-link btn-lg'
                    }
                >
                    {data.status === 'true' ? <i class="fa fa-check"></i> : <i className="fa fa-times" />}
                </button>
            </td>
            <td>
                <button
                    type="button"
                    data-toggle="tooltip"
                    title="Edit"
                    className="btn btn-link btn-primary btn-lg"
                    data-original-title="Edit Task"
                >
                    <Link to={`/comments/${data.id}`}>
                        <i className="fa fa-eye"></i>
                    </Link>
                </button>
            </td>
            <td>
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
                </div>
            </td>
        </tr>
    );
}

export default ProductItem;
