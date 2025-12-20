"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import { createOrder } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Checkout() {
	const { items, total, clear } = useCart();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

	const handleSubmit = async () => {
		if (!name.trim() || !email.trim()) {
			setError("Please fill in both name and email");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			await createOrder({
				products: items.map((i) => ({ id: i.id })),
				customerName: name,
				customerEmail: email,
			});

			clear();
			router.push(`/orders?email=${encodeURIComponent(email)}`);
		} catch (err) {
			console.error("Order placement failed:", err);
			setError("Failed to place order. Please try again.");
			setLoading(false);
		}
	};

	if (items.length === 0) {
		return (
			<div className='min-h-screen bg-gray-50 p-8 text-center'>
				<p className='text-xl text-black mb-4'>Your cart is empty</p>
				<a href='/' className='text-blue-600 hover:underline text-lg'>
					← Back to Products
				</a>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50 py-12 px-6'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-3xl font-bold text-black mb-10'>
					Checkout ({cartCount} items)
				</h1>

				{/* Order Summary */}
				<div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8'>
					<h2 className='text-2xl font-semibold text-black mb-6'>
						Order Summary
					</h2>
					{items.map((item) => (
						<div
							key={item.id}
							className='flex justify-between py-3 border-b border-gray-100'
						>
							<span className='text-black'>
								{item.name} × {item.quantity}
							</span>
							<span className='font-medium text-black'>
								${(item.price * item.quantity).toFixed(2)}
							</span>
						</div>
					))}
					<div className='mt-6 pt-6 border-t border-gray-300'>
						<div className='flex justify-between text-xl font-bold text-black'>
							<span>Total</span>
							<span>${total().toFixed(2)}</span>
						</div>
					</div>
				</div>

				{/* Customer Details */}
				<div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
					<h2 className='text-2xl font-semibold text-black mb-6'>
						Customer Details
					</h2>
					<input
						type='text'
						placeholder='Your Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='w-full text-black border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500'
					/>
					<input
						type='email'
						placeholder='Your Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='w-full text-black border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500'
					/>

					{error && <p className='text-red-600 mb-6 font-medium'>{error}</p>}

					<button
						onClick={handleSubmit}
						disabled={loading || !name.trim() || !email.trim()}
						className='w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-lg text-lg transition'
					>
						{loading ? "Placing Order..." : "Place Order"}
					</button>
				</div>

				<div className='text-center mt-10'>
					<a href='/' className='text-blue-600 hover:underline text-lg'>
						← Continue Shopping
					</a>
				</div>
			</div>
		</div>
	);
}
