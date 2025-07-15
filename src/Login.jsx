import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api';

const Login = () => {
    const [activeTab, setActiveTab] = useState('email');
    const [emailForm, setEmailForm] = useState({ email: '', password: '' });
    const [otpForm, setOtpForm] = useState({ phone: '', otp: '', role: 'user' });
    const [otpSent, setOtpSent] = useState(false);

    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', {
                ...emailForm,
                role: otpForm.role,
            });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err?.response?.data?.message || 'Login failed');
        }
    };

    const handleSendOtp = async () => {
        try {
            await API.post('/auth/send-otp', {
                phone: otpForm.phone,
                role: otpForm.role,
            });
            setOtpSent(true);
        } catch (err) {
            alert(err?.response?.data?.message || 'Failed to send OTP');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const res = await API.post('/auth/verify-otp', {
                phone: otpForm.phone,
                otp: otpForm.otp,
                role: otpForm.role,
            });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err?.response?.data?.message || 'OTP verification failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

                <div className="flex justify-center gap-4 mb-6">
                    <button
                        className={`px-4 py-2 rounded-full ${activeTab === 'email' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('email')}
                    >
                        Email & Password
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full ${activeTab === 'otp' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('otp')}
                    >
                        Phone OTP
                    </button>
                </div>

                {activeTab === 'email' && (
                    <form onSubmit={handleEmailLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={emailForm.email}
                            onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                            className="mb-4 w-full border p-2 rounded"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={emailForm.password}
                            onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                            className="mb-4 w-full border p-2 rounded"
                            required
                        />
                        <select
                            value={otpForm.role}
                            onChange={(e) => setOtpForm({ ...otpForm, role: e.target.value })}
                            className="mb-6 w-full border p-2 rounded"
                        >
                            <option value="user">User</option>
                            <option value="vendor">Vendor</option>
                            <option value="admin">Admin</option>
                            <option value="deliveryBoy">Delivery Boy</option>
                        </select>
                        <button className="w-full bg-purple-600 text-white py-2 rounded-full">Login</button>
                    </form>
                )}

                {activeTab === 'otp' && (
                    <div>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={otpForm.phone}
                            onChange={(e) => setOtpForm({ ...otpForm, phone: e.target.value })}
                            className="mb-4 w-full border p-2 rounded"
                            required
                        />
                        {!otpSent && (
                            <select
                                value={otpForm.role}
                                onChange={(e) => setOtpForm({ ...otpForm, role: e.target.value })}
                                className="mb-4 w-full border p-2 rounded"
                            >
                                <option value="user">User</option>
                                <option value="vendor">Vendor</option>
                                <option value="admin">Admin</option>
                                <option value="deliveryBoy">Delivery Boy</option>
                            </select>
                        )}
                        {otpSent && (
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otpForm.otp}
                                onChange={(e) => setOtpForm({ ...otpForm, otp: e.target.value })}
                                className="mb-4 w-full border p-2 rounded"
                                required
                            />
                        )}
                        <button
                            onClick={otpSent ? handleVerifyOtp : handleSendOtp}
                            className="w-full bg-purple-600 text-white py-2 rounded-full"
                        >
                            {otpSent ? 'Verify OTP & Login' : 'Send OTP'}
                        </button>
                    </div>
                )}

                <div className="mt-4 text-center">
                    <span className="text-gray-600 text-sm">Don't have an account?</span>
                    <button
                        onClick={() => navigate('/signup')}
                        className="ml-2 text-purple-600 font-semibold hover:underline"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
