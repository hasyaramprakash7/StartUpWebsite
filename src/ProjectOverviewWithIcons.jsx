import React from 'react';
import {
    Store,
    PackageCheck,
    MapPin,
    Smartphone,
    Users,
    LayoutDashboard,
    ArrowRightCircle,
} from 'lucide-react';

const features = [
    {
        title: 'Multi-Vendor Platform',
        icon: <Store className="w-10 h-10 text-orange-500" />,
        description: 'Connect wholesalers, retailers, and customers on a single platform.',
    },
    {
        title: 'Smart Combo Offers',
        icon: <PackageCheck className="w-10 h-10 text-orange-500" />,
        description: 'Vendors can create discounted product combos to boost sales.',
    },
    {
        title: 'Live Order Tracking',
        icon: <MapPin className="w-10 h-10 text-orange-500" />,
        description: 'Track deliveries in real-time using Google Maps integration.',
    },
    {
        title: 'OTP Login & Security',
        icon: <Smartphone className="w-10 h-10 text-orange-500" />,
        description: 'Secure phone number authentication with auto OTP verification.',
    },
    {
        title: 'Retailer & Customer Modes',
        icon: <Users className="w-10 h-10 text-orange-500" />,
        description: 'Different features for consumers, retailers, and vendors.',
    },
    {
        title: 'Admin & Vendor Dashboard',
        icon: <LayoutDashboard className="w-10 h-10 text-orange-500" />,
        description: 'Admins approve vendors; vendors manage products and orders.',
    },
];

const ProjectOverviewWithIcons = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">What is Search Invers?</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        A smart, scalable e-commerce app connecting wholesalers, retailers, and end customers — all in one unified platform. Designed for local to global distribution.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default ProjectOverviewWithIcons;
