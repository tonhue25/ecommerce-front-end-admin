import CurrencyFormat from 'react-currency-format';
function ProductItem({ data, deleteProduct, updateData }) {
    return (
        <tr onClick={() => updateData(data)} style={{ cursor: 'pointer' }}>
            <td>{data.product.id}</td>
            <td style={{ width: '10%', justifyContent: 'center' }}>
                <p className="avatar-lg ">
                    <img src={data.product.image} className="avatar-img rounded-circle" />
                </p>
            </td>
            <td>{data.product.name}</td>
            <td>
                <CurrencyFormat value={data.quantity} displayType={'text'} thousandSeparator={true} />
            </td>
            <td>
                <CurrencyFormat value={data.price} displayType={'text'} thousandSeparator={true} suffix={' đ '} />
            </td>
            <td style={{ width: '10%', justifyContent: 'center' }}>
                <div className="form-button-action">
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
