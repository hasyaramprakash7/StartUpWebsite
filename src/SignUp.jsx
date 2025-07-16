import { useState, useEffect } from 'react';
import { Mail, Phone, Lock, User, Shield, Truck, UserCheck, Eye, EyeOff, UserPlus, Check, ArrowLeft, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { sendOtp, verifyOtp, emailSignup, resetOtp } from '../redux/auth/authSlice'; // Import your actions

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Select relevant state from Redux store
    const { loading, error, otpSent: reduxOtpSent, token, user } = useSelector((state) => state.auth);

    const [mode, setMode] = useState('email'); // 'email' or 'phone' for authentication method
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'user' });
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1); // Current step in the multi-step form

    // Map roles to Lucide icons for visual representation
    const roleIcons = {
        user: User,
        vendor: UserCheck,
        admin: Shield,
        deliveryBoy: Truck
    };

    // Map roles to user-friendly labels
    const roleLabels = {
        user: 'User',
        vendor: 'Vendor',
        admin: 'Admin',
        deliveryBoy: 'Delivery Partner'
    };

    // Descriptions for each role to help users choose
    const roleDescriptions = {
        user: 'Browse and order products',
        vendor: 'Sell products and manage inventory',
        admin: 'Manage platform and users',
        deliveryBoy: 'Deliver orders to customers'
    };

    // Effect to redirect after successful login/signup (if token and user exist)
    useEffect(() => {
        if (token && user) {
            // Give a small delay for UI feedback before navigating
            const timer = setTimeout(() => {
                navigate('/dashboard'); // Or '/success', or based on user role
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [token, user, navigate]);

    // Handle email signup submission using Redux thunk
    const handleEmailSignup = async (e) => {
        e.preventDefault();
        // Client-side validation
        if (!form.email || !form.password) {
            // Error handling is managed by Redux state, but local validation can be added for immediate feedback
            return;
        }
        dispatch(emailSignup(form));
    };

    // Handle sending OTP using Redux thunk
    const handleSendOtp = () => {
        if (!form.phone) {
            // Error handling is managed by Redux state, but local validation can be added for immediate feedback
            return;
        }
        dispatch(sendOtp({ phone: form.phone, name: form.name, role: form.role }));
    };

    // Handle OTP verification using Redux thunk
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            // Error handling is managed by Redux state, but local validation can be added for immediate feedback
            return;
        }
        dispatch(verifyOtp({ phone: form.phone, otp, role: form.role }));
    };

    // Navigate to the next step in the multi-step form
    const nextStep = () => {
        if (step === 1) {
            if (!canProceedStep1) return;
        }
        if (step === 2) {
            if (!canProceedStep2) return;
        }
        if (step < 3) setStep(step + 1);
    };

    // Navigate to the previous step in the multi-step form
    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
            // Optionally reset OTP state if going back from step 3 (phone mode)
            if (mode === 'phone') {
                dispatch(resetOtp());
                setOtp('');
            }
        }
    };

    // Validation for Step 1
    const canProceedStep1 = form.name.trim() !== '' && form.phone.trim() !== '';
    // Validation for Step 2
    const canProceedStep2 = form.role !== '';

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Background overlay for darker effect */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Animated background elements (improved opacity and size for subtlety) */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute -top-60 -right-60 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-60 -left-60 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
                <div className="absolute top-20 left-20 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-6000"></div>
            </div>

            <div className="relative z-20 w-full max-w-md mx-auto">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 transition-all duration-300 transform hover:scale-[1.01] hover:bg-white/15">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-18 h-18 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-white/20">
                            <UserPlus className="w-9 h-9 text-white" />
                        </div>
                        <h1 className="text-4xl font-extrabold text-white mb-2 leading-tight">Create Account</h1>
                        <p className="text-gray-300 text-lg">Join us and get started!</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex justify-center items-center mb-8 gap-2">
                        {[1, 2, 3].map((stepNum) => (
                            <div key={stepNum} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${step >= stepNum
                                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                                        : 'bg-white/20 text-gray-400'
                                        }`}
                                >
                                    {step > stepNum ? <Check className="w-5 h-5" /> : stepNum}
                                </div>
                                {stepNum < 3 && (
                                    <div
                                        className={`w-10 h-1 transition-all duration-300 ${step > stepNum ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' : 'bg-white/20'
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Error Message Display */}
                    {error && (
                        <div className="bg-red-500/20 border border-red-400 text-red-300 px-4 py-3 rounded-xl relative mb-6 flex items-center gap-2 animate-fadeIn" role="alert">
                            <XCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="block text-sm">{error}</span>
                            <button onClick={() => dispatch({ type: 'auth/clearError' })} className="absolute top-2 right-2 text-red-300 hover:text-white transition-colors" aria-label="Close alert">
                                <XCircle className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Step 1: Basic Information */}
                    {step === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-semibold text-white mb-2">Basic Information</h2>
                                <p className="text-gray-300 text-base">Tell us about yourself.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        id="fullName"
                                        placeholder="Full Name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-base"
                                        required
                                        aria-label="Full Name"
                                    />
                                </div>

                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        placeholder="Phone Number (e.g., +919876543210)"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-base"
                                        required
                                        aria-label="Phone Number"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={nextStep}
                                disabled={!canProceedStep1 || loading}
                                className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    'Continue'
                                )}
                            </button>
                        </div>
                    )}

                    {/* Step 2: Role Selection */}
                    {step === 2 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-semibold text-white mb-2">Choose Your Role</h2>
                                <p className="text-gray-300 text-base">Select what best describes you.</p>
                            </div>

                            <div className="space-y-3">
                                {Object.entries(roleLabels).map(([key, label]) => {
                                    const Icon = roleIcons[key];
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setForm({ ...form, role: key })}
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${form.role === key
                                                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg transform scale-105'
                                                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                                                }`}
                                            aria-pressed={form.role === key}
                                        >
                                            <Icon className="w-6 h-6" />
                                            <div className="text-left">
                                                <div className="font-semibold text-lg">{label}</div>
                                                <div className="text-sm opacity-80">{roleDescriptions[key]}</div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={prevStep}
                                    className="flex-1 bg-white/10 text-white py-4 rounded-xl font-semibold hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Back
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!canProceedStep2 || loading}
                                    className="flex-1 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        'Continue'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Authentication Method */}
                    {step === 3 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-semibold text-white mb-2">Authentication Method</h2>
                                <p className="text-gray-300 text-base">Choose how you want to sign up.</p>
                            </div>

                            {/* Tab Navigation for Auth Method */}
                            <div className="flex bg-white/15 rounded-2xl p-1 mb-6 shadow-inner">
                                <button
                                    onClick={() => { setMode('email'); dispatch({ type: 'auth/clearError' }); }}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-lg font-semibold transition-all duration-300 ${mode === 'email'
                                        ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-md transform scale-105'
                                        : 'text-gray-300 hover:text-white hover:bg-white/20'
                                        }`}
                                >
                                    <Mail className="w-5 h-5" />
                                    Email
                                </button>
                                <button
                                    onClick={() => { setMode('phone'); dispatch({ type: 'auth/clearError' }); dispatch(resetOtp()); setOtp(''); }} // Reset OTP state when switching
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-lg font-semibold transition-all duration-300 ${mode === 'phone'
                                        ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-md transform scale-105'
                                        : 'text-gray-300 hover:text-white hover:bg-white/20'
                                        }`}
                                >
                                    <Phone className="w-5 h-5" />
                                    Phone OTP
                                </button>
                            </div>

                            {/* Email Signup Form */}
                            {mode === 'email' && (
                                <form onSubmit={handleEmailSignup} className="space-y-4 animate-fadeIn">
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            id="emailSignup"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder="Email Address"
                                            className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-base"
                                            required
                                            aria-label="Email address"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="passwordSignup"
                                            value={form.password}
                                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                                            placeholder="Create Password"
                                            className="w-full pl-11 pr-11 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-base"
                                            required
                                            aria-label="Create Password"
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

                            {/* Phone OTP Verification */}
                            {mode === 'phone' && (
                                <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn">
                                    {!reduxOtpSent && ( // Use reduxOtpSent here
                                        <div className="flex justify-center">
                                            <button
                                                type="button" // Important to prevent form submission
                                                onClick={handleSendOtp}
                                                disabled={loading || !form.phone}
                                                className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                                        </div>
                                    )}

                                    {reduxOtpSent && ( // Use reduxOtpSent here
                                        <>
                                            <div className="relative animate-fadeIn">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    id="otpInput"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    placeholder="Enter 6-digit OTP"
                                                    className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-base tracking-widest"
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
                                                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                                                >
                                                    Change number?
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </form>
                            )}

                            {/* Action Buttons for Step 3 */}
                            <div className="flex gap-3">
                                <button
                                    onClick={prevStep}
                                    className="flex-1 bg-white/10 text-white py-4 rounded-xl font-semibold hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Back
                                </button>

                                {mode === 'email' && (
                                    <button
                                        form="emailSignupForm" // Link to the form if you wrap it in <form>
                                        type="submit" // Set type to submit for form submission
                                        onClick={handleEmailSignup} // Keep onClick to ensure validation before dispatch
                                        disabled={loading || !form.email || !form.password}
                                        className="flex-1 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Creating Account...
                                            </>
                                        ) : (
                                            'Create Account'
                                        )}
                                    </button>
                                )}

                                {mode === 'phone' && reduxOtpSent && ( // Use reduxOtpSent here
                                    <button
                                        form="phoneOtpForm" // Link to the form if you wrap it in <form>
                                        type="submit" // Set type to submit for form submission
                                        onClick={handleVerifyOtp} // Keep onClick to ensure validation before dispatch
                                        disabled={loading || !otp || otp.length !== 6}
                                        className="flex-1 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Verifying...
                                            </>
                                        ) : (
                                            'Verify & Create Account'
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-8 text-center pt-4 border-t border-white/10">
                        <p className="text-gray-400 text-base">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations - define in your global CSS or in a <style jsx> block if using Next.js */}
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

export default SignUp;