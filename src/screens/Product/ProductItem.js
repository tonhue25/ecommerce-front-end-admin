import { Link } from 'react-router-dom';

function ProductItem({ data, deleteProduct }) {
    return (
        <tr>
            <td>{data.id}</td>
            <td style={{ width: '10%', justifyContent: 'center' }}>
                <p className="avatar-lg ">
                    <img src={data.image} className="avatar-img rounded-circle" />
                </p>
            </td>
            <td>{data.name}</td>
            <td>{data.inventoryNumber}</td>
            <td>{data.price}</td>
            <td>{data.status === 'true' ? 'Còn hàng' : 'Hết hàng'}</td>
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
