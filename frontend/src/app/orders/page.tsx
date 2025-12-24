"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { customerApi } from "@/lib/api";

type CustomerOrder = {
	id: string;
	sourceOrderId: string;
	total: number;
	createdAt: string;
};

export default function Orders() {
	const searchParams = useSearchParams();
	const email = searchParams.get("email");

	const [orders, setOrders] = useState<CustomerOrder[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!email) {
			setLoading(false);
			return;
		}

		setLoading(true);
		setError(null);

		customerApi
			.get<CustomerOrder[]>(
				`/customers/orders?email=${encodeURIComponent(email)}` // Fetch orders for a specific customer
			)
			.then((res) => setOrders(res.data))
			.catch((err) => {
				console.error("Failed to load orders:", err);
				setError("Unable to load order history. Please try again later.");
			})
			.finally(() => setLoading(false));
	}, [email]);

	if (!email) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<p className='text-xl text-red-600 mb-4'>No email provided</p>
					<a href='/' className='text-blue-600 hover:underline'>
						← Back to Home
					</a>
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<p className='text-xl text-gray-700'>Loading your order history...</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50 py-12 px-6'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-3xl font-bold text-gray-900 mb-10'>
					Order History for <span className='text-blue-600'>{email}</span>
				</h1>

				{error && (
					<div className='bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8'>
						{error}
					</div>
				)}

				{orders.length === 0 ? (
					<div className='bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center'>
						<p className='text-xl text-gray-600 mb-6'>
							No orders found for this email.
						</p>
						<a href='/' className='text-blue-600 hover:underline text-lg'>
							← Continue Shopping
						</a>
					</div>
				) : (
					<div className='space-y-6'>
						{orders.map((order) => (
							<div
								key={order.id}
								className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'
							>
								<p className='text-lg font-semibold text-gray-800'>
									Order ID:{" "}
									<span className='font-mono'>{order.sourceOrderId}</span>
								</p>
								<p className='text-2xl font-bold text-green-600 mt-3'>
									Total: ${Number(order.total).toFixed(2)}
								</p>
								<p className='text-gray-600 mt-2'>
									Placed on: {new Date(order.createdAt).toLocaleString()}
								</p>
							</div>
						))}
					</div>
				)}

				<div className='text-center mt-12'>
					<a
						href='/'
						className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg transition text-lg'
					>
						← Continue Shopping
					</a>
				</div>
			</div>
		</div>
	);
}
