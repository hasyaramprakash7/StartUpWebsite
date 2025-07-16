import { useEffect } from 'react';
import { User, Mail, Phone, Shield, LogOut, Bell, Settings, Home } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getDashboard, logout } from '../redux/auth/authSlice'; // Import your auth actions

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Select user data and dashboard message from the Redux store
    const { user, dashboardMessage, token } = useSelector((state) => state.auth);

    // --- Data Fetching Effect ---
    // This useEffect will run when the component mounts.
    // It dispatches getDashboard to fetch user-specific dashboard data.
    // If fetching fails (e.g., token expired, unauthorized), it logs out the user and redirects to login.
    useEffect(() => {
        if (!token) {
            // If there's no token, redirect to login immediately
            navigate('/login');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                // dispatch(getDashboard()) returns a promise.
                // .unwrap() extracts the fulfilled value or throws the rejected value.
                await dispatch(getDashboard()).unwrap();
            } catch (err) {
                // If getDashboard fails (e.g., due to token expiration or invalid token)
                console.error('Failed to fetch dashboard data:', err);
                dispatch(logout()); // Log out the user from Redux state and clear token
                navigate('/login'); // Redirect to login page
            }
        };

        fetchDashboardData();
    }, [dispatch, navigate, token]); // Dependencies: dispatch, navigate, and token

    // --- Handle Logout ---
    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
        navigate('/login'); // Redirect to the login page after logging out
    };

    const getRoleColor = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'user':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'vendor': // Assuming 'vendor' is a possible role
                return 'bg-green-100 text-green-800 border-green-200';
            case 'deliveryboy': // Assuming 'deliveryBoy' is a possible role
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'moderator': // Keeping moderator from your original code
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    };

    // Render nothing or a loading spinner if user data is not yet available
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-700 text-lg">Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Home className="w-4 h-4 text-white" />
                                </div>
                                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                <Bell className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-2">
                                Welcome back, {user?.name || 'User'}!
                            </h2>
                            {dashboardMessage && (
                                <p className="text-indigo-100 text-lg opacity-90">
                                    {dashboardMessage}
                                </p>
                            )}
                        </div>
                        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                    </div>
                </div>

                {/* User Profile Card */}
                {user && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-start space-x-6">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                        {getInitials(user.name)}
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {user.email && (
                                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                                                <div className="flex-shrink-0">
                                                    <Mail className="w-5 h-5 text-gray-500" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Email</p>
                                                    <p className="text-gray-900 font-medium">{user.email}</p>
                                                </div>
                                            </div>
                                        )}

                                        {user.phone && (
                                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                                                <div className="flex-shrink-0">
                                                    <Phone className="w-5 h-5 text-gray-500" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Phone</p>
                                                    <p className="text-gray-900 font-medium">{user.phone}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                                            <div className="flex-shrink-0">
                                                <Shield className="w-5 h-5 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Role</p>
                                                <p className="text-gray-900 font-medium">{user.role}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                                            <div className="flex-shrink-0">
                                                <User className="w-5 h-5 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Status</p>
                                                <p className="text-green-600 font-medium flex items-center">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Active
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Profile Settings</h4>
                                <p className="text-sm text-gray-500">Update your information</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Security</h4>
                                <p className="text-sm text-gray-500">Manage your security</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Settings className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Preferences</h4>
                                <p className="text-sm text-gray-500">Customize your experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;