import { useEffect, useState } from 'react';
import API from './api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/auth/dashboard')
            .then((res) => {
                setMessage(res.data.message);
                setUser(res.data.user);
            })
            .catch(() => {
                localStorage.removeItem('token');
                navigate('/login');
            });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
                <p className="mb-6 text-green-600 text-center">{message}</p>

                {user && (
                    <div className="space-y-2">
                        <p><strong>Name:</strong> {user.name}</p>
                        {user.email && <p><strong>Email:</strong> {user.email}</p>}
                        {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>
                )}

                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }}
                    className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
