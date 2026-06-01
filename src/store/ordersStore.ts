import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "./cartStore";

export type OrderStatus = "pending" | "preparing" | "ready" | "delivered";

export type Order = {
  id: string;
  tableNumber: string;
  items: { id: string; name: string; price: number; qty: number }[];
  total: number;
  status: OrderStatus;
  timestamp: string;
};

type OrdersState = {
  orders: Order[];
  add: (tableNumber: string, lines: CartLine[]) => Order;
  setStatus: (id: string, status: OrderStatus) => void;
  remove: (id: string) => void;
};

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      add: (tableNumber, lines) => {
        const order: Order = {
          id: `order_${Date.now()}`,
          tableNumber,
          items: lines.map((l) => ({ id: l.item.id, name: l.item.name, price: l.item.price, qty: l.qty })),
          total: lines.reduce((s, l) => s + l.item.price * l.qty, 0),
          status: "pending",
          timestamp: new Date().toISOString(),
        };
        set((s) => ({ orders: [order, ...s.orders] }));
        return order;
      },
      setStatus: (id, status) => set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),
      remove: (id) => set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),
    }),
    { name: "love-africa-orders" }
  )
);
