import { Rating } from '@mui/material';
function CommentItem({ data, deleteItem }) {
    return (
        <tr>
            <td style={{ width: '10%' }}>{data.customer.name}</td>
            <td style={{ width: '10%' }}>
                <Rating precision={0.25} name="size-large" value={data.point || 0} size="small" readOnly />
            </td>
            <td style={{ width: '40%' }}>{data.description}</td>
            <td style={{ width: '15%' }}>{data.createdDate}</td>
            <td style={{ width: '15%' }}>{data.modifiedDate}</td>
            <td style={{ width: '10%' }}>
                <div className="form-button-action">
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

export default CommentItem;
