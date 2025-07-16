import { useState, useEffect } from 'react';
import { Mail, Phone, Lock, UserCheck, Eye, EyeOff, LogIn, XCircle, Shield, Truck, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, sendOtp, verifyOtp, resetOtp, clearError } from '../redux/auth/authSlice'; // Ensure clearError is imported

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, otpSent, token, user } = useSelector((state) => state.auth);

    const [mode, setMode] = useState('email');
    const [form, setForm] = useState({ email: '', phone: '', password: '', role: 'user' });
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const roleIcons = {
        user: User,
        vendor: UserCheck,
        admin: Shield,
        deliveryBoy: Truck
    };

    const roleLabels = {
        user: 'User',
        vendor: 'Vendor',
        admin: 'Admin',
        deliveryBoy: 'Delivery Partner'
    };

    // This useEffect handles the navigation to the dashboard after successful login
    useEffect(() => {
        if (token && user) {
            // Add a small delay for UI feedback before navigating
            const timer = setTimeout(() => {
                navigate('/dashboard');
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [token, user, navigate]); // Dependencies: token, user, and navigate

    const handleEmailLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email: form.email, password: form.password, role: form.role }));
    };

    const handleSendOtp = () => {
        if (!form.phone) return;
        dispatch(sendOtp({ phone: form.phone, role: form.role }));
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) return;
        dispatch(verifyOtp({ phone: form.phone, otp, role: form.role }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Background overlay for darker effect */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute -top-60 -right-60 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-60 -left-60 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
                <div className="absolute top-20 left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-6000"></div>
            </div>

            <div className="relative z-20 w-full max-w-md mx-auto">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 transition-all duration-300 transform hover:scale-[1.01] hover:bg-white/15 **max-h-[calc(100vh-2rem)] overflow-y-auto**">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-18 h-18 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-white/20">
                            <LogIn className="w-9 h-9 text-white" />
                        </div>
                        <h1 className="text-4xl font-extrabold text-white mb-2 leading-tight">Welcome Back!</h1>
                        <p className="text-gray-300 text-lg">Log in to your account.</p>
                    </div>

                    {/* Error Message Display */}
                    {error && (
                        <div className="bg-red-500/20 border border-red-400 text-red-300 px-4 py-3 rounded-xl relative mb-6 flex items-center gap-2 animate-fadeIn" role="alert">
                            <XCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="block text-sm">{error}</span>
                            <button onClick={() => dispatch(clearError())} className="absolute top-2 right-2 text-red-300 hover:text-white transition-colors" aria-label="Close alert">
                                <XCircle className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Role Selection */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-semibold text-white mb-2">Select Your Role</h2>
                            <p className="text-gray-300 text-base">Who are you logging in as?</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {Object.entries(roleLabels).map(([key, label]) => {
                                const Icon = roleIcons[key];
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setForm({ ...form, role: key })}
                                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${form.role === key
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                                            : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                                            }`}
                                        aria-pressed={form.role === key}
                                    >
                                        <Icon className="w-6 h-6" />
                                        <span className="font-semibold text-sm">{label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Tab Navigation for Auth Method */}
                        <div className="flex bg-white/15 rounded-2xl p-1 mb-6 shadow-inner">
                            <button
                                onClick={() => { setMode('email'); dispatch(clearError()); }}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-lg font-semibold transition-all duration-300 ${mode === 'email'
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105'
                                    : 'text-gray-300 hover:text-white hover:bg-white/20'
                                    }`}
                            >
                                <Mail className="w-5 h-5" />
                                Email
                            </button>
                            <button
                                onClick={() => { setMode('phone'); dispatch(clearError()); dispatch(resetOtp()); setOtp(''); }}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-lg font-semibold transition-all duration-300 ${mode === 'phone'
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105'
                                    : 'text-gray-300 hover:text-white hover:bg-white/20'
                                    }`}
                            >
                                <Phone className="w-5 h-5" />
                                Phone OTP
                            </button>
                        </div>

                        {/* Email Login Form */}
                        {mode === 'email' && (
                            <form onSubmit={handleEmailLogin} className="space-y-4 animate-fadeIn" id="emailLoginForm">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        id="emailLogin"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="Email Address"
                                        className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-base"
                                        required
                                        aria-label="Email address"
                                    />
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="passwordLogin"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        placeholder="Password"
                                        className="w-full pl-11 pr-11 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-base"
                                        required
                                        aria-label="Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Phone OTP Login */}
                        {mode === 'phone' && (
                            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn" id="phoneOtpLoginForm">
                                {!otpSent && (
                                    <>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                id="phoneLogin"
                                                value={form.phone}
                                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                placeholder="Phone Number (e.g., +919876543210)"
                                                className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-base"
                                                required
                                                aria-label="Phone Number"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleSendOtp}
                                            disabled={loading || !form.phone || form.phone.trim() === ''}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Sending OTP...
                                                </>
                                            ) : (
                                                'Send OTP'
                                            )}
                                        </button>
                                    </>
                                )}

                                {otpSent && (
                                    <>
                                        <div className="relative animate-fadeIn">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                id="otpInput"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                placeholder="Enter 6-digit OTP"
                                                className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-base tracking-widest"
                                                maxLength="6"
                                                required
                                                aria-label="One-time password (OTP)"
                                            />
                                        </div>
                                        <div className="text-center animate-fadeIn">
                                            <p className="text-gray-300 text-sm mb-2">OTP sent to **{form.phone}**.</p>
                                            <button
                                                type="button"
                                                onClick={() => { dispatch(resetOtp()); setOtp(''); }}
                                                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                                            >
                                                Change number?
                                            </button>
                                        </div>
                                        <button
                                            type="submit"
                                            onClick={handleVerifyOtp}
                                            disabled={loading || !otp || otp.length !== 6}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Verifying...
                                                </>
                                            ) : (
                                                'Login with OTP'
                                            )}
                                        </button>
                                    </>
                                )}
                            </form>
                        )}

                        {/* Submit button for Email Login (only shown when in email mode) */}
                        {mode === 'email' && (
                            <button
                                type="submit"
                                form="emailLoginForm"
                                disabled={loading || !form.email || !form.password}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Logging in...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        )}

                        {/* Forgot Password Link */}
                        {mode === 'email' && (
                            <div className="text-center">
                                <a href="#" className="text-blue-400 hover:text-blue-300 text-base font-medium transition-colors">
                                    Forgot Password?
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center pt-4 border-t border-white/10">
                        <p className="text-gray-400 text-base">
                            Don't have an account?{' '}
                            <button
                                onClick={() => navigate('/signup')}
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }

                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.4, 1);
                }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
                .animation-delay-6000 { animation-delay: 6s; }
            `}</style>
        </div>
    );
};

export default Login;