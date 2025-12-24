// frontend/src/store/cart.ts
import { create } from "zustand";

export type Product = {
	id: string;
	name: string;
	price: number;
	description?: string;
	stock?: number;
};

export type CartItem = Product & {
	quantity: number;
};

type CartStore = {
	items: CartItem[];
	addItem: (product: Product) => void;
	removeItem: (id: string) => void;
	clear: () => void;
	total: () => number;
	getCount: () => number;
};
// Zustand store for cart management
export const useCart = create<CartStore>((set, get) => ({
	items: [],
	addItem: (product) =>
		set((state) => {
			const existing = state.items.find((i) => i.id === product.id);
			if (existing) {
				return {
					items: state.items.map((i) =>
						i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
					),
				};
			}
			return { items: [...state.items, { ...product, quantity: 1 }] };
		}),
	removeItem: (id) =>
		set((state) => ({
			items: state.items.filter((i) => i.id !== id),
		})),
	clear: () => set({ items: [] }),
	total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
	getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
