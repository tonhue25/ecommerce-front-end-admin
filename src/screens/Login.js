import Toast from '../utils/Toast';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import Redirect from '../utils/Redirect';
import { admin_url } from '../services/base_url';

function Login({ setAccessToken }) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (id == '') {
            Toast('warning', 'Vui lòng nhập tài khoản đăng nhập!');
            return;
        }
        if (password == '') {
            Toast('warning', 'Vui lòng nhập mật khẩu!');
            return;
        }
        const url = `${admin_url}/login`;
        try {
            const response = await axios.post(url, {
                id: id,
                password: password,
            });
            localStorage.setItem('accessToken', JSON.stringify(response.data));
            setAccessToken(localStorage.getItem('accessToken'));
            if (response.data.departmentId == 'shipping') {
                Redirect('my-invoices');
            }
        } catch (err) {
            if (err.response.data.message == 'account.not.active') {
                Toast('error', 'Tài khoản không hoạt động, vui lòng kích hoạt lại!');
                return;
            }
            Toast('error', 'Tên đăng nhập hoặc mật khẩu không chính xác!');
            return;
        }
    };

    return (
        <div>
            <div className="page-inner">
                <ToastContainer />
                <div className="col-md-12">
                    <div className="card" style={{ textAlign: 'center' }}>
                        <form>
                            <div className="card-header">
                                <div className="card-title">Login</div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 col-lg-4"></div>
                                    <div className="col-md-4 col-lg-4" style={{ textAlign: 'left' }}>
                                        <div className="form-group">
                                            <div className="input-icon">
                                                <span className="input-icon-addon">
                                                    <i className="fa fa-user" />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Username"
                                                    onChange={(e) => setId(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-lg-4"></div>
                                </div>
                            </div>
                            <div className="card-action">
                                <button onClick={handleLogin} className="btn btn-info" style={{ width: '200px' }}>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
