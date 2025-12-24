// src/lib/api.ts
import axios from "axios";

// Product-Order Service (port 3001)
export const productApi = axios.create({
	baseURL: "http://localhost:3001",
});

// Customer Service (port 3002)
export const customerApi = axios.create({
	baseURL: "http://localhost:3002",
});

// Helper functions
export const getProducts = () => productApi.get("/products"); // Fetch all products

export const createOrder = (data: any) => productApi.post("/orders", data); // Create a new order

export const getCustomerOrders = (email: string) =>
	customerApi.get(`/customers/orders?email=${encodeURIComponent(email)}`); // Fetch orders for a specific customer
