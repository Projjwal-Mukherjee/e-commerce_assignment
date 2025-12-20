"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { useCart } from "@/store/cart";
import Link from "next/link";

export default function Home() {
	const [products, setProducts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	// Reactive cart
	const addItem = useCart((state) => state.addItem);
	const cartCount = useCart((state) => state.getCount());

	useEffect(() => {
		getProducts()
			.then((res) => {
				console.log("✅ Products loaded:", res.data); // ← Add this
				setProducts(res.data);
			})
			.catch((err) => console.error("Failed to load products:", err))
			.finally(() => setLoading(false));
		console.log(products);
	}, []);

	if (loading) {
		return (
			<div className='p-8 text-center text-gray-700'>Loading products...</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}
			<header className='bg-white shadow-sm border-b border-gray-200'>
				<div className='max-w-7xl mx-auto px-6 py-5 flex justify-between items-center'>
					<h1 className='text-3xl font-bold text-gray-900'>E-Commerce Store</h1>
					<Link
						href='/checkout'
						className='relative bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition'
					>
						Checkout
						{cartCount > 0 && (
							<span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center'>
								{cartCount}
							</span>
						)}
					</Link>
				</div>
			</header>

			{/* Main Content */}
			<main className='max-w-7xl mx-auto px-6 py-10'>
				<h2 className='text-2xl font-semibold text-gray-800 mb-8'>
					Available Products
				</h2>

				{products.length === 0 ? (
					<p className='text-center text-gray-600 py-12'>
						No products available at the moment.
					</p>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
						{products.map((product) => (
							<div
								key={product.id}
								className='bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden'
							>
								{/* Image Placeholder */}
								<div className='h-56 bg-gray-200 flex items-center justify-center border-b border-gray-200'>
									{product.image ? (
										<img
											src={product.image}
											alt={product.name + " - No Image"}
											className='w-full h-56 object-cover border-b border-gray-200'
										/>
									) : (
										<div className='h-56 bg-gray-200 flex items-center justify-center border-b border-gray-200'>
											<span className='text-gray-500'>No Image</span>
										</div>
									)}
								</div>

								{/* Card Body */}
								<div className='p-6'>
									<h3 className='text-xl font-semibold text-gray-900 mb-2'>
										{product.name}
									</h3>
									<p className='text-gray-600 text-sm mb-4 line-clamp-2'>
										{product.description || "No description available"}
									</p>
									<div className='flex justify-between items-end mb-6'>
										<span className='text-2xl font-bold text-green-600'>
											${Number(product.price).toFixed(2)}
										</span>
										<span className='text-sm text-gray-500'>
											Stock: {product.stock ?? "N/A"}
										</span>
									</div>
									<button
										onClick={() => addItem(product)}
										className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition'
									>
										Add to Cart
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
