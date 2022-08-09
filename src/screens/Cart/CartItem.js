import { Link } from 'react-router-dom';

function CartItem({ data }) {
    function convertState(state) {
        if (state == 1) {
            return 'Đã hủy';
        } else if (state == 3) {
            return 'Chờ xác nhận';
        } else if (state == 4) {
            return 'Đã thanh toán';
        } else if (state == 5) {
            return 'Đang giao hàng';
        } else if (state == 6) {
            return 'Đã giao hàng';
        } else if (state == 7) {
            return 'Đã hủy';
        } else if (state == 8) {
            return 'Đã nhận xét';
        }
    }

    return (
        <tr>
            <td>{data.cartCustomerUsername}</td>
            <td style={{ width: '10%', justifyContent: 'center' }}>
                <p className="avatar-lg ">
                    <img src={data.productImage} className="avatar-img rounded-circle" />
                </p>
            </td>
            <td>{data.productName}</td>
            <td>{data.quantity}</td>
            <td>{data.price}</td>
            <td>{convertState(data.status)}</td>
        </tr>
    );
}

export default CartItem;
