import Toast from '../utils/Toast';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import Redirect from '../utils/Redirect';
import { public_url } from '../services/base_url';

function Login({ setAccessToken }) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (id == '') {
            Toast('warning', 'Please enter id!');
            return;
        }
        if (password == '') {
            Toast('warning', 'Please enter password!');
            return;
        }
        const url = `${public_url}/login`;
        try {
            const response = await axios
                .post(url, {
                    email: id,
                    password: password,
                    role: 'EMPLOYEE',
                })
                .then(function (response) {
                    if (response.data.http_code === 'SUCCESS') {
                        localStorage.setItem('accessToken', JSON.stringify(response.data));
                        setAccessToken(localStorage.getItem('accessToken'));
                        if (JSON.parse(localStorage.getItem('accessToken')).data.account.department.id == 'shipping') {
                            Redirect('/shippings');
                        }
                    }
                })
                .catch(function (error) {
                    Toast('error', 'Incorrect username or password! Please try again!');
                    return;
                });
        } catch (err) {
            if (err.response.data.message == 'account.not.active') {
                Toast('error', 'Inactive account!!');
                return;
            }
            Toast('error', 'Incorrect username or password! Please try again!');
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
