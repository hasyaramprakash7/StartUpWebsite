import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api';

const SignUp = () => {
    const [mode, setMode] = useState('email');
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'user',
    });
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleOtpRequest = async () => {
        try {
            await API.post('/auth/send-otp', {
                phone: form.phone,
                name: form.name,
                role: form.role,
            });
            setOtpSent(true);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to send OTP');
        }
    };

    const handlePhoneSignup = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/verify-otp', {
                phone: form.phone,
                otp,
                role: form.role,
            });
            alert('Signup successful');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'OTP verification failed');
        }
    };

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/signup', form);
            alert('Signup successful');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

                <div className="flex justify-center mb-4 space-x-4">
                    <button
                        onClick={() => setMode('email')}
                        className={`px-4 py-2 rounded-full ${mode === 'email' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Email Signup
                    </button>
                    <button
                        onClick={() => setMode('phone')}
                        className={`px-4 py-2 rounded-full ${mode === 'phone' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Phone Signup
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mb-4 w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mb-4 w-full border p-2 rounded"
                    required
                />
                <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="mb-4 w-full border p-2 rounded"
                >
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                    <option value="deliveryBoy">Delivery Boy</option>
                </select>

                {mode === 'email' && (
                    <form onSubmit={handleEmailSignup}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="mb-4 w-full border p-2 rounded"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="mb-6 w-full border p-2 rounded"
                            required
                        />
                        <button className="w-full bg-purple-600 text-white py-2 rounded-full">
                            Sign Up with Email
                        </button>
                    </form>
                )}

                {mode === 'phone' && (
                    <form onSubmit={handlePhoneSignup}>
                        {!otpSent ? (
                            <button
                                type="button"
                                onClick={handleOtpRequest}
                                className="mb-4 w-full bg-blue-600 text-white py-2 rounded-full"
                            >
                                Send OTP
                            </button>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="mb-4 w-full border p-2 rounded"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 text-white py-2 rounded-full"
                                >
                                    Verify OTP & Sign Up
                                </button>
                            </>
                        )}
                    </form>
                )}

                <div className="mt-4 text-center">
                    <span className="text-gray-600 text-sm">Already have an account?</span>
                    <button
                        onClick={() => navigate('/login')}
                        className="ml-2 text-purple-600 font-semibold hover:underline"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
