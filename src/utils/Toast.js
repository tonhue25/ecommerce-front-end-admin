import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Toast = (type, message) =>
    toast[type](message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
    });

export default Toast;

export const toast_warning = 'warning';
export const toast_success = 'success';
export const toast_error = 'error';
