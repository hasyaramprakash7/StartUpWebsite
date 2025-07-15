import React from 'react';
import {
    Search,
    ShoppingCart,
    PackageCheck,
    MapPin,
    Smile,
    Truck,
} from 'lucide-react';

const steps = [
    {
        title: '1. Browse Products',
        icon: <Search className="w-10 h-10 text-orange-500" />,
        description: 'Search groceries, snacks, and drinks from nearby vendors or wholesalers.',
    },
    {
        title: '2. Add to Cart',
        icon: <ShoppingCart className="w-10 h-10 text-orange-500" />,
        description: 'Select items, combos, or bulk quantities and add them to your cart.',
    },
    {
        title: '3. Confirm Order',
        icon: <PackageCheck className="w-10 h-10 text-orange-500" />,
        description: 'Review items, apply promo codes, and confirm your order securely.',
    },
    {
        title: '4. Order is Processed',
        icon: <Truck className="w-10 h-10 text-orange-500" />,
        description: 'Vendor receives and prepares your order quickly.',
    },
    {
        title: '5. Track Live Delivery',
        icon: <MapPin className="w-10 h-10 text-orange-500" />,
        description: 'Watch your delivery move in real-time on Google Maps.',
    },
    {
        title: '6. Delivered with a Smile',
        icon: <Smile className="w-10 h-10 text-orange-500" />,
        description: 'Your order arrives fresh and on time — ready to enjoy!',
    },
];

const OrderFlow = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        A simple and smooth 6-step order flow — from product discovery to doorstep delivery.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center"
                        >
                            <div className="mb-4 flex justify-center">{step.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OrderFlow;
