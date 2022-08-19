import { Link } from 'react-router-dom';
function EmployeeItem({ data, deleteItem }) {
    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.birthday}</td>
            <td>{data.address}</td>
            <td>{data.department.name}</td>
            <td>{data.status}</td>
            <td>
                <div className="form-button-action">
                    <button
                        type="button"
                        data-toggle="tooltip"
                        title="Edit"
                        className="btn btn-link btn-primary btn-lg"
                        data-original-title="Edit Task"
                    >
                        <Link to={'/update-employee/' + data.id}>
                            <i className="fa fa-edit"></i>
                        </Link>
                    </button>
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
                </div>
            </td>
        </tr>
    );
}

export default EmployeeItem;
