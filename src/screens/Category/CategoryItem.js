import { Link } from 'react-router-dom';
// import Toast from '../../../src/components/Toast';
function CategoryItem({ data, deleteCategory }) {
    return (
        <tr>
            <td style={{ width: '20%', justifyContent: 'center' }}>
                <p className="avatar-lg ">
                    <img src={data.image} className="avatar-img rounded-circle" />
                </p>
            </td>
            <td style={{ width: '30%' }}>{data.id}</td>
            <td style={{ width: '30%' }}>{data.name}</td>
            <td style={{ width: '40%' }}>
                <div className="form-button-action">
                    <button
                        type="button"
                        title="Edit"
                        className="btn btn-link btn-primary btn-lg"
                        data-original-title="Edit Task"
                    >
                        <Link to={'/update-category/' + data.id}>
                            <i className="fa fa-edit"></i>
                        </Link>
                    </button>
                    <button
                        onClick={() => deleteCategory(data.id)}
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

export default CategoryItem;
