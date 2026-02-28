import React, { createContext, useContext, useState, useCallback } from "react";
import { CartItem, Variety } from "@/data/products";

interface CartContextType {
  items: CartItem[];
  addItem: (variety: Variety, quantity: number, deliveryType: "local" | "250km") => void;
  removeItem: (varietyId: string) => void;
  updateQuantity: (varietyId: string, quantity: number) => void;
  updateDelivery: (varietyId: string, deliveryType: "local" | "250km") => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((variety: Variety, quantity: number, deliveryType: "local" | "250km") => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variety.id === variety.id);
      if (existing) {
        return prev.map((i) =>
          i.variety.id === variety.id ? { ...i, quantity: i.quantity + quantity, deliveryType } : i
        );
      }
      return [...prev, { variety, quantity, deliveryType }];
    });
  }, []);

  const removeItem = useCallback((varietyId: string) => {
    setItems((prev) => prev.filter((i) => i.variety.id !== varietyId));
  }, []);

  const updateQuantity = useCallback((varietyId: string, quantity: number) => {
    setItems((prev) => prev.map((i) => (i.variety.id === varietyId ? { ...i, quantity } : i)));
  }, []);

  const updateDelivery = useCallback((varietyId: string, deliveryType: "local" | "250km") => {
    setItems((prev) => prev.map((i) => (i.variety.id === varietyId ? { ...i, deliveryType } : i)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, updateDelivery, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
