import { Link } from 'react-router-dom';
function CustomerItem({ data, deleteItem }) {
    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.phoneNumber}</td>
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
            <td>{data.address}</td>
            <td>
                <div className="form-button-action">
                    <button
                        type="button"
                        data-toggle="tooltip"
                        title="Edit"
                        className="btn btn-link btn-primary btn-lg"
                        data-original-title="Edit Task"
                    >
                        <Link to={'/update-customer/' + data.id}>
                            <i className="fa fa-edit"></i>
                        </Link>
                    </button>
                    {data.status === 'true' ? (
                        <button
                            onClick={() => deleteItem(data.id)}
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

export default CustomerItem;
